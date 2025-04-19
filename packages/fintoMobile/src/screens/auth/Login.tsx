import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';
import {Alert, PermissionsAndroid, Platform, View} from 'react-native';
import {commonStyle} from '@shared/src/commonStyle';
import {Images} from '@shared/src/assets';
import {colorPresets} from '@shared/src/theme/color';
import {InputAtom} from '@src/components/Input/InputAtom';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import FollowUsMolecule from '@src/components/molecules/FollowUsMolecule/FollowUsMolecule';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {NavType} from '@src/navigation/types';
import {useAuthHelper} from '@shared/src/components/structures/login/login.helper';
import {authField} from '@shared/src/components/structures/login/loginModel';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';
import {logout} from '@shared/src/provider/store/reducers/auth.reducer';
import {Toast} from 'react-native-toast-notifications';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googleSignIn} from '@shared/src/provider/store/services/auth.service';
import {ScrollViewAtom} from 'shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {OneSignal} from 'react-native-onesignal';
import {useOtplessContext} from '@src/components/context/OtplessContextApi';

interface LoginProps extends NavType<'Login'> {}

export const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {auth, loading, err} = useAppSelector(state => state.auth);
  const {authFormik, authInputProps} = useAuthHelper();
  const {handleSubmit, setFieldValue} = authFormik;
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);
  const {deviceId, setDeviceId} = useOtplessContext();
  let errorMessages = err?.loginErr?.message ? err?.loginErr?.message : '';
  React.useEffect(() => {
    GoogleSignin.configure();
  }, []);
  React.useEffect(() => {
    if (auth?.token) {
      console.log('Login successful:', auth.token);
      Toast.show('Login successful!', {
        type: 'success',
      });
      navigation.navigate(RouteKeys.HOMESCREEN);
    }
  }, [auth]);

  React.useEffect(() => {
    if (errorMessages) {
      Toast.show(errorMessages, {
        type: 'error',
      });
    }
  }, [errorMessages]);

  const getTokenFromOneSignal = async () => {
    try {
      await OneSignal.User.pushSubscription.getIdAsync().then(async token => {
        let token_data = token;
        setDeviceId(`${token_data}`);
      });
    } catch (error) {
      console.log('error in OneSignal token generation :', error);
    }
  };

  const userGogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log(JSON.stringify(response));
        let params = {
          email: response?.data?.user?.email,
          device_id: deviceId,
          device_id_web:""
        };
        console.log('params', params);
        dispatch(googleSignIn(params))
          .unwrap()
          .then(res => {
            if (res?.token) {
              Toast.show('Login successful!', {
                type: 'success',
              });
              GoogleSignin.signOut();
              navigation.navigate(RouteKeys.HOMESCREEN);
            }
          })
          .catch(err => {
            GoogleSignin.signOut();
            Toast.show('Bads creds', {
              type: 'error',
            });
          });
      } else {
        GoogleSignin.signOut();
      }
    } catch (error) {
      GoogleSignin.signOut();
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log(
              'operation (eg. sign in) already in progress',
              error.code,
            );
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log(
              'Android only, play services not available or outdated',
              error.code,
            );
            break;
          default:
            console.log('some other error happened', error);
        }
      } else {
        console.log("an error that's not related to google sign in occurred");
      }
    }
  };

  React.useEffect(() => {
    getTokenFromOneSignal();
  }, [deviceId]);

  React.useEffect(() => {
    const checkPermission = async () => {
      await requestAllPermissions();
    };

    checkPermission();

    getTokenFromOneSignal();
    setFieldValue(authField.device_id.name, deviceId);
    setFieldValue(authField.device_id_web.name, '');
  }, []);

  const requestAllPermissions = async () => {
    const androidVersion: number = Number(Platform.Version);

    try {
      const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA];

      const android13Permissions = [
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ];

      const allPermissions =
        Number(androidVersion) >= 33
          ? [...permissions, ...android13Permissions]
          : [
              ...permissions,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ];

      const granted = await PermissionsAndroid.requestMultiple(allPermissions, {
        title: 'App Permissions',
        message: 'This app needs access to your storage, and camera.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

      for (const permission in granted) {
        if (granted[permission] !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log(`Permission ${permission} denied.`);
        }
      }
      console.log('All requested permissions handled.');
    } catch (err) {
      console.log('Permission request error:', err);
    }
    return null;
  };

  return (
    <GradientTemplate style={{paddingTop: moderateScale(60)}}>
      <ScrollViewAtom
        contentContainerStyle={{
          marginTop: mScale.base,
        }}>
        <View style={{}}>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              {...authInputProps(authField.phone.name)}
              label={authField.phone.label}
              placeholder={authField.phone.placeHolder}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <View>
            <InputAtom
              shape="square"
              {...authInputProps(authField.password.name)}
              label={authField.password.label}
              placeholder={authField.password.placeHolder}
              rightIcon={
                <PressableAtom
                  onPress={() => {
                    setPasswordVisible(!passwordVisible);
                  }}>
                  {passwordVisible ? (
                    <Images.SVG.Eye width={20} color={colorPresets.CTA} />
                  ) : (
                    <Images.SVG.EyeOff width={20} color={colorPresets.CTA} />
                  )}
                </PressableAtom>
              }
              secureTextEntry={passwordVisible ? true : false}
              autoCapitalize="none"
            />
          </View>
          <LinkButton
            text="Forgot password?"
            style={{marginTop: mScale.xxl}}
            onPress={() => {
              dispatch(logout());
              navigation.navigate(RouteKeys.FORGOTPASSWORDSCREEN);
            }}
          />
          <View style={{marginTop: mScale.base}}>
            <ButtonAtom
              title="Login"
              onPress={() => {
                setFieldValue(authField.device_id.name, deviceId);
                setFieldValue(authField.device_id_web.name, '');
                handleSubmit();
              }}
              loading={loading.login ? true : false}
            />
          </View>
          <ButtonAtom
            title="Login with OTP"
            preset="secondary"
            onPress={() => {
              dispatch(logout());
              navigation.navigate(RouteKeys.OTPLOGINSCREEN);
            }}
          />
          <View style={{marginVertical: mScale.md, alignSelf: 'center'}}>
            <TextAtom text={'or'} preset="medium" />
          </View>
          <ButtonAtom
            title="Continue with google"
            preset="tertiary"
            onPress={userGogleLogin}
            loading={loading.google_login ? true : false}
            loadingColor={colorPresets.CTA}
          />
          <ButtonAtom title="Continue as guest" preset="secondary" />
          <View style={[commonStyle.flexCenter, {marginTop: mScale.base}]}>
            <TextAtom text={`Don't have an account ? `} preset="medium" />
            <LinkButton
              text="Register now"
              onPress={() => {
                dispatch(logout());
                navigation.navigate(RouteKeys.SIGNUPSCREEN);
              }}
            />
          </View>
          <View style={{marginVertical: mScale.lg}}>
            <FollowUsMolecule />
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
