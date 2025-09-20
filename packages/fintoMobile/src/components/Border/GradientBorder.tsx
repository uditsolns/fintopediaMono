import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, LayoutChangeEvent } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface GradientBorderProps {
  borderColor?: string;
  borderRadius?: number;
  children?: React.ReactNode;
  padding?: number;
}

const GradientBorder: React.FC<GradientBorderProps> = ({
  borderColor = '#7A7FA2',
  borderRadius = 16,
  children,
  padding = 10,
}) => {
  const [contentHeight, setContentHeight] = useState(50); // Default minimum height

  // Update height based on content layout
  const onContentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height + padding * 2); // Add padding for spacing
  };

  return (
    <View style={[styles.container, { borderRadius, padding }]}>
      {/* SVG Border */}
      <Svg height={contentHeight} width={width * 0.9} style={styles.svgOverlay}>
        <Defs>
          <LinearGradient id="borderGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={borderColor} stopOpacity="0.2" />
            <Stop offset="50%" stopColor={borderColor} stopOpacity="0.7" />
            <Stop offset="100%" stopColor={borderColor} stopOpacity="0.99" />
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          stroke="url(#borderGradient)"
          strokeWidth="2"
          fill="none"
          rx={borderRadius}
        />
      </Svg>

      {/* Content inside the border */}
      <View
        style={[styles.content, { borderRadius, padding }]}
        onLayout={onContentLayout}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: width * 0.9,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: 'none', // Ensures it doesn't interfere with touch events
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    width: '100%',
  },
});

export default GradientBorder;
