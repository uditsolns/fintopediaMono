import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import LoaderAtom from '@src/components/LoaderAtom';
import React from 'react';
import {View} from 'react-native';
import {useUpdatePasswordHelper} from '@shared/src/components/structures/update-password/updatePassword.helper';
import {updatePasswordField} from '@shared/src/components/structures/update-password/updatePasswordModel';
import {Toast} from 'react-native-toast-notifications';
import {NavType} from '@src/navigation/types';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';

interface ChangePasswordProps extends NavType<'ChangePassword'> {}

export const ChangePassword: React.FC<ChangePasswordProps> = ({navigation}) => {
  const {confirm, auth, loading} = useAppSelector(state => state.auth);
  const {updatePasswordFormik, updatePasswordInputProps} =
    useUpdatePasswordHelper();
  const {handleSubmit, setFieldValue} = updatePasswordFormik;
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  React.useEffect(() => {
    if (confirm) {
      Toast.show(confirm?.status_message, {
        type: confirm?.status == 'success' ? 'success' : 'error',
      });
    }
  }, [confirm]);

  React.useEffect(() => {
    setFieldValue(updatePasswordField.user_id.name, auth?.user?.id);
  }, [auth, confirm]);

  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingTop: moderateScale(70),
        padding: mScale.lg1,
      }}>
      {loading?.confirm ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <ScrollViewAtom contentContainerStyle={{paddingTop: moderateScale(44)}}>
        <View style={{marginBottom: mScale.lg}}>
          <InputAtom
            shape="square"
            {...updatePasswordInputProps(updatePasswordField.new_password.name)}
            label={updatePasswordField.new_password.label}
            placeholder={updatePasswordField.new_password.placeHolder}
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
        <View style={{marginBottom: 0}}>
          <InputAtom
            shape="square"
            {...updatePasswordInputProps(
              updatePasswordField.new_password_confirmation.name,
            )}
            label={updatePasswordField.new_password_confirmation.label}
            placeholder={
              updatePasswordField.new_password_confirmation.placeHolder
            }
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

        <View style={{marginTop: moderateScale(64)}}>
          <ButtonAtom
            title={'Change Password'}
            preset={'primary'}
            textPreset={'titleBold'}
            onPress={() => {
              handleSubmit();
            }}
            loading={loading.confirm}
          />
          <ButtonAtom
            title="Cancel"
            preset={'tertiary'}
            textPreset={'titleBold'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
