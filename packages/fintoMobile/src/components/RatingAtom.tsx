import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {TextPresetType} from '@shared/src/components/atoms/Text/TextPresets';
import {mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {View} from 'react-native';
interface RatingAtomProps {
  preset?: TextPresetType;
  ratingTitle?:string;
}

export const RatingAtom: React.FC<RatingAtomProps> = ({
  preset = 'smallBold',
  ratingTitle
}) => {
  return (
    <View style={[commonStyle.flexCenter, {alignSelf: 'flex-start'}]}>
      <Images.SVG.Star1 />
      <TextAtom
        text={ratingTitle}
        preset={preset}
        style={{marginStart: mScale.xs,paddingTop:mScale.xxs}}
      />
    </View>
  );
};
