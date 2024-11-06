import {useNavigation} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import {RouteKeys} from '@src/navigation/RouteKeys';
import { NavType } from '@src/navigation/types';
import * as React from 'react';
import {View} from 'react-native';

interface EmailVerificationProps extends NavType<'EmailVerification'> {}

export const EmailVerification: React.FC<EmailVerificationProps> = ({navigation}) => {
  return (
    <GradientTemplate>
      <ScrollViewAtom contentContainerStyle={{marginTop: mScale.xxl1}}>
        <View>
          <View style={{marginVertical: mScale.base, padding: mScale.md}}>
            <View style={{alignSelf: 'center'}}>
              <Images.SVG.EmailVerifyIcon />
            </View>
            <TextAtom
              text={`Verify your email address`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={`Please check your inbox and click the verification link to confirm your email address. This step helps us ensure the security of your account and allows you to access all our courses seamlessly.`}
              preset="medium"
              style={{textAlign: 'center'}}
            />
          </View>
          <View style={{marginTop: mScale.lg2}}>
            <ButtonAtom title="Verify now" />
          </View>
          <View
            style={[
              commonStyle.flexCenter,
              {marginTop: mScale.base, alignSelf: 'center'},
            ]}>
            <TextAtom
              text={`Didn’t get e-mail? `}
              preset="medium"
              style={{textAlign: 'center'}}
            />
            <LinkButton
              text="Send it again?"
              style={{marginVertical: mScale.md}}
              onPress={() => {
                navigation.navigate(RouteKeys.OTPSCREEN);
              }}
            />
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
