import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { mScale, WINDOW_WIDTH } from '@shared/src/theme/metrics';

interface TagsAtomInterface {
  title: string;
}

const TagsAtom: React.FC<TagsAtomInterface> = ({ title }) => {
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
      <View style={styles.textContainer}>
        <TextAtom text={title} preset="titleBold" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
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
    marginVertical: mScale.xs,
    position: 'relative',
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
    paddingHorizontal: mScale.base,
    paddingVertical: mScale.md,
  },
});

export default TagsAtom;
