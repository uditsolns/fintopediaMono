import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';
import {View} from 'react-native';
import {commonStyle} from '@shared/src/commonStyle';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import {Images} from '@shared/src/assets';
import {colorPresets} from '@shared/src/theme/color';
import {InputAtom} from '@src/components/Input/InputAtom';
import {mScale} from '@shared/src/theme/metrics';
import {LinkButton} from '@src/components/Button/LinkButton';
import FollowUsMolecule from '@src/components/molecules/FollowUsMolecule/FollowUsMolecule';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import Dropdown from '@src/components/Dropdown/Dropdown';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {NavType} from '@src/navigation/types';

interface SignupProps extends NavType<'Singup'> {}
interface Category {
  id: number;
  name: string;
}

export const CategoriesArr: Category[] = [
  {
    id: 1,
    name: 'Investment strategy',
  },
  {
    id: 2,
    name: 'Finance',
  },
  {
    id: 3,
    name: 'Mutual funds',
  },
  {
    id: 4,
    name: 'Stock trading',
  },
  {
    id: 5,
    name: 'Investment',
  },
  {
    id: 6,
    name: 'Money Market',
  },
];

export const Signup: React.FC<SignupProps> = ({navigation}) => {
  return (
    <GradientTemplate>
      <HeaderLeftMolecule text="Create account" />
      <ScrollViewAtom>
        <View style={{marginTop: mScale.base}}>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              label="Name"
              placeholder="Enter your name"
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              label="Surname"
              placeholder="Enter your surname"
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
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              label="Phone number"
              placeholder="Enter your phone number"
              keyboardType="numeric"
            />
          </View>
          <View>
            <Dropdown
              dropdownItemArr={CategoriesArr}
              itemLabelField="name"
              onSelect={item => {
                console.log(item);
              }}
              dropdownTitle="College/University"
              placeholder={'Select category'}
              dropdownBg="#121622"
              dropdownTextColor={colorPresets.CTA}
              textColor={colorPresets.CTA}
            />
          </View>
          <View style={{marginBottom: mScale.lg}}>
            <InputAtom
              shape="square"
              label="Password"
              placeholder="Enter your password"
              rightIcon={<Images.SVG.Eye width={20} color={colorPresets.CTA} />}
              autoCapitalize="none"
            />
          </View>
          <View>
            <InputAtom
              shape="square"
              label="Confirm Password"
              placeholder="Enter your confirm password"
              rightIcon={<Images.SVG.Eye width={20} color={colorPresets.CTA} />}
              autoCapitalize="none"
            />
          </View>
          <View style={[commonStyle.flexStart, {marginTop: mScale.base}]}>
            <TextAtom text={`Already have an account ? `} preset="medium" />
            <LinkButton
              text="Login"
              onPress={() => {
                navigation.navigate(RouteKeys.LOGINSCREEN);
              }}
            />
          </View>
          <View style={{marginTop: mScale.base}}>
            <ButtonAtom title="Register" />
          </View>
          <View style={{marginVertical: mScale.md, alignSelf: 'center'}}>
            <TextAtom text={'or'} preset="medium" />
          </View>
          <ButtonAtom title="Continue as guest" preset="secondary" />

          <View style={{marginVertical: mScale.lg}}>
            <FollowUsMolecule />
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
