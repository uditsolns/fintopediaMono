import {WINDOW_WIDTH} from '@shared/src/theme/metrics';
import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientBorderBoxProps {
  children?: ReactNode;
  linearColor?: any;
  borderRadium?:number
}

const GradientBorderBox: React.FC<GradientBorderBoxProps> = ({
  children,
  linearColor = ['#2D303D', '#212330', '#101320', '#111521', '#0D0F1B'],
  borderRadium = 12
}) => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#7A7FA2', '#7A7FA2']}
        start={{x: 0, y: 0.85}}
        end={{x: 0, y: 0.2}}
        style={[styles.border,{borderRadius:borderRadium}]}>
        <LinearGradient
          colors={linearColor}
          start={{x: 0.95, y: -0.42}}
          end={{x: 0, y: 0.5}}
          style={[styles.innerContainer,{borderRadius:borderRadium}]}>
          {children}
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  border: {
    paddingLeft: 0.3,
    paddingTop: 0.55,
    paddingRight: 1,
    paddingBottom: 0.5,
  },
  innerContainer: {
    flexGrow: 1,
    flex: 1
  },
});

export default GradientBorderBox;
