import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
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
import {HeaderBar} from '../components/Header/HeaderBar';
import {Images} from '@shared/src/assets';
import {mScale} from '@shared/src/theme/metrics';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';
import {colorPresets} from '@shared/src/theme/color';
import { ForgotPasswordOTP } from '@src/screens/auth/ForgotPasswordOTP';
import { OtpLogin } from '@src/screens/auth/OtpLogin';

interface AuthRoutesProps {}

const Stack = createNativeStackNavigator();

export const AuthRoutes: React.FC<AuthRoutesProps> = ({}) => {
  const headerBack = (onBackPress?: () => void, color?: string) => (
    <PressableAtom hitSlop={mScale.md} onPress={onBackPress}>
      <Images.SVG.ChevronLeft width={mScale.lg3} color={colorPresets.CTA} />
    </PressableAtom>
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerStyle: {backgroundColor: colorPresets.TRANSPARENT},
        header: props => <HeaderBar {...props} />,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.SPLASHSCREEN}
        component={Splash as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.ONBOARDINGSCREEN}
        component={Onboarding as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: 'Welcome back',
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.LOGINSCREEN}
        component={Login as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: 'Create account',
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.SIGNUPSCREEN}
        component={Signup as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: '',
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.FORGOTPASSWORDSCREEN}
        component={ForgotPassword as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: '',
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.FORGOTPASSWORDOTPSCREEN}
        component={ForgotPasswordOTP as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: '',
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.RESETPASSWORDSCREEN}
        component={ResetPassword as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: '',
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.EMAILVERIFICATIONSCREEN}
        component={EmailVerification as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: '',
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.OTPLOGINSCREEN}
        component={OtpLogin as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: '',
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.TWOFACTORAUTHSCREEN}
        component={TwoFAuth as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: '',
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.OTPSCREEN}
        component={OTP as React.FC}
      />
    </Stack.Navigator>
  );
};
