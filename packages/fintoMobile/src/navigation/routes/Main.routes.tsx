import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {RouteKeys} from '../RouteKeys';
import {TabsRoutes} from './Tabs.routes';

interface MainRoutesProps {}

const Stack = createNativeStackNavigator();

export const MainRoutes: React.FC<MainRoutesProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.HOMESCREEN}
        component={TabsRoutes}
      />
    </Stack.Navigator>
  );
};
