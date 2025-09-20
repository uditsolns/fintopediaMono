import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import LoaderAtom from '@src/components/LoaderAtom';
import React from 'react';
import {Text, View} from 'react-native';

interface ChangePasswordProps {}

export const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const [oldPassword, setOldPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  return (
    <GradientTemplate style={{paddingBottom: 0, paddingTop: moderateScale(70)}}>
      {false ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <ScrollViewAtom>
        <View style={{marginBottom: mScale.lg}}>
          <InputAtom
            shape="square"
            label="Old Password"
            placeholder="Enter your old password"
            rightIcon={<Images.SVG.Eye width={20} color={colorPresets.CTA} />}
            autoCapitalize="none"
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
            label="Confirm New Password"
            placeholder="Enter your confirm new password"
            rightIcon={<Images.SVG.Eye width={20} color={colorPresets.CTA} />}
            autoCapitalize="none"
          />
        </View>

        <View style={{marginTop: mScale.xxl}}>
          <ButtonAtom
            title={'Change Password'}
            preset={'primary'}
            textPreset={'titleBold'}
          />
          <ButtonAtom
            title="Cancel"
            preset={'tertiary'}
            textPreset={'titleBold'}
          />
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
