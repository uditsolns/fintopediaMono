import { ScrollView, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import * as React from 'react';

interface ScrollViewAtomProps extends ScrollViewProps {
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function ScrollViewAtom({
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = false,
  children,
  style,
  ...rest
}: ScrollViewAtomProps) {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={[style, { flexGrow: 1 }]}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}
