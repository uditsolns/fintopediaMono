import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
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
        {flex: 1, paddingHorizontal:paddingHorizontal, marginBottom: mScale.md},
      ]}>
      <TextAtom text={title} preset="heading2" />
      {visible ? (
        <TouchableOpacity onPress={onPress}>
          <TextAtom
            text={viewTitle}
            preset="titleBold"
            style={{textDecorationLine: 'underline'}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity />
      )}
    </View>
  );
};
