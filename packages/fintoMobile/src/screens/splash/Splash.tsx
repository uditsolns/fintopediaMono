import { useNavigation } from '@react-navigation/native';
import { Images } from '@shared/src/assets';
import { GradientTemplate } from '@shared/src/components/templates/GradientTemplate';
import { RouteKeys } from '@src/navigation/RouteKeys';
import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function Splash() {
  const navigation = useNavigation();
  React.useEffect(() => {
    setTimeout(() => {
      if (false) {
        // navigation.navigate(RouteKeys.HOMESCREEN);
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