import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {
  HeaderBackButtonProps,
  HeaderButtonProps,
} from '@react-navigation/native-stack/lib/typescript/src/types';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {WINDOW_WIDTH, mScale} from '@shared/src/theme/metrics';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface HeaderBarProps extends NativeStackHeaderProps {}

export const HeaderBar: React.FC<HeaderBarProps> = ({options}) => {
  const insets = useSafeAreaInsets();

  const hasNotch = insets.top > 20;
  const [width, setWidth] = React.useState(WINDOW_WIDTH - mScale.lg3);
  const [height, setHeight] = React.useState(mScale.xxxl);

  const headerLeft = options.headerLeft
    ? options.headerLeft({} as HeaderBackButtonProps)
    : null;
  const headerRight = options.headerRight
    ? options.headerRight({} as HeaderButtonProps)
    : null;
  const headerTitle = options.headerTitle ? options.headerTitle : '';
  return (
    <View
      style={{
        flex: 1,
        paddingTop: hasNotch
          ? insets.top - mScale.sm
          : Platform.OS === 'ios'
          ? mScale.md
          : 0,
        backgroundColor: colorPresets.TRANSPARENT,
      }}>
      <View style={styles.container}>
        <View style={styles.left}>{headerLeft}</View>
        <View style={styles.title}>
          <TextAtom
            preset="body"
            numberOfLines={1}
            style={{lineHeight: mScale.xl}}
            text={headerTitle as string}
          />
        </View>
        <View style={styles.right}>{headerRight}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: mScale.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: mScale.xxxl,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    flex: 2,
    alignItems: 'center',
  },
});
