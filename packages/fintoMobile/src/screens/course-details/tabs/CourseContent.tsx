import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {isCoursePurchased} from '@shared/src/components/atoms/Calculate';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {storeVideoUrl} from '@shared/src/provider/store/reducers/courses.reducer';
import {createCourseCart} from '@shared/src/provider/store/services/CourseCart.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {isInCart} from '@src/components/Calculate';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';
import {CourseInnerAtom} from '@src/components/CourseInnerAtom';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {FlatList, LayoutChangeEvent, View} from 'react-native';

interface CourseContentProps {
  onLayout: (event: LayoutChangeEvent) => void;
}
export const CourseContent: React.FunctionComponent<CourseContentProps> = ({
  onLayout,
}) => {
  const {
    courses,
    singleCourse,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
  let route = useRoute<any>();
  const {course, id} = route.params || {};
  const data = singleCourse ? singleCourse : course;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {
    setVideoPlayerBeforePurchaseUrl,
    setPlayVideoStartBeforePurchaseLoading,
  } = useVideoPlayerContext();
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  const {auth} = useAppSelector(state => state.auth);
  const {courseget_purchase} = useAppSelector(
    state => state.coursesgetPurchase,
  );
  const [courseSections, setCourseSections] = React.useState<any>(data || []);

  const sortSections = React.useCallback((sections: any[]) => {
    return [...sections].sort((a, b) => {
      const sectionNumberA = Number(a?.section_number);
      const sectionNumberB = Number(b?.section_number);
      return sectionNumberA - sectionNumberB;
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (data?.length) {
        const sortedSections = sortSections(data);
        setCourseSections(sortedSections);
      }
    }, [data, sortSections])
  );
  const innerCategoriesRenderItem = ({item}: {item: CoursesResponse}) => {
    return (
      <PopularCourseMolecule
        item={item}
        onView={() => {
          if (item?.course_video_embed) {
            setVideoPlayerBeforePurchaseUrl(item?.course_video_embed);
            setPlayVideoStartBeforePurchaseLoading(false);
          }
          navigation.navigate(RouteKeys.BEFOREENROLLINGCOURSEDETAILSSCREEN, {
            id: item?.id,
          });
        }}
        onPress={async () => {
          let params = {
            user_id: Number(auth?.user?.id),
            course_id: Number(item?.id),
            status: '1',
          };
          if (isInCart(courseCart, item?.id)) {
            navigation.navigate(RouteKeys.CARTSCREEN);
          } else if (isCoursePurchased(courseget_purchase, item?.id)) {
            navigation.navigate(RouteKeys.AFTERENROLLINGCOURSEDETAILSSCREEN, {
              id: item?.id,
            });
          } else {
            await dispatch(
              createCourseCart({
                params,
                onSuccess: data => {
                  navigation.navigate(RouteKeys.CARTSCREEN);
                },
                onError: err => {},
              }),
            ).unwrap();
          }
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollViewAtom>
        <FlatList
          style={{flex: 1}}
          data={courseSections?.length ? courseSections : []}
          renderItem={({item}) => <CourseInnerAtom item={item} />}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={false}
        />
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Frequently Bought Together" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={
                courses?.length
                  ? courses?.filter(
                      el =>
                        el?.category_id == data?.category_id &&
                        el.id != data?.id,
                    )
                  : []
              }
              renderItem={innerCategoriesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollViewAtom>
    </View>
  );
};
