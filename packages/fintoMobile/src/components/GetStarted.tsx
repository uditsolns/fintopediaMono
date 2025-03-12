import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Rect} from 'react-native-svg';
import GradientBorderBox from './Border/GradientBorderBox';

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
    <GradientBorderBox borderRadium={8}>
      <View style={styles.container}>
        <View style={[commonStyle.flexSpaceBetween, styles.innerContainer]}>
          <View style={{flex: 1}}>
            <TextAtom
              text={title}
              preset="titleBold"
              style={{width: moderateScale(135)}}
            />
            {titleDesc ? (
              <TextAtom
                text={titleDesc}
                preset="xSmall"
                style={{color: '#D5D5D9',width:moderateScale(150)}}
              />
            ) : null}
          </View>
          <View style={{width: moderateScale(150)}}>
            <ButtonAtom title={btnTitle} onPress={onPress} />
          </View>
        </View>
      </View>
    </GradientBorderBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
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
    padding: mScale.base,
    flex: 1,
  },
  button: {
    width: moderateScale(126),
  },
});

export default GetStarted;
