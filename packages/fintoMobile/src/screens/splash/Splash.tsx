import {useNavigation} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface SplashProps extends NavType<'Splash'> {}

export default function Splash({navigation}: SplashProps) {
  const {auth} = useAppSelector(state => state.auth);
  React.useEffect(() => {
    setTimeout(() => {
      if (auth?.token) {
        navigation.navigate(RouteKeys.HOMESCREEN);
      } else {
        navigation.navigate(RouteKeys.ONBOARDINGSCREEN);
      }
    }, 1000);
  }, []);
  return (
    <GradientTemplate>
      <View style={styles.centerView}>
        <Image source={require('@shared/src/assets/img/logo.png')} />
      </View>
    </GradientTemplate>
  );
}

const styles = StyleSheet.create({
  centerView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
