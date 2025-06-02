import {Images} from '@shared/src/assets';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {InputAtom} from '@src/components/Input/InputAtom';
import * as React from 'react';
import {View} from 'react-native';
import {useResetPasswordHelper} from '@shared/src/components/structures/reset-password/reset-password.helper';
import {NavType} from '@src/navigation/types';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {resetField} from '@shared/src/components/structures/reset-password/reset.passwordModel';
import {number} from 'yup';
import {Toast} from 'react-native-toast-notifications';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {useOtplessContext} from '@src/components/context/OtplessContextApi';

interface ResetPasswordProps extends NavType<'ResetPassword'> {}

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  navigation,
  route,
}) => {
  const {phoneNumber} = useOtplessContext();
  const {verifyOtp, loading} = useAppSelector(state => state.auth);
  const {resetFormik, resetInputProps} = useResetPasswordHelper();
  const {handleSubmit, setFieldValue} = resetFormik;
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);
  const data = route?.params?.data;

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  React.useEffect(() => {
    if (verifyOtp) {
      Toast.show(verifyOtp?.status_message, {
        type: verifyOtp?.status == 'success' ? 'success' : 'error',
      });
      if (verifyOtp?.code === 200 && verifyOtp?.status === 'success') {
        navigation.navigate(RouteKeys.LOGINSCREEN);
      }
    }
  }, [verifyOtp]);

  React.useEffect(() => {
    setFieldValue(resetField.phone.name, phoneNumber || '');
    setFieldValue(resetField.otp.name, `${data?.otp}` || '');
  }, []);
  return (
    <GradientTemplate>
      <ScrollViewAtom contentContainerStyle={{marginTop: mScale.xxl1}}>
        <View>
          <View style={{marginVertical: mScale.base, padding: mScale.md}}>
            <View style={{alignSelf: 'center'}}>
              <Images.SVG.ForgotIcon />
            </View>
            <TextAtom
              text={`Reset Password?`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={`Enter your new password. The password should contain 8 characters`}
              preset="medium"
              style={{textAlign: 'center'}}
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              {...resetInputProps(resetField.new_password.name)}
              label={resetField.new_password.label}
              placeholder={resetField.new_password.placeHolder}
              rightIcon={
                <PressableAtom onPress={togglePassword}>
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
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              {...resetInputProps(resetField.new_password_confirmation.name)}
              label={resetField.new_password_confirmation.label}
              placeholder={resetField.new_password_confirmation.placeHolder}
              rightIcon={
                <PressableAtom onPress={togglePassword}>
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
          <ButtonAtom
            title="Reset Password"
            onPress={() => {
              handleSubmit();
            }}
            loading={loading?.verifyOtp ? true : false}
          />
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
