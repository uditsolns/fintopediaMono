import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { mScale } from '@shared/src/theme/metrics';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

interface ViewAllInterfaceProps {
  title?: string;
  viewTitle?: string;
  visible?: boolean;
  paddingHorizontal?:number,
  onPress?: () => void;
}

export const ViewAll: React.FC<ViewAllInterfaceProps> = ({
  title,
  viewTitle = 'View All',
  visible = true,
  paddingHorizontal = mScale.base,
  onPress,
}) => {
  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        { paddingHorizontal:paddingHorizontal, marginBottom: mScale.md},
      ]}>
      <TextAtom text={title} preset="heading3" style={{color:colorPresets.CTA}} />
      {visible ? (
        <TouchableOpacity onPress={onPress}>
          <TextAtom
            text={viewTitle}
            preset="smallBold"
            style={{textDecorationLine: 'underline'}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity />
      )}
    </View>
  );
};
