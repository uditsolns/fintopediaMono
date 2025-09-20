import {mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Rect, Path} from 'react-native-svg';

const BorderWithThickness = ({mv = mScale.lg, style, height = 1}: any) => {
  return (
    <View style={[styles.container, {marginVertical: mv}, style]}>
      <Svg height={`${height}`} width="100%">
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <Stop offset="0%" stopColor="#7A7FA2" stopOpacity="0.1" />
            <Stop offset="15%" stopColor="#7A7FA2" stopOpacity="0.2" />
            <Stop offset="35%" stopColor="#7A7FA2" stopOpacity="0.4" />
            <Stop offset="65%" stopColor="#7A7FA2" stopOpacity="0.5" />
            <Stop offset="85%" stopColor="#7A7FA2" stopOpacity="0.75" />
            <Stop offset="100%" stopColor="#7A7FA2" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height={`${height}`} fill="url(#grad)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BorderWithThickness;
