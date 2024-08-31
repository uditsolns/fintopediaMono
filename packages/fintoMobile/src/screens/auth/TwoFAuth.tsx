import {useNavigation} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
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

interface TwoFAuthProps {}

export const TwoFAuth: React.FC<TwoFAuthProps> = ({}) => {
  const navigation = useNavigation();
  return (
    <GradientTemplate>
      <HeaderLeftMolecule />

      <ScrollViewAtom>
        <View>
          <View style={{marginVertical: mScale.base, padding: mScale.md}}>
            <View style={{alignSelf: 'center'}}>
              <Images.SVG.TwoFAuthIcon />
              {/* <ImageAtom sourceRequire={require('@shared/src/assets/img/lockIcon.png')} /> */}
            </View>
            <TextAtom
              text={`Two-Factor Authentication`}
              preset="heading1"
              color={colorPresets.CTA}
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={`Enter the 6-digit code sent to your phone number +9180*****890`}
              preset="medium"
              style={{textAlign: 'center', marginTop: mScale.sm}}
            />
          </View>
          <TextInputBox />
          <View style={{marginTop: mScale.xxl2}}>
           
          </View>
          <View style={[commonStyle.flexCenter,{marginTop: mScale.base, alignSelf: 'center'}]}>
              <TextAtom
                text={`Didn’t get the code ?`}
                preset="medium"
                style={{textAlign: 'center'}}
              />
            <View style={[commonStyle.flexCenter, {marginStart: mScale.md}]}>
              <LinkButton
                text="Send it again?"
                style={{marginVertical: mScale.md}}
              />
              <TextAtom
                text={'30 sec'}
                preset="medium"
                style={{marginStart: mScale.md}}
                color={colorPresets.CTA}
              />
            </View>
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
