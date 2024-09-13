import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Text, View} from 'react-native';
import {RouteKeys} from '../RouteKeys';
import {Login} from '@src/screens/auth/Login';
import {Onboarding} from '@src/screens/onboarding/Onboarding';
import {Signup} from '@src/screens/auth/Signup';
import {ForgotPassword} from '@src/screens/auth/ForgotPassword';
import {ResetPassword} from '@src/screens/auth/ResetPassword';
import {EmailVerification} from '@src/screens/auth/EmailVerification';
import {TwoFAuth} from '@src/screens/auth/TwoFAuth';
import {OTP} from '@src/screens/auth/OTP';
import Splash from '@src/screens/splash/Splash';

interface AuthRoutesProps {}

const Stack = createNativeStackNavigator();

export const AuthRoutes: React.FC<AuthRoutesProps> = ({}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={RouteKeys.SPLASHSCREEN}
        component={Splash as React.FC}
      />
      <Stack.Screen
        name={RouteKeys.ONBOARDINGSCREEN}
        component={Onboarding as React.FC}
      />
      <Stack.Screen
        name={RouteKeys.LOGINSCREEN}
        component={Login as React.FC}
      />
      <Stack.Screen
        name={RouteKeys.SIGNUPSCREEN}
        component={Signup as React.FC}
      />
      <Stack.Screen
        name={RouteKeys.FORGOTPASSWORDSCREEN}
        component={ForgotPassword as React.FC}
      />
      <Stack.Screen
        name={RouteKeys.RESETPASSWORDSCREEN}
        component={ResetPassword as React.FC}
      />
      <Stack.Screen
        name={RouteKeys.EMAILVERIFICATIONSCREEN}
        component={EmailVerification as React.FC}
      />
      <Stack.Screen
        name={RouteKeys.TWOFACTORAUTHSCREEN}
        component={TwoFAuth as React.FC}
      />
      <Stack.Screen name={RouteKeys.OTPSCREEN} component={OTP as React.FC} />
    </Stack.Navigator>
  );
};
