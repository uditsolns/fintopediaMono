import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {createCourseReview} from '@shared/src/provider/store/services/course-review.service';
import {createCourseCart} from '@shared/src/provider/store/services/CourseCart.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CourseReviewResponse} from '@shared/src/utils/types/course-review';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {CoursesRatingReviewsFields} from '@shared/src/utils/types/CoursesRatingReviews';
import {isInCart} from '@src/components/Calculate';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';
import {MultilineTextInputAtom} from '@src/components/Input/MultilineTextInputAtom';
import LoaderAtom from '@src/components/LoaderAtom';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import ReviewMolecule from '@src/components/molecules/ReviewMolecule/ReviewMolecule';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {Alert, FlatList, LayoutChangeEvent, View} from 'react-native';

interface ReviewsProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const Reviews: React.FunctionComponent<ReviewsProps> = ({onLayout}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {
    courses,
    singleCourse,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
  const {course_review, loading: course_review_loading} = useAppSelector(
    state => state.courseReviews,
  );
  const navigation = useNavigation<any>();
  const {
    setVideoPlayerBeforePurchaseUrl,
    setPlayVideoStartBeforePurchaseLoading,
  } = useVideoPlayerContext();
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  let route = useRoute<any>();

  const {course, id} = route.params || {};
  const data = singleCourse ? singleCourse : course;
  const [reviewDesc, setReviewDesc] = React.useState<string | null>('');
  const [rating, setRating] = React.useState<number | null>(null);
  const [defaultRating, setDefaultRating] = React.useState<number>(0);

  const renderItem = ({item}: {item: CourseReviewResponse}) => {
    return <ReviewMolecule item={item} itemWidth={'full-width'} />;
  };
  const onCancel = () => {
    setReviewDesc('');
    setRating(null);
    setDefaultRating(0);
  };
  const onSave = async () => {
    let params: CoursesRatingReviewsFields = {
      user_id: auth?.user?.id,
      course_id: singleCourse?.id,
      rating_star: rating?.toString(),
      review_description: reviewDesc || '',
    };
    if (!rating || !reviewDesc) {
      Alert.alert('Please write your review and select your rating.');
      return;
    }
    dispatch(
      createCourseReview({
        params,
        onSuccess(data) {
          onCancel();
        },
        onError(error) {},
      }),
    );
  };
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
    <View onLayout={onLayout} style={{flex: 1}}>
      {coursesLoading.singleCourse ||
      coursesLoading.courses ||
      course_review_loading.create ? (
        <LoaderAtom size="large" />
      ) : null}
      <ScrollViewAtom>
        <View style={{paddingHorizontal: mScale.base}}>
          <MultilineTextInputAtom
            placeholderTitle="Write a review...."
            ratingBoolean={true}
            onRatingSelect={(rating: number) => {
              setRating(rating);
            }}
            onCancel={onCancel}
            onSave={onSave}
            value={reviewDesc}
            onChangeText={setReviewDesc}
            currentRating={defaultRating}
          />
        </View>
        <View>
          <ViewAll title="All Reviews" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={
                course_review?.length
                  ? course_review?.filter(
                      el => el?.course_id == singleCourse?.id,
                    )
                  : []
              }
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
              contentContainerStyle={{
                columnGap: mScale.base,
                paddingBottom: mScale.lg,
                minHeight: moderateScale(275),
              }}
              horizontal={true}
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
