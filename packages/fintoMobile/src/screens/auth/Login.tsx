import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';
import {Alert, View} from 'react-native';
import {commonStyle} from '@shared/src/commonStyle';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
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

interface LoginProps extends NavType<'Login'> {}

export const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {auth, loading} = useAppSelector(state => state.auth);
  const {authFormik, authInputProps} = useAuthHelper();
  const {handleSubmit, setFieldValue} = authFormik;
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1086429717269-pqt2o5l783a0dadn2gqjolrksdjanghj.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  React.useEffect(() => {
    if (auth) {
      if (auth.token) {
        navigation.navigate(RouteKeys.HOMESCREEN);
      }
      if (auth?.message) {
        Toast.show(auth?.message, {
          type: 'error',
        });
      }
    }
  }, [auth]);

  const userGogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log(JSON.stringify(response));
        let params = {
          email: response?.data?.user?.email,
        };
        await dispatch(googleSignIn(params));
        GoogleSignin.signOut();
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
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
              navigation.navigate(RouteKeys.FORGOTPASSWORDSCREEN);
            }}
          />
          <View style={{marginTop: mScale.base}}>
            <ButtonAtom
              title="Login"
              onPress={() => {
                handleSubmit();
              }}
              loading={loading?.login}
            />
          </View>
          <ButtonAtom
            title="Login with OTP"
            preset="secondary"
            onPress={() => {
              navigation.navigate(RouteKeys.EMAILVERIFICATIONSCREEN);
            }}
          />
          <View style={{marginVertical: mScale.md, alignSelf: 'center'}}>
            <TextAtom text={'or'} preset="medium" />
          </View>
          <ButtonAtom
            title="Continue with google"
            preset="tertiary"
            onPress={userGogleLogin}
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
