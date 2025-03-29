import {useNavigation, useRoute} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import {isCoursePurchased} from '@shared/src/components/atoms/Calculate';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {createCourseCart} from '@shared/src/provider/store/services/CourseCart.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {isInCart} from '@src/components/Calculate';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import SeparatorAtom from '@src/components/SeperatorAtom';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {FlatList, LayoutChangeEvent, ScrollView, View} from 'react-native';

interface OverviewProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const Overview: React.FunctionComponent<OverviewProps> = ({
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
    <View style={{flex: 1, padding: mScale.base}}>
      <ScrollViewAtom>
        <View style={{marginBottom: mScale.base}}>
          <TextAtom text={'About this course'} preset="heading3" />
          <View style={{marginTop: mScale.xs}}>
            <TextAtom
              text={singleCourse?.description || ''}
              preset="body"
              style={{color: '#C8C8CC'}}
            />
          </View>
        </View>
        <View
          style={[
            commonStyle.flexStart,
            {
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              flexGrow: 1,
              marginBottom: mScale.base,
            },
          ]}>
          <TextAtom
            text={'Estimated Completion Time:'}
            preset="heading4"
            style={{marginEnd: mScale.base, width: moderateScale(176)}}
          />
          <TextAtom
            text={singleCourse?.duration_time || ''}
            preset="body"
            style={{width: moderateScale(160)}}
          />
        </View>
        <View
          style={[
            commonStyle.flexStart,
            {
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              flexGrow: 1,
              marginBottom: mScale.base,
            },
          ]}>
          <TextAtom
            text={'Languages:'}
            preset="heading4"
            style={{marginEnd: mScale.base, width: moderateScale(176)}}
          />
          <TextAtom
            text={singleCourse?.course_language || ''}
            preset="body"
            style={{width: moderateScale(160)}}
          />
        </View>
        <View
          style={[
            commonStyle.flexStart,
            {
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              flexGrow: 1,
              marginBottom: mScale.base,
            },
          ]}>
          <TextAtom
            text={'On Completion Perks:'}
            preset="heading4"
            style={{marginEnd: mScale.base, width: moderateScale(176)}}
          />
          <TextAtom
            text={'Fintopedia Verified Certificate'}
            preset="body"
            style={{width: moderateScale(160)}}
          />
        </View>
        <SeparatorAtom
          marginHorizontal={0}
          style={{marginVertical: mScale.base}}
        />
        <View style={{marginBottom: mScale.base}}>
          <TextAtom text={'About this course'} preset="heading3" />
          <View style={{marginTop: mScale.xs}}>
            <TextAtom
              text={`${singleCourse?.description}`}
              preset="body"
              style={{color: '#C8C8CC'}}
            />
          </View>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll
            title="Frequently Bought Together"
            visible={false}
            paddingHorizontal={0}
          />
          <View>
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
