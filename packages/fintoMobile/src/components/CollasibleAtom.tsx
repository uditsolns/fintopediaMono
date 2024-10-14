import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import React from 'react';
import {Pressable, PressableProps, View} from 'react-native';

interface CollapsibleAtomInterface extends PressableProps {
  collasibleTilte?: string;
  children?: React.ReactNode;
}

export const CollapsibleAtom: React.FunctionComponent<
  CollapsibleAtomInterface
> = ({children, collasibleTilte, ...props}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <View style={{}}>
      <View style={[commonStyle.flexSpaceBetween, {marginBottom: 10}]}>
        <TextAtom text={collasibleTilte} preset="heading2" />
        <Pressable onPress={toggleExpanded}>
          {expanded ? <Images.SVG.ChevronTop width={24} /> : <Images.SVG.ChevronDown width={24} />}
        </Pressable>
      </View>
      {expanded ? <View>{children}</View> : null}
    </View>
  );
};
