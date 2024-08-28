import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import { WINDOW_WIDTH } from '@shared/src/theme/metrics';

interface OnboardingProps {
  title: string;
  description: string;
  image: string | null;
}

const data: OnboardingProps[] = [
  {
    title: 'Welcome to Fintopedia',
    description:
      'Unlock the secrets of finance, investing, and trading with our expert-led courses. From beginners to pros, we’ve got you covered.',
    image: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Learn at Your Own Pace',
    description:
      'Whether you have 5 minutes or 5 hours, our flexible learning modules fit your schedule. Track your progress and stay motivated.',
    image: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'Build Real-World Skills',
    description:
      'Gain practical experience through interactive projects and real-world scenarios. Enhance your profile and become a finance expert.',
    image: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({}) => {

  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / WINDOW_WIDTH);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: WINDOW_WIDTH * (currentIndex + 1),
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  return (
    <GradientTemplate>
      <TextAtom text='Hello' />
    </GradientTemplate>
  );
};
