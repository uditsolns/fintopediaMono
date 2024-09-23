import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';
import {View} from 'react-native';
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
import {RouteKeys} from '@src/navigation/RouteKeys';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {Toast} from 'react-native-toast-notifications';
import {useAuthHelper} from '@shared/src/components/structures/login/login.helper';
import {NavType} from '@src/navigation/types';

interface LoginProps extends NavType<'Login'> {}

export const Login: React.FC<LoginProps> = ({navigation}) => {
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
      {/* <HeaderLeftMolecule text="Welcome back" /> */}

      <ScrollViewAtom>
        <View style={{marginTop: mScale.base}}>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              label="Phone number"
              placeholder="Enter your phone number"
              keyboardType="numeric"
            />
          </View>
          <View>
            <InputAtom
              shape="square"
              label="Password"
              placeholder="Enter your password"
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
            <ButtonAtom title="Login" />
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
