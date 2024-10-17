import {useRoute} from '@react-navigation/native';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CoursesRatingReviewsFields} from '@shared/src/utils/types/CoursesRatingReviews';
import {MultilineTextInputAtom} from '@src/components/Input/MultilineTextInputAtom';
import LoaderAtom from '@src/components/LoaderAtom';
import ReviewMolecule from '@src/components/molecules/ReviewMolecule/ReviewMolecule';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import React from 'react';
import {Alert, FlatList, View} from 'react-native';
interface ReviewsProps {}
export const Reviews: React.FunctionComponent<ReviewsProps> = () => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {singleCourse, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
  let route = useRoute<any>();

  const {course, id} = route.params || {};
  const data = singleCourse ? singleCourse : course;
  const [reviewDesc, setReviewDesc] = React.useState<string | null>('');
  const [rating, setRating] = React.useState<number | null>(null);

  const renderItem = ({item}: {item: any}) => {
    return <ReviewMolecule item={item} itemWidth={'full-width'} />;
  };
  return (
    <View style={{flex: 1}}>
       {coursesLoading.singleCourse ||
      coursesLoading.courses ? (
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
            onCancel={() => {
              setReviewDesc('');
              setRating(null);
            }}
            onSave={() => {
              let params: CoursesRatingReviewsFields = {
                user_id: auth?.user?.id,
                course_id: singleCourse?.id,
                rating_star: `${rating || 0}`,
                review_description: reviewDesc!,
              };
              if (!rating || !reviewDesc) {
                Alert.alert('Please write your review and select your rating.');
                return;
              }
              console.log(JSON.stringify(params))
            }}
            value={reviewDesc}
            onChangeText={setReviewDesc}
          />
        </View>
        <View>
          <ViewAll title="All Reviews" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={[...Array(5)]}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
              contentContainerStyle={{
                columnGap: mScale.base,
                paddingBottom: mScale.lg,
                minHeight: moderateScale(314),
              }}
              horizontal={true}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
