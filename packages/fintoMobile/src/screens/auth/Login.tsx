import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';
import {StatusBar, View} from 'react-native';
import {commonStyle} from '@shared/src/commonStyle';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {Images} from '@shared/src/assets';
import {colorPresets} from '@shared/src/theme/color';
import {InputAtom} from '@src/components/Input/InputAtom';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import FollowUsMolecule from '@src/components/molecules/FollowUsMolecule/FollowUsMolecule';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {useNavigation} from '@react-navigation/native';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {useAuthHelper} from '@shared/src/components/structures/login/login.helper';
import {authField} from '@shared/src/components/structures/login/loginModel';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {Toast} from 'react-native-toast-notifications';

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const navigation = useNavigation();
  const {auth, loading} = useAppSelector(state => state.auth);

  const {authFormik, authInputProps} = useAuthHelper();

  const {handleSubmit} = authFormik;

  React.useEffect(() => {
    if (auth?.token) {
      Toast.show('');
    }
  }, [auth]);

  return (
    <GradientTemplate>
      <HeaderLeftMolecule text="Welcome back" />

      <ScrollViewAtom>
        <View style={{marginTop: mScale.base}}>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              {...authInputProps(authField.phone.name)}
              label={authField.phone.label}
              placeholder={authField.phone.placeHolder}
              shape="square"
              keyboardType="numeric"
            />
          </View>
          <View>
            <InputAtom
              shape="square"
              {...authInputProps(authField.password.name)}
              label={authField.password.label}
              placeholder={authField.password.placeHolder}
              rightIcon={<Images.SVG.Eye width={20} color={colorPresets.CTA} />}
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
            <ButtonAtom onPress={() => handleSubmit()} title="Login" />
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
