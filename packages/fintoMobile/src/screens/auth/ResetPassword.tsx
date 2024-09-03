import {useNavigation} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import {InputAtom} from '@src/components/Input/InputAtom';
import * as React from 'react';
import {Text, View} from 'react-native';

interface ResetPasswordProps {}

export const ResetPassword: React.FC<ResetPasswordProps> = ({}) => {
  const navigation = useNavigation();
  return (
    <GradientTemplate>
      <HeaderLeftMolecule />

      <ScrollViewAtom>
        <View>
          <View style={{marginVertical: mScale.base, padding: mScale.md}}>
            <View style={{alignSelf: 'center'}}>
              <Images.SVG.ForgotIcon />
              {/* <ImageAtom sourceRequire={require('@shared/src/assets/img/lockIcon.png')} /> */}
            </View>
            <TextAtom
              text={`Reset Password?`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={`Enter your new password. The password should contain 8 characters`}
              preset="medium"
              style={{textAlign: 'center'}}
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              label="New Password"
              placeholder="Enter your new password"
              rightIcon={<Images.SVG.Eye width={20} color={colorPresets.CTA} />}
              autoCapitalize="none"
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              label="Confirm Password"
              placeholder="Enter your confirm password"
              rightIcon={<Images.SVG.Eye width={20} color={colorPresets.CTA} />}
              autoCapitalize="none"
            />
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
