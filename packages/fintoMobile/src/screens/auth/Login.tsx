import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';
import HeaderLeftMolecule from '@shared/src/components/molecules/Header/HeaderLeftMolecule';
import {View} from 'react-native';
import {commonStyle} from '@shared/src/commonStyle';

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <GradientTemplate>
        <HeaderLeftMolecule text="Welcome back"  />
      
      {/* <ScrollViewAtom></ScrollViewAtom> */}
    </GradientTemplate>
  );
};
