import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {TextPresetType} from '@shared/src/components/atoms/Text/TextPresets';
import {mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {View} from 'react-native';
interface RatingAtomProps {
  preset?: TextPresetType;
  ratingTitle?: string;
  direction?: boolean;
}

export const RatingAtom: React.FC<RatingAtomProps> = ({
  preset = 'smallBold',
  ratingTitle,
  direction = false,
}) => {
  return (
    <View style={[commonStyle.flexCenter, {alignSelf: 'flex-start'}]}>
      {direction ? <Images.SVG.Star1 /> : null }
      <TextAtom
        text={ratingTitle}
        preset={preset}
        style={{marginEnd: mScale.xxs, paddingTop: mScale.xxs}}
      />
      {!direction ? <Images.SVG.Star1 /> : null}
    </View>
  );
};
