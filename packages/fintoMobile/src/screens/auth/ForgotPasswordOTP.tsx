import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {useForgotHelper} from '@shared/src/components/structures/forgot/forgot.helper';
import {forgotField} from '@shared/src/components/structures/forgot/forgotModel';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import TextInputBox from '@src/components/Input/TextInputBox';
import LoaderAtom from '@src/components/LoaderAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import * as React from 'react';
import {View} from 'react-native';
import {Toast} from 'react-native-toast-notifications';

interface ForgotPasswordOTPProps extends NavType<'ForgotPasswordOTP'> {}

export const ForgotPasswordOTP: React.FC<ForgotPasswordOTPProps> = ({
  navigation,
  route,
}) => {
  const data = route?.params?.data;
  const {forgotFormik} = useForgotHelper();
  const {handleSubmit, setFieldValue} = forgotFormik;
  const {forgot, loading} = useAppSelector(state => state.auth);
  console.log("otp in forgot password otp",data?.otp,forgot?.otp)
  const [textInputValues, setTextInputValues] = React.useState<string[]>([]);
  const [otpData, setOtpData] = React.useState(forgot ? forgot : data);
  const [time, setTime] = React.useState<number>(10);

  const handleValuesChange = (values: string[]) => {
    setTextInputValues(values);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => Math.max(prevTime - 1, 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  React.useEffect(() => {
    setFieldValue(forgotField.email.name, otpData?.email || '');
  }, []);
  return (
    <GradientTemplate>
      {loading.forgot ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null}
      <ScrollViewAtom contentContainerStyle={{marginTop: mScale.xxl1}}>
        <View>
          <View style={{marginVertical: mScale.base, padding: mScale.md}}>
            <View style={{alignSelf: 'center'}}>
              <Images.SVG.TwoFAuthIcon />
            </View>
            <TextAtom
              text={`Forgot Password OTP Verify`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={`Enter the 6-digit code sent to your register email id ${
                data?.email || ''
              }`}
              preset="medium"
              style={{textAlign: 'center', marginTop: mScale.sm}}
            />
          </View>
          <TextInputBox onChange={handleValuesChange} />
          <View style={{marginTop: mScale.xxl2}}>
            <ButtonAtom
              title="Verify"
              onPress={() => {
                if (textInputValues?.some(el => !el)) {
                  Toast.show('Please enter otp.', {
                    type: 'error',
                  });
                  return;
                }
                let otp = textInputValues?.join('');
                if (Number(otp) === otpData?.otp) {
                  Toast.show('Your otp have been verified.', {
                    type: 'success',
                  });
                  navigation.navigate(RouteKeys.RESETPASSWORDSCREEN, {
                    data: otpData,
                  });
                } else {
                  Toast.show('You have entered wrong otp.', {
                    type: 'error',
                  });
                }
              }}
            />
            <ButtonAtom
              title="Cancel"
              preset="secondary"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View
            style={[
              commonStyle.flexCenter,
              {marginTop: mScale.base, alignSelf: 'center'},
            ]}>
            <TextAtom
              text={`Didn’t get the code ?`}
              preset="medium"
              style={{textAlign: 'center'}}
            />
            <View style={[commonStyle.flexCenter, {marginStart: mScale.md}]}>
              <LinkButton
                text="Send it again?"
                style={{marginVertical: mScale.md}}
                loading={time ? true : false}
                linkColor={time ? colorPresets.GRAY3 : colorPresets.PRIMARY}
                onPress={() => {
                  handleSubmit();
                  forgotFormik.resetForm();
                }}
              />
              <TextAtom
                text={`${time} Sec`}
                preset="medium"
                style={{marginStart: mScale.md}}
              />
            </View>
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
