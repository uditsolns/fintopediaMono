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
import {OTPLESS_APP_ID} from '@shared/src/config/apiUrl';
import {useOtplessContext} from '@src/components/context/OtplessContextApi';

interface OtpLoginProps extends NavType<'OtpLogin'> {}

export const OtpLogin: React.FC<OtpLoginProps> = ({navigation}) => {
  const {verify_mobile, loading, err} = useAppSelector(state => state.auth);
  const {phoneVerifyFormik, phoneVerifyInputProps} = usePhoneVerifyHelper();
  const {handleSubmit} = phoneVerifyFormik;
  const {setOtp, setPhoneNumber} = useOtplessContext();
  console.log(verify_mobile);
  React.useEffect(() => {
    if (verify_mobile) {
      if (verify_mobile?.message) {
      } else {
        Toast.show(verify_mobile?.error, {
          type: 'error',
        });
      }
    }
  }, [verify_mobile]);

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
