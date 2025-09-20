import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {colorPresets} from '@shared/src/theme/color';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import BorderWithThickness from '@src/components/Border';

export const NavTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  insets,
}) => {
  return (
    <View
      style={[
        styles.container,
        {height: insets.bottom > 20 ? moderateScale(100) : moderateScale(80)},
      ]}>
         <BorderWithThickness mv={0} />
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <Pressable
              hitSlop={{
                top: mScale.md,
                bottom: mScale.md,
                left: mScale.md,
                right: mScale.md,
              }}
              onPress={onPress}
              key={index}
              style={[
                styles.tab,
                {paddingBottom: insets.bottom > 20 ? mScale.lg : mScale.xs},
              ]}>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? colorPresets.CTA : colorPresets.GRAY1,
                  size: mScale.lg2,
                })}
              <TextAtom
                style={{
                  color: isFocused ? colorPresets.CTA : colorPresets.GRAY1,
                }}
                text={label.toString()}
                preset="xSmall"
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPresets.BG,
   
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: mScale.lg,
    gap: mScale.base,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: mScale.sm,
  },
});
