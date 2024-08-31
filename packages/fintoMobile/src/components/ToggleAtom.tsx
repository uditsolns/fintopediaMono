import { Images } from '@shared/src/assets';
import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { mScale } from '@shared/src/theme/metrics';
import React from 'react';
import {Pressable, TouchableOpacity, TouchableOpacityProps, View} from 'react-native';


interface ToggleAtomInterface extends TouchableOpacityProps {
  collasibleTilte?: string;
}

export const ToggleAtom: React.FunctionComponent<
  ToggleAtomInterface
> = ({children, collasibleTilte, ...props}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <View style={{paddingHorizontal: mScale.base}}>
      <Pressable
        style={[commonStyle.flexSpaceBetween]}
        hitSlop={50}
        onPress={toggleExpanded}>
        <TextAtom text={collasibleTilte} preset="heading4" />
        
        {expanded ? <Images.SVG.CircleChevronUpIcon /> : <Images.SVG.CircleChevronDownIcon />}
      </Pressable>
      {expanded ? <View>{children}</View> : null}
    </View>
  );
};
