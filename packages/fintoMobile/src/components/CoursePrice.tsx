import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { mScale } from '@shared/src/theme/metrics';
import React from 'react';
import {StyleSheet, View, ViewStyle, TextStyle} from 'react-native';

interface CoursePriceProps {
  price?: number | string;
  discount_price?: number | string;
}

const CoursePrice: React.FC<CoursePriceProps> = ({price, discount_price}) => {
  return (
    <View
      style={[
        commonStyle.flexStart,
        {alignSelf: 'flex-start', flex: 1, marginBottom: mScale.base},
      ]}>
      <TextAtom text={`₹ ${price}`} preset="heading3" />
      <TextAtom
        text={`₹ ${discount_price}`}
        preset="body"
        color="#71717A"
        style={
          {
            marginStart: mScale.base,
            textDecorationLine: 'line-through',
          } as TextStyle
        }
      />
    </View>
  );
};

export default CoursePrice;

const styles = StyleSheet.create({});
