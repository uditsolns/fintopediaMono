import {WINDOW_WIDTH} from '@shared/src/theme/metrics';
import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientBorderBoxProps {
  children?: ReactNode;
  linearColor2?: any;
  linearColor?: any;
  borderRadium?: number;
  width?: any;
  style?:any
}

const GradientBorderBox: React.FC<GradientBorderBoxProps> = ({
  children,
  width = '100%',
  linearColor2 = ['#7A7FA2', '#141622'],
  linearColor = ['#2D303D', '#212330', '#101320', '#111521', '#0D0F1B'],
  borderRadium = 12,
  style
}) => {
  return (
    <View style={[{width: width},style]}>
      <LinearGradient
        colors={linearColor2}
        locations={[0, 1]}
        start={{x: 1, y: 0.35}}
        end={{x: 0, y: 0.9}}
        style={[styles.border, {borderRadius: borderRadium}]}>
        <LinearGradient
          colors={linearColor}
          start={{x: 0.95, y: -0.42}}
          end={{x: 0, y: 0.5}}
          style={[styles.innerContainer, {borderRadius: borderRadium}]}>
          {children}
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    paddingVertical: 1,
    paddingLeft: 2,
    paddingRight: 1,
  },
  innerContainer: {
    flexGrow: 1,
    flex: 1,
  },
});

export default GradientBorderBox;
