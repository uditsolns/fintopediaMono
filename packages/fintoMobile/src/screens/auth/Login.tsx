import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';
import {View} from 'react-native';
import {commonStyle} from '@shared/src/commonStyle';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {Images} from '@shared/src/assets';
import {colorPresets} from '@shared/src/theme/color';
import {InputAtom} from '@src/components/Input/InputAtom';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import FollowUsMolecule from '@src/components/molecules/FollowUsMolecule/FollowUsMolecule';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {Toast} from 'react-native-toast-notifications';
import {useAuthHelper} from '@shared/src/components/structures/login/login.helper';
import {NavType} from '@src/navigation/types';
import {authField} from '@shared/src/components/structures/login/loginModel';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';

interface LoginProps extends NavType<'Login'> {}

export const Login: React.FC<LoginProps> = ({navigation}) => {
  const {auth, loading} = useAppSelector(state => state.auth);
  const {authFormik, authInputProps} = useAuthHelper();
  const {handleSubmit, setFieldValue} = authFormik;
  const [passwordVisible, setPasswordVisible] = React.useState(true);

  console.log(auth);
  React.useEffect(() => {
    if (auth?.token) {
      Toast.show('');
    }
  }, [auth]);

  return (
    <GradientTemplate>
      <ScrollViewAtom contentContainerStyle={{marginTop: mScale.base}}>
        <View style={{marginTop: mScale.xxl1}}>
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
              autoCapitalize="none"
              secureTextEntry={passwordVisible ? true : false}
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
          <ButtonAtom title="Continue as guest" preset="secondary" />
          <View style={[commonStyle.flexCenter, {marginTop: mScale.base}]}>
            <TextAtom text={`Don't have an account ? `} preset="medium" />
            <LinkButton
              text="Register now"
              onPress={() => {
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
