import {Images} from '@shared/src/assets';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import {InputAtom} from '@src/components/Input/InputAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import * as React from 'react';
import {View} from 'react-native';
import {useForgotHelper} from '@shared/src/components/structures/forgot/forgot.helper';
import {forgotField} from '@shared/src/components/structures/forgot/forgotModel';

interface ForgotPasswordProps extends NavType<'ForgotPassword'> {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({navigation}) => {
  const {forgot, loading} = useAppSelector(state => state.auth);
  const {forgotFormik, forgotInputProps} = useForgotHelper();
  const {handleSubmit, setFieldValue} = forgotFormik;

  React.useEffect(() => {
    if (forgot) {
    }
  }, [forgot]);

  return (
    <GradientTemplate>
      <ScrollViewAtom contentContainerStyle={{marginTop: mScale.xxl1}}>
        <View>
          <View style={{marginVertical: mScale.base, padding: mScale.md}}>
            <View style={{alignSelf: 'center'}}>
              <Images.SVG.ForgotIcon />
            </View>
            <TextAtom
              text={`Forgot Password?`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={`Enter your email address and we’ll send you the reset password link`}
              preset="medium"
              style={{textAlign: 'center'}}
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              {...forgotInputProps(forgotField.email.name)}
              label={forgotField.email.label}
              placeholder={forgotField.email.placeHolder}
              autoCapitalize="none"
            />
          </View>
          <ButtonAtom
            title="Send link"
            onPress={() => {
              handleSubmit();
            }}
            loading={loading?.forgot}
          />

          <View style={[{marginTop: mScale.base, alignSelf: 'center'}]}>
            <TextAtom
              text={`Didn’t get email? Kindly check spam box too `}
              preset="medium"
              style={{textAlign: 'center'}}
            />
            <LinkButton
              text="Send it again?"
              style={{marginVertical: mScale.md, alignSelf: 'center'}}
              onPress={() => {
                navigation.navigate(RouteKeys.RESETPASSWORDSCREEN);
              }}
            />
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
