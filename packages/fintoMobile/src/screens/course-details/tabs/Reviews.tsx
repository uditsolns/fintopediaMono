import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {MultilineTextInputAtom} from '@src/components/Input/MultilineTextInputAtom';
import ReviewMolecule from '@src/components/molecules/ReviewMolecule/ReviewMolecule';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import React from 'react';
import {FlatList, View} from 'react-native';
interface ReviewsProps {}
export const Reviews: React.FunctionComponent<ReviewsProps> = () => {
  const renderItem = ({item}: {item: any}) => {
    return (
        <ReviewMolecule item={item} itemWidth={'full-width'} />
    );
  };
  return (
    <View style={{flex: 1}}>
      <View>
        <View style={{paddingHorizontal: mScale.base}}>
          <MultilineTextInputAtom
            placeholderTitle="Write a review...."
            ratingBoolean={true}
            onRatingSelect={(rating: number) => {
              console.log(rating);
            }}
          />
        </View>
        <View>
          <ViewAll title="All Reviews" visible={false} />
          <View style={{paddingLeft:mScale.base}}>
            <FlatList
              data={[...Array(5)]}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
              contentContainerStyle={{
                columnGap: mScale.base,
                paddingBottom: mScale.lg,
                minHeight:moderateScale(314)
              }}
              horizontal={true}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
