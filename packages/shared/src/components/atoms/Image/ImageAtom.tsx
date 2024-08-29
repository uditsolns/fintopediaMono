import React from "react";
import {
  Image,
  ImageStyle,
  View,
  ViewStyle,
  ImageSourcePropType,
  StyleProp,
} from "react-native";

interface ImageAtomProps {
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  sourceRequire?: number | ImageSourcePropType;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  tintColor?: string;
}

const ImageAtom: React.FC<ImageAtomProps> = ({
  containerStyle,
  imageStyle,
  sourceRequire,
  resizeMode = "contain",
  tintColor,
  ...rest
}) => {
  return (
    <View {...rest} style={containerStyle}>
      <Image
        style={imageStyle}
        source={sourceRequire}
        resizeMode={resizeMode}
        tintColor={tintColor}
      />
    </View>
  );
};

export default ImageAtom;
