import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Rect} from 'react-native-svg';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import GradientBorderBox from './Border/GradientBorderBox';

interface TagsAtomInterface {
  title?: string;
}

const TagsAtom: React.FC<TagsAtomInterface> = ({title}) => {
  return (
    <GradientBorderBox
      linearColor2={['#B8BCCB', '#0F0F0F']}
      borderRadium={5}
      style={{width: undefined}}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextAtom
            text={title}
            preset="medium"
            style={{
              fontWeight: '500',
            }}
          />
        </View>
      </View>
    </GradientBorderBox>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: mScale.xs,
    position: 'relative',
    alignSelf: 'flex-start',
  },

  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: mScale.md3,
    paddingHorizontal: mScale.lg,
  },
});

export default TagsAtom;
