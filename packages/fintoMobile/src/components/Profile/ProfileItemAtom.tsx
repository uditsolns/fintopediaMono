import { StyleSheet, TouchableOpacity, View, ImageSourcePropType, Pressable } from 'react-native';
import React from 'react';
import { commonStyle } from '@shared/src/commonStyle';
import { mScale } from '@shared/src/theme/metrics';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { Images } from '@shared/src/assets';

interface ProfileItemAtomProps {
  component: JSX.Element;
  name?: string;
  onPress?: () => void;
}

const ProfileItemAtom: React.FC<ProfileItemAtomProps> = ({
  component,
  name,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        commonStyle.flexSpaceBetween,
        { flex: 1, marginVertical: mScale.base, zIndex: 1 },
      ]}
    >
      <View style={commonStyle.flexStart}>
        {component}
        <TextAtom
          text={name}
          preset="body"
          style={{ fontWeight: '400', marginStart: mScale.base }}
        />
      </View>
      <Pressable onPress={onPress}>
        <Images.SVG.ChevronRight />
      </Pressable>
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ProfileItemAtom;
