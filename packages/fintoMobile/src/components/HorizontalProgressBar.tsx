import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { mScale } from '@shared/src/theme/metrics';
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface HorizontalProgressBarProps {
  progress: number;
}

const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = ({ progress }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.line} />
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <TextAtom 
        text={`${progress?.toFixed(0)}% Completed`} 
        preset='smallBold' 
        style={{ marginTop: mScale.xs }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: mScale.md,
  },
  progressBarContainer: {
    width: '90%',
    height: 5,
    justifyContent: 'center',
    position: 'relative',
    borderRadius:10
  },
  line: {
    height: 5,
    backgroundColor: '#404251',
    width: '100%',
    position: 'absolute',
    borderRadius:10
  },
  progressBar: {
    height: 5,
    backgroundColor:colorPresets.PRIMARY,
    position: 'absolute',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default HorizontalProgressBar;
