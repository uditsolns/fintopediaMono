import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { mScale } from '@shared/src/theme/metrics';
import React from 'react';
import {StyleSheet, View, ViewStyle, TextStyle} from 'react-native';

interface RatingReviewProps {
  rating?: number | string;
  review?: number | string;
  mb?: number | undefined;
}

const RatingReview: React.FC<RatingReviewProps> = ({
  rating,
  review,
  mb = mScale.base,
}) => {
  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        {alignSelf: 'flex-start', flex: 1, marginBottom: mb},
      ]}>
      {/* <ButtonIconLeftAtom
        btnColor="transparent"
        btnTitle={`${rating}`}
        color={colorPresets.WHITE}
        preset="smallBold"
        iconName="star"
        iconColor="#FFA11A"
        style={{
          paddingVertical: 0,
          paddingHorizontal: 0,
        }}
      /> */}
      <TextAtom
        text={`(${review} reviews)`}
        preset="medium"
        color="#71717A"
        style={{marginStart: mScale.sm} as TextStyle}
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
