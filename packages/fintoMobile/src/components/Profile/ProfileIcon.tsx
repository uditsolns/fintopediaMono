import {StyleSheet, View, ImageStyle, ViewStyle, Pressable} from 'react-native';
import React from 'react';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {Images} from '@shared/src/assets';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {colorPresets} from '@shared/src/theme/color';

interface ProfileIconProps {
  avatarUrl: string | undefined;
  onPress?: () => void;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({avatarUrl, onPress}) => {
  return (
    <View style={styles.centeredView}>
      <ImageAtom
        sourceRequire={{uri: avatarUrl}}
        imageStyle={styles.avatar as ImageStyle}
      />
      <Pressable style={styles.iconButton} onPress={onPress}> 
        <Images.SVG.CameraIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignSelf: 'center',
  },
  avatar: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(100),
  },
  iconButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: colorPresets.CTA,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -mScale.lg2,
  },
});

export default ProfileIcon;
