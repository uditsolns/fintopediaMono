import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import {useOtplessContext} from '@src/components/context/OtplessContextApi';
import TextInputBox from '@src/components/Input/TextInputBox';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import * as React from 'react';
import {View} from 'react-native';
import {colorPresets} from '@shared/src/theme/color';
import {Toast} from 'react-native-toast-notifications';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {useSendOtpHelper} from '@shared/src/components/structures/send-otp-login/send-otp.helper';
import {sendOtpField} from '@shared/src/components/structures/send-otp-login/sendOtpModal';
import {useOtpLoginHelper} from '@shared/src/components/structures/otp-login/otp-login.helper';
import {otpLoginField} from '@shared/src/components/structures/otp-login/otpLoginModel';
import LoaderAtom from '@src/components/LoaderAtom';

interface OTPProps extends NavType<'OTP'> {}

export const OTP: React.FC<OTPProps> = ({navigation}) => {
  const {phoneNumber, deviceId} = useOtplessContext();
  const {send_otp, loading, err, otp_login} = useAppSelector(
    state => state.auth,
  );
  const {sendOtpFormik} = useSendOtpHelper();
  const {setFieldValue, handleSubmit} = sendOtpFormik;
  const {otpLoginFormik} = useOtpLoginHelper();
  const {
    setFieldValue: setFieldValueOTP,
    values,
    handleSubmit: handleSubmitOtp,
  } = otpLoginFormik;
  const [textInputValues, setTextInputValues] = React.useState('');
  const [time, setTime] = React.useState<number>(60);
 console.log(send_otp);
 
  const handleValuesChange = (values: any) => {
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
    fillNumber();
  }, [send_otp]);

  const fillNumber = async () => {
    setFieldValue(sendOtpField.phone.name, phoneNumber || '');
    setFieldValueOTP(otpLoginField.phone.name, phoneNumber || '');
    setFieldValueOTP(otpLoginField.device_id.name, deviceId || '');
  };

  React.useEffect(() => {
    if (otp_login?.user?.id) {
      Toast.show('Your otp have been verified.', {
        type: 'success',
      });
      navigation.navigate(RouteKeys.HOMESCREEN);
      return;
    }
    if (otp_login?.error) {
      Toast.show('You have entered wrong otp.', {
        type: 'error',
      });
      return;
    }
  }, [otp_login]);

  return (
    <GradientTemplate>
      {loading.send_otp || loading?.otp_login ? (
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
              text={`OTP Authentication`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={`Enter the 6-digit code sent to your phone number +91${phoneNumber}`}
              preset="medium"
              style={{textAlign: 'center', marginTop: mScale.sm}}
            />
          </View>
          <TextInputBox
            otp={send_otp?.otp ?? ''}
            onChange={handleValuesChange}
          />
          <View style={{marginTop: mScale.xxl2}}>
            <ButtonAtom
              title="Verify OTP"
              onPress={() => {
                if (textInputValues?.some(el => !el)) {
                  Toast.show('Please enter otp.', {
                    type: 'error',
                  });
                  return;
                }
                let otp = textInputValues?.join('');
                setFieldValueOTP(otpLoginField.otp.name, `${otp}` || '');
                handleSubmitOtp();
              }}
            />
            <ButtonAtom
              title="Canecl"
              preset="secondary"
              onPress={() => {
                navigation.goBack();
              }}
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
                linkColor={time ? colorPresets.GRAY : colorPresets.PRIMARY}
                loading={time ? true : false}
                onPress={() => {
                  setFieldValue(sendOtpField.phone.name, phoneNumber || '');
                  setTime(60);
                  handleSubmit();
                  Toast.show(send_otp?.status_message, {
                    type: send_otp?.status == 'success' ? 'success' : 'error',
                  });
                }}
              />
              <TextAtom
                text={time ? `${time} sec` : ''}
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
