import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Text, View} from 'react-native';
import {RouteKeys} from '../RouteKeys';
import {Login} from '@src/screens/auth/Login';
import {Onboarding} from '@src/screens/onboarding/Onboarding';

interface AuthRoutesProps {}

const Stack = createNativeStackNavigator();

export const AuthRoutes: React.FC<AuthRoutesProps> = ({}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteKeys.ONBOARDINGSCREEN} component={Onboarding as React.FC} />
      <Stack.Screen name={RouteKeys.LOGINSCREEN} component={Login as React.FC} />
    </Stack.Navigator>
  );
};
