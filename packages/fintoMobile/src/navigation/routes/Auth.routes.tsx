import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Text, View} from 'react-native';
import {RouteKeys} from '../RouteKeys';
import {Login} from '@src/screens/auth/Login';
import {Onboarding} from '@src/screens/onboarding/Onboarding';
import {Signup} from '@src/screens/auth/Signup';
import {OTP} from '@src/screens/auth/OTP';
import {EmailVerification} from '@src/screens/auth/EmailVerification';
import {TwoFAuth} from '@src/screens/auth/TwoFAuth';
import {ResetPassword} from '@src/screens/auth/ResetPassword';

interface AuthRoutesProps {}

const Stack = createNativeStackNavigator();

export const AuthRoutes: React.FC<AuthRoutesProps> = ({}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={RouteKeys.ONBOARDINGSCREEN} component={Onboarding} />
      <Stack.Screen name={RouteKeys.LOGINSCREEN} component={Login} />
      <Stack.Screen name={RouteKeys.SIGNUPSCREEN} component={Signup} />
      <Stack.Screen name={RouteKeys.OTPSCREEN} component={OTP} />
      <Stack.Screen
        name={RouteKeys.EMAILVERIFICATIONSCREEN}
        component={EmailVerification}
      />
      <Stack.Screen name={RouteKeys.TWOFACTORAUTHSCREEN} component={TwoFAuth} />
      <Stack.Screen
        name={RouteKeys.RESETPASSWORDSCREEN}
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};
