import {useNavigation} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import { ButtonAtom } from '@shared/src/components/atoms/Button/ButtonAtom';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import {InputAtom} from '@src/components/Input/InputAtom';
import TextInputBox from '@src/components/Input/TextInputBox';
import {RouteKeys} from '@src/navigation/RouteKeys';
import * as React from 'react';
import {View} from 'react-native';

interface OTPProps {}

export const OTP: React.FC<OTPProps> = ({}) => {
  const navigation = useNavigation();
  return (
    <GradientTemplate>
      <HeaderLeftMolecule />

      <ScrollViewAtom>
        <View>
          <View style={{marginVertical: mScale.base, padding: mScale.md}}>
            <View style={{alignSelf: 'center'}}>
              <Images.SVG.EmailVerifyIcon />
              {/* <ImageAtom sourceRequire={require('@shared/src/assets/img/lockIcon.png')} /> */}
            </View>
            <TextAtom
              text={`Verify your email address`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={`We have sent the code to your email.\n Please enter it here.`}
              preset="medium"
              style={{textAlign: 'center', marginTop: mScale.sm}}
            />
          </View>
          <TextInputBox />
          <View style={{marginTop: mScale.base}}>
          <ButtonAtom title="Send link" />
          </View>
          <View style={[{marginTop: mScale.base, alignSelf: 'center'}]}>
            <TextAtom
              text={`Didn’t get email? Kindly check spam box too `}
              preset="medium"
              style={{textAlign: 'center'}}
            />
            <View style={[commonStyle.flexCenter, {marginVertical: mScale.md}]}>
              <LinkButton
                text="Send it again?"
                style={{marginVertical: mScale.md}}
                onPress={() => {navigation.navigate(RouteKeys.TWOFACTORAUTHSCREEN)}}
              />
              <TextAtom
                text={'30 sec'}
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
