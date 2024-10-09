import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';
import {View} from 'react-native';
import {commonStyle} from '@shared/src/commonStyle';
import {Images} from '@shared/src/assets';
import {colorPresets} from '@shared/src/theme/color';
import {InputAtom} from '@src/components/Input/InputAtom';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import FollowUsMolecule from '@src/components/molecules/FollowUsMolecule/FollowUsMolecule';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import Dropdown from '@src/components/Dropdown/Dropdown';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {NavType} from '@src/navigation/types';
import {useSignupHelper} from '@shared/src/components/structures/signup/signup.helper';
import {signupField} from '@shared/src/components/structures/signup/signupModel';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';
import {Toast} from 'react-native-toast-notifications';

interface SignupProps extends NavType<'Singup'> {}
interface Category {
  id: number;
  name: string;
}

export const CategoriesArr: Category[] = [
  {
    id: 1,
    name: 'Investment strategy',
  },
  {
    id: 2,
    name: 'Finance',
  },
  {
    id: 3,
    name: 'Mutual funds',
  },
  {
    id: 4,
    name: 'Stock trading',
  },
  {
    id: 5,
    name: 'Investment',
  },
  {
    id: 6,
    name: 'Money Market',
  },
];

export const Signup: React.FC<SignupProps> = ({navigation}) => {
  const {signupFormik, signupInputProps} = useSignupHelper();
  const {handleSubmit, setFieldValue} = signupFormik;
  const {signup, loading} = useAppSelector(state => state.auth);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(true);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  React.useEffect(() => {
    setFieldValue(signupField.role.name, 'app-user');
  }, []);

  React.useEffect(() => {
    if (signup) {
      if (signup.token) {
        Toast.show('Succeessfully register', {
          type: 'success',
        });
        navigation.navigate(RouteKeys.LOGINSCREEN);
      }
      if (signup?.error) {
        const errors = signup?.error;
        if (errors.email) {
          Toast.show(errors.email[0], {
            type: 'error',
          });
        }
        if (errors.phone) {
          Toast.show(errors.phone[0], {
            type: 'error',
          });
        }
      }
    }
  }, [signup]);
  return (
    <GradientTemplate>
      <ScrollViewAtom contentContainerStyle={{marginTop: mScale.base}}>
        <View style={{marginTop: mScale.xxl1}}>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              {...signupInputProps(signupField.first_name.name)}
              label={signupField.first_name.label}
              placeholder={signupField.first_name.placeHolder}
              shape="square"
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              {...signupInputProps(signupField.surname_name.name)}
              label={signupField.surname_name.label}
              placeholder={signupField.surname_name.placeHolder}
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              {...signupInputProps(signupField.email.name)}
              label={signupField.email.label}
              placeholder={signupField.email.placeHolder}
              autoCapitalize="none"
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              {...signupInputProps(signupField.phone.name)}
              label={signupField.phone.label}
              placeholder={signupField.phone.placeHolder}
              keyboardType="numeric"
            />
          </View>
          <View>
            <Dropdown
              dropdownItemArr={CategoriesArr}
              itemLabelField="name"
              onSelect={item => {
                setFieldValue(signupField.college.name, item?.id?.toString());
              }}
              dropdownTitle="College/University"
              placeholder={'Select College/University'}
              dropdownBg="#121622"
              dropdownTextColor={colorPresets.CTA}
              textColor={colorPresets.CTA}
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              {...signupInputProps(signupField.password.name)}
              label={signupField.password.label}
              placeholder={signupField.password.placeHolder}
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
          <View>
            <InputAtom
              shape="square"
              {...signupInputProps(signupField.password_confirmation.name)}
              label={signupField.password_confirmation.label}
              placeholder={signupField.password_confirmation.placeHolder}
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
          <View style={[commonStyle.flexStart, {marginTop: mScale.base}]}>
            <TextAtom text={`Already have an account ? `} preset="medium" />
            <LinkButton
              text="Login"
              onPress={() => {
                navigation.navigate(RouteKeys.LOGINSCREEN);
              }}
            />
          </View>
          <View style={{marginTop: mScale.base}}>
            <ButtonAtom
              title="Register"
              onPress={() => {
                handleSubmit();
              }}
              loading={loading?.signup}
            />
          </View>
          <View style={{marginVertical: mScale.md, alignSelf: 'center'}}>
            <TextAtom text={'or'} preset="medium" />
          </View>
          <ButtonAtom title="Continue as guest" preset="secondary" />

          <View style={{marginVertical: mScale.lg}}>
            <FollowUsMolecule />
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
