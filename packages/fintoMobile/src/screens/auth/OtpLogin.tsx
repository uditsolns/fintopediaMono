import {Images} from '@shared/src/assets';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import {InputAtom} from '@src/components/Input/InputAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import * as React from 'react';
import {Platform, View} from 'react-native';
import {usePhoneVerifyHelper} from '@shared/src/components/structures/phone-verify/phone-verify.helper';
import {phoneVerifyField} from '@shared/src/components/structures/phone-verify/phoneVerifyModel';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {Toast} from 'react-native-toast-notifications';
import LoaderAtom from '@src/components/LoaderAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {OtplessHeadlessModule} from 'otpless-headless-rn';
import {OTPLESS_APP_ID} from '@shared/src/config/apiUrl';
import {useOtplessContext} from '@src/components/context/OtplessContextApi';
export const headlessModule = new OtplessHeadlessModule();
let OTTPLESS = 'LKAP46LV49BNQYBVIGTE';

interface OtpLoginProps extends NavType<'OtpLogin'> {}

export const OtpLogin: React.FC<OtpLoginProps> = ({navigation}) => {
  const {verify_mobile, loading, err} = useAppSelector(state => state.auth);
  const {phoneVerifyFormik, phoneVerifyInputProps} = usePhoneVerifyHelper();
  const {handleSubmit} = phoneVerifyFormik;
  const {setOtp, setPhoneNumber} = useOtplessContext();
  React.useEffect(() => {
    if (verify_mobile) {
      if (verify_mobile?.message) {
        startPhoneAuth(phoneVerifyFormik.values?.phone, '+91').then(() => {
          Toast.show('OTP has been sent to the registered mobile number.', {
            type: 'success',
          });
          navigation.navigate(RouteKeys.OTPSCREEN);
        });
      } else {
        Toast.show(verify_mobile?.error, {
          type: 'error',
        });
      }
    }
  }, [verify_mobile]);

  React.useEffect(() => {
    headlessModule.initialize(OTTPLESS);
    headlessModule.setResponseCallback(onHeadlessResult);
    return () => {
      headlessModule.clearListener();
      headlessModule.cleanup();
    };
  }, []);

  const onHeadlessResult = (result: any) => {
    const responseType = result?.responseType || '';
    switch (responseType) {
      case 'SDK_READY': {
        console.log('SDK is ready');
        break;
      }
      case 'FAILED': {
        console.log('SDK initialization failed');
        break;
      }
      case 'INITIATE': {
        if (result?.statusCode == 200) {
          console.log('Headless authentication initiated');
          const authType = result.response.authType;
          if (authType === 'OTP') {
            setOtp(result?.response?.otp);
          } else if (authType === 'SILENT_AUTH') {
            console.log('SILENT_AUTH',result?.response?.otp)
          }
        } else {
          handleVerifyError(result?.response);
        }
        break;
      }
      case 'OTP_AUTO_READ': {
        if (Platform.OS === 'android') {
          const otp = result.response.otp;
          setOtp(otp);
          console.log(`OTP Received: ${otp}`);
        }
        break;
      }
      case 'VERIFY': {        
        if (result.response.authType == 'SILENT_AUTH') {
          if (result.statusCode == 9106) {
            mobileNumberVerified();
            console.log('verified id');
            // Silent Authentication and all fallback authentication methods in SmartAuth have failed.
            //  The transaction cannot proceed further.
            // Handle the scenario to gracefully exit the authentication flow
          } else {
            mobileNumberVerified();
            console.log('verified id2');
            // Silent Authentication failed.
            // If SmartAuth is enabled, the INITIATE response
            // will include the next available authentication method configured in the dashboard.
          }
        } else {
          handleVerifyError();
        }

        break;
      }
      case 'DELIVERY_STATUS': {
        const authType = result?.response?.authType;
        const deliveryChannel = result.response.deliveryChannel;
        console.log(authType)
      }

      case 'ONETAP': {
        const token = result?.response?.token;
        if (token != null) {
          console.log(`OneTap Data: ${token}`);
        }
        break;
      }
      case 'FALLBACK_TRIGGERED': {
        break;
      }
      default: {
        console.log(`Unknown response type: ${responseType}`,JSON.stringify(result));
        handleVerifyError(result?.response)
        break;
      }
    }
  };
  const startPhoneAuth = async (phoneNumber: string, countryCode: string) => {
    const request = {
      phone: phoneNumber,
      countryCode: countryCode,
    };
    headlessModule.start(request);
  };

  const mobileNumberVerified = () => {
    console.log("mobileNumberVerified")
  }

  const handleVerifyError = (response: any) => {
    const errorCode = response?.errorCode as string;
    const errorMessage = response?.errorMessage as string;
    console.log(errorCode,errorMessage)

    if (!errorCode) {
      console.log('OTPless Error: Unknown error -', errorMessage);
      return;
    }

    switch (errorCode) {
      case '7112':
        console.log('OTPless Error: Empty OTP -', errorMessage);
        break;
      case '7115':
        console.log('OTPless Error: OTP is already verified -', errorMessage);
        break;
      case '7118':
        console.log('OTPless Error: Incorrect OTP -', errorMessage);
        break;
      case '7303':
        console.log('OTPless Error: OTP expired -', errorMessage);
        break;
      case '4000':
        console.log('OTPless Error: Invalid request -', errorMessage);
        break;
      case '9100':
        console.log(
          'OTPless Error: Network error (Socket timeout) -',
          errorMessage,
        );
        break;
      case '9104':
        console.log(
          'OTPless Error: Network error (IO Exception) -',
          errorMessage,
        );
        break;
      case '9103':
        console.log(
          'OTPless Error: Network error (Unknown Host) -',
          errorMessage,
        );
        break;
      default:
        console.log('OTPless Error: Unknown error -', errorMessage);
    }
  };

  return (
    <GradientTemplate>
      {loading.verify_mobile ? (
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
              {...phoneVerifyInputProps(phoneVerifyField.phone.name)}
              label={phoneVerifyField.phone.label}
              placeholder={phoneVerifyField.phone.placeHolder}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
          <ButtonAtom
            title="Send OTP"
            onPress={() => {
              setPhoneNumber(phoneVerifyFormik.values?.phone);
              handleSubmit();
            }}
            loading={loading?.forgot}
          />
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
