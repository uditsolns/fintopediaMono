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

interface OTPProps extends NavType<'OTP'> {}

export const OTP: React.FC<OTPProps> = ({navigation}) => {
  const {otp, phoneNumber} = useOtplessContext();
  const [textInputValues, setTextInputValues] = React.useState('');
  const [time, setTime] = React.useState<number>(60);

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

  return (
    <GradientTemplate>
      <ScrollViewAtom contentContainerStyle={{marginTop: mScale.xxl1}}>
        <View>
          <View style={{marginVertical: mScale.base, padding: mScale.md}}>
            <View style={{alignSelf: 'center'}}>
              <Images.SVG.TwoFAuthIcon />
            </View>
            <TextAtom
              text={`Two-Factor Authentication`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={`Enter the 6-digit code sent to your phone number +91${phoneNumber}`}
              preset="medium"
              style={{textAlign: 'center', marginTop: mScale.sm}}
            />
          </View>
          <TextInputBox otp={otp ?? ''} onChange={handleValuesChange} />
          <View style={{marginTop: mScale.xxl2}}>
            <ButtonAtom title="Verify" onPress={() => {}} />
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
                onPress={() => {
                  if (!time) {
                    console.log('resed');
                    Toast.show(
                      'OTP has been sent to the registered mobile number.',
                      {
                        type: 'success',
                      },
                    );
                  }
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
