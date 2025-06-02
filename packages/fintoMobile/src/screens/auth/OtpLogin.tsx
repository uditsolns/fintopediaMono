import {Images} from '@shared/src/assets';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {mScale} from '@shared/src/theme/metrics';
import {InputAtom} from '@src/components/Input/InputAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import * as React from 'react';
import {Platform, View} from 'react-native';
import {useSendOtpHelper} from '@shared/src/components/structures/send-otp-login/send-otp.helper';
import {sendOtpField} from '@shared/src/components/structures/send-otp-login/sendOtpModal';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {Toast} from 'react-native-toast-notifications';
import LoaderAtom from '@src/components/LoaderAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {OTPLESS_APP_ID} from '@shared/src/config/apiUrl';
import {useOtplessContext} from '@src/components/context/OtplessContextApi';

interface OtpLoginProps extends NavType<'OtpLogin'> {}

export const OtpLogin: React.FC<OtpLoginProps> = ({navigation}) => {
  const {send_otp, loading, err} = useAppSelector(state => state.auth);
  const {sendOtpFormik, sendOtpInputProps} = useSendOtpHelper();
  const {handleSubmit, isSubmitting} = sendOtpFormik;
  const {setPhoneNumber} = useOtplessContext();

  React.useEffect(() => {
    if (send_otp) {
      Toast.show(send_otp?.status_message, {
        type: send_otp?.status == 'success' ? 'success' : 'error',
      });
      if (send_otp?.code === 200 && send_otp?.status === 'success') {
        setPhoneNumber(send_otp?.phone);
        navigation.navigate(RouteKeys.OTPSCREEN);
      }
    }
  }, [send_otp]); 

  return (
    <GradientTemplate>
      {loading.send_otp ? (
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
              text={`Registered Phone Number`}
              preset="heading1"
              style={{textAlign: 'center', marginTop: mScale.base}}
            />
            <TextAtom
              text={`Enter your registered phone nummber and we’ll send the OTP on this number`}
              preset="medium"
              style={{textAlign: 'center', marginTop: mScale.md}}
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              {...sendOtpInputProps(sendOtpField.phone.name)}
              label={sendOtpField.phone.label}
              placeholder={sendOtpField.phone.placeHolder}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
          <ButtonAtom
            title="Send OTP"
            onPress={() => {
              setPhoneNumber(sendOtpFormik.values?.phone);
              handleSubmit();
            }}
            loading={loading?.send_otp ? true : false}
          />
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
