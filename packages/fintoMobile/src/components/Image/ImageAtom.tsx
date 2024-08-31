import React from 'react';
import {
  Image,
  View,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  StyleProp,
} from 'react-native';

interface ImageAtomProps {
  style?: StyleProp<ViewStyle | ImageStyle>;
  sourceRequire?: ImageSourcePropType;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  tintColor?: string;
}

const ImageAtom: React.FC<ImageAtomProps> = ({
  style,
  sourceRequire,
  resizeMode = 'contain',
  tintColor,
  ...rest
}) => {
  return (
    <View {...rest} style={style}>
      <Image
        style={style as StyleProp<ImageStyle>}
        source={sourceRequire}
        resizeMode={resizeMode}
        tintColor={tintColor}
      />
    </View>
  );
};

export default ImageAtom;
