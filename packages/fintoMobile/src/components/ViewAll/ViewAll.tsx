import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {TextPresetType} from '@shared/src/components/atoms/Text/TextPresets';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

interface ViewAllInterfaceProps {
  title?: string;
  viewTitle?: string;
  visible?: boolean;
  paddingHorizontal?: number;
  preset?: TextPresetType;
  onPress?: () => void;
}

export const ViewAll: React.FC<ViewAllInterfaceProps> = ({
  title,
  viewTitle = 'View All',
  visible = true,
  paddingHorizontal = mScale.base,
  preset = 'heading3',
  onPress,
}) => {
  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        {paddingHorizontal: paddingHorizontal},
      ]}>
      <TextAtom
        text={title}
        preset={preset}
        style={{color: colorPresets.CTA}}
      />
      {visible ? (
        <TouchableOpacity onPress={onPress}>
          <TextAtom
            text={viewTitle}
            preset="smallSemiBold"
            style={{textDecorationLine: 'underline', fontWeight: '500'}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity />
      )}
    </View>
  );
};
