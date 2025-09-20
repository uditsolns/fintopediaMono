import {useRoute} from '@react-navigation/native';
import {createCourseReview} from '@shared/src/provider/store/services/course-review.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CourseReviewResponse} from '@shared/src/utils/types/course-review';
import {CoursesRatingReviewsFields} from '@shared/src/utils/types/CoursesRatingReviews';
import {MultilineTextInputAtom} from '@src/components/Input/MultilineTextInputAtom';
import LoaderAtom from '@src/components/LoaderAtom';
import ReviewMolecule from '@src/components/molecules/ReviewMolecule/ReviewMolecule';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import React from 'react';
import {Alert, FlatList, LayoutChangeEvent, View} from 'react-native';

interface ReviewsProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const Reviews: React.FunctionComponent<ReviewsProps> = ({onLayout}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {singleCourse, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
  const {course_review, loading: course_review_loading} = useAppSelector(
    state => state.courseReviews,
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
  return (
    <View onLayout={onLayout} style={{flex: 1}}>
      {coursesLoading.singleCourse ||
      coursesLoading.courses ||
      course_review_loading.create ? (
        <LoaderAtom size="large" />
      ) : null}
      <View>
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
      </View>
    </View>
  );
};
