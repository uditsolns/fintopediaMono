import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';

interface OnboardingProps {}

export const Onboarding: React.FC<OnboardingProps> = ({}) => {
  return (
    <GradientTemplate>
      <TextAtom text="Onboarding" />
      <InputAtom shape="square" label="Name" placeholder="Your full name" />
    </GradientTemplate>
  );
};
