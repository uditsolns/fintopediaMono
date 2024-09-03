import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';

interface OnboardingProps {}

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
      <TextAtom text="Onboarding" />
      <InputAtom shape="square" label="Name" placeholder="Your full name" />
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  slide: {
    flex: 1,
    width: WINDOW_WIDTH * 0.93,
    alignItems: 'center',
    marginTop: moderateScale(75),
  },
  image: {
    width: moderateScale(279),
    height: moderateScale(279),
    marginBottom: mScale.lg2,
  },
  textContainer: {
    paddingHorizontal: mScale.md,
  },
  titleText: {
    textAlign: 'center',
  },
  descriptionText: {
    textAlign: 'center',
    marginTop: mScale.base,
  },
  skipText: {
    textDecorationLine: 'underline',
  },
  buttonsWrapper: {
    rowGap: mScale.lg,
    paddingHorizontal: mScale.base,
    marginBottom: mScale.base,
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    height: mScale.md,
    width: mScale.md,
    borderRadius: mScale.xs,
    marginHorizontal: mScale.xs,
  },
  buttonsContainer: {
    marginBottom: mScale.lg,
  },
  finalButtons: {
    rowGap: mScale.lg,
  },
  signUpButton: {
    borderWidth: 0.5,
    borderColor: colorPresets.GRAY,
  },
});
