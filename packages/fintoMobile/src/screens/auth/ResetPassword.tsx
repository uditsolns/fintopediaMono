import {Images} from '@shared/src/assets';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import {InputAtom} from '@src/components/Input/InputAtom';
import * as React from 'react';
import {View} from 'react-native';
import {useResetHelper} from '@shared/src/components/structures/reset/reset.helper';
import {resetField} from '@shared/src/components/structures/reset/resetModel';
import {NavType} from '@src/navigation/types';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';

interface ResetPasswordProps extends NavType<'ResetPassword'> {}

export const ResetPassword: React.FC<ResetPasswordProps> = ({navigation}) => {
  const {confirm, loading} = useAppSelector(state => state.auth);
  console.log(confirm)
  const {resetFormik, resetInputProps} = useResetHelper();
  const {handleSubmit, setFieldValue} = resetFormik;
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  React.useEffect(() => {
    if (confirm) {
    }
  }, [confirm]);
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
              {...resetInputProps(resetField.password.name)}
              label={resetField.password.label}
              placeholder={resetField.password.placeHolder}
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
              {...resetInputProps(resetField.password_confirmation.name)}
              label={resetField.password_confirmation.label}
              placeholder={resetField.password_confirmation.placeHolder}
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
            loading={loading?.confirm}
          />
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
