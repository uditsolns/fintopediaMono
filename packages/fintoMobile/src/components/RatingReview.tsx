import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {StyleSheet, View, ViewStyle, TextStyle} from 'react-native';
import {RatingAtom} from './RatingAtom';
import {TextPresetType} from '@shared/src/components/atoms/Text/TextPresets';

interface RatingReviewProps {
  rating?: number | string;
  review?: number | string;
  mb?: number | undefined;
  textStyle?: TextStyle;
  textPreset?: TextPresetType;
}

const RatingReview: React.FC<RatingReviewProps> = ({
  rating,
  review,
  mb = mScale.base,
  textStyle,
  textPreset = 'medium',
}) => {
  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        {alignSelf: 'flex-start', flex: 1, marginBottom: mb},
      ]}>
      <RatingAtom ratingTitle={`${rating || ''}`} preset="titleBold" />
      <TextAtom
        text={`(${review} reviews)`}
        preset={textPreset}
        style={[{marginStart: mScale.xxs, color: '#71717A'}, textStyle]}
      />
    </View>
  );
};

export default RatingReview;

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
  } as ViewStyle,
});
