import {NavigationProp, useNavigation} from '@react-navigation/native';
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
import {RouteKeys} from '@src/navigation/RouteKeys';
import * as React from 'react';
import {Text, View} from 'react-native';

interface ForgotPasswordProps {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const navigation = useNavigation();
  return (
    <GradientTemplate>
      <HeaderLeftMolecule />

      <ScrollViewAtom>
        <View>
          <View style={{marginVertical: mScale.base, padding: mScale.md}}>
            <View style={{alignSelf: 'center'}}>
              <Images.SVG.ForgotIcon />
            </View>
            <TextAtom
              text={`Forgot Password?`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={`Enter your email address and we’ll send you the reset password link`}
              preset="medium"
              style={{textAlign: 'center'}}
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              label="Email"
              placeholder="Enter your email id"
              autoCapitalize="none"
            />
          </View>
          <View style={[{marginTop: mScale.base, alignSelf: 'center'}]}>
            <TextAtom
              text={`Didn’t get email? Kindly check spam box too `}
              preset="medium"
              style={{textAlign: 'center'}}
            />
            <LinkButton
              text="Send it again?"
              style={{marginVertical: mScale.md, alignSelf: 'center'}}
              onPress={() => {
                navigation.navigate(RouteKeys.RESETPASSWORDSCREEN);
              }}
            />
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
