import {mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import * as React from 'react';
import {Text, View} from 'react-native';

interface AppNavigationProps {}

export const AppNavigation: React.FC<AppNavigationProps> = ({}) => {
  return (
    <View style={{width: WINDOW_WIDTH}}>
      <Text style={{paddingHorizontal: mScale.base}}>AppNavigation</Text>
    </View>
  );
};
