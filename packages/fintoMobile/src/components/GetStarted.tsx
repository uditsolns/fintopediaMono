import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { moderateScale, mScale, WINDOW_WIDTH } from '@shared/src/theme/metrics';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

interface GetStartedInterface {
  onPress?: () => void;
  btnTitle?: string;
  title?: string;
  titleDesc?: string;
}

const GetStarted: React.FunctionComponent<GetStartedInterface> = ({
  onPress,
  btnTitle = 'Get started',
  title = 'Don’t know where to start?',
  titleDesc,
}) => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.svgContainer}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="1" x2="1" y2="0">
            <Stop offset="0%" stopColor="#2D303D" />
            <Stop offset="25%" stopColor="#212330" />
            <Stop offset="50%" stopColor="#101320" />
            <Stop offset="75%" stopColor="#111521" />
            <Stop offset="100%" stopColor="#0D0F1B" />

          </LinearGradient>
        </Defs>
        <Rect width={WINDOW_WIDTH} height="100%" fill="url(#grad)" />
      </Svg>
      <View style={[commonStyle.flexSpaceBetween, styles.innerContainer]}>
        <View style={{ flex: 1 }}>
          <TextAtom
            text={title}
            preset="titleBold"
            style={{ width: moderateScale(135) }}
          />
          {titleDesc ? (
            <TextAtom
              text={titleDesc}
              preset="xSmall"
              style={{ width: moderateScale(135),color:"#D5D5D9" }}
            />
          ) : null}
        </View>
        {/* <SmallButtonAtom
          btnTitle={btnTitle}
          preset="smallBoldTitle12"
          style={styles.button}
          onPress={onPress}
        /> */}
        <Pressable onPress={onPress}>
          <TextAtom text={btnTitle} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 42,
    },
    shadowOpacity: 0.2,
    shadowRadius: 25.1,
    elevation: 8,

  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  innerContainer: {
    width: '100%',
    padding: mScale.lg,
    flex: 1,
  },
  button: {
    width: moderateScale(126),
  },
});

export default GetStarted;
