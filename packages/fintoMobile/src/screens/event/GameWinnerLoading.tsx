import {useNavigation, NavigationProp} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import ImageAtom from '@src/components/Image/ImageAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React, {useEffect} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface GameWinnerLoadingProps{}

export const GameWinnerLoading:React.FC<GameWinnerLoadingProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(RouteKeys.GAMEWINNERSCREEN);
    }, 1500);
  }, []);

  return (
    <GradientTemplate>
      <View style={[commonStyle.container, styles.centeredContainer]}>
        <ImageAtom
          sourceRequire={require('@shared/src/assets/img/gameWinnerLoading.png')}
        />
        <View style={styles.paddingLarge}>
          <TextAtom
            text="Games are ended, Result will be declared soon!"
            preset="heading1"
            style={styles.centeredText}
          />
          <View style={styles.paddingHorizontal}>
            <TextAtom
              text="Please check back in sometime for results."
              preset="body"
              style={[styles.centeredMediumText, {color: colorPresets.GRAY}]}
            />
          </View>
        </View>
      </View>
    </GradientTemplate>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  paddingLarge: {
    padding: mScale.lg2,
  },
  centeredText: {
    textAlign: 'center',
  },
  paddingHorizontal: {
    paddingHorizontal: mScale.base,
    paddingTop: mScale.md,
  },
  centeredMediumText: {
    textAlign: 'center',
    fontWeight: '400',
  },
});
