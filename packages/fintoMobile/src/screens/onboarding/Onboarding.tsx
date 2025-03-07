import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import {commonStyle} from '@shared/src/commonStyle/index';
import {colorPresets} from '@shared/src/theme/color';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {LinkButton} from '@src/components/Button/LinkButton';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {NavType} from '@src/navigation/types';

interface OnboardingProps extends NavType<'Onboarding'> {}

interface OnboardingData {
  title: string;
  description: string;
  image: number | string;
}

const data: OnboardingData[] = [
  {
    title: 'Welcome to Fintopedia',
    description:
      'Unlock the secrets of finance, investing, and trading with our expert-led courses. From beginners to pros, we’ve got you covered.',
    image: require('@shared/src/assets/img/piggy1.png'),
  },
  {
    title: 'Learn at Your Own Pace',
    description:
      'Whether you have 5 minutes or 5 hours, our flexible learning modules fit your schedule. Track your progress and stay motivated.',
    image: require('@shared/src/assets/img/piggy2.png'),
  },
  {
    title: 'Build Real-World Skills',
    description:
      'Gain practical experience through interactive projects and real-world scenarios. Enhance your profile and become a finance expert.',
    image: require('@shared/src/assets/img/piggy3.png'),
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({navigation}) => {
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
      <View style={styles.flex}>
        {currentIndex === data.length - 1 ? null : (
          <LinkButton
            text="Skip"
            style={[commonStyle.flexEnd, {padding: mScale.base}]}
            onPress={handleSkip}
          />
        )}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          ref={scrollViewRef}
          style={styles.flex}
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          {data?.map((item, index) => (
            <View style={styles.slide} key={index}>
              <ImageAtom sourceRequire={item.image} imageStyle={styles.image} />
              <View style={styles.textContainer}>
                <TextAtom
                  text={item.title}
                  preset="banner"
                  style={styles.titleText as TextStyle}
                />
                <TextAtom
                  text={item.description}
                  preset="medium"
                  style={styles.descriptionText as TextStyle}
                />
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonsWrapper}>
          <View style={styles.pagination}>
            {data?.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {backgroundColor: index === currentIndex ? '#fff' : '#888'},
                ]}
              />
            ))}
          </View>
          <View style={styles.buttonsContainer}>
            {currentIndex < data?.length - 1 ? (
              <ButtonAtom title="Next" onPress={handleNext} />
            ) : (
              <View style={styles.finalButtons}>
                <ButtonAtom
                  title="Login"
                  onPress={() => navigation.navigate(RouteKeys.LOGINSCREEN)}
                />
                <ButtonAtom
                  preset="tertiary"
                  title="Sign Up"
                  onPress={() => navigation.navigate(RouteKeys.SIGNUPSCREEN)}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    // padding:mScale.md3
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
    alignSelf: 'center',
    width: WINDOW_WIDTH * 0.93,
    justifyContent:'center',
    alignItems:"center"
  },
  titleText: {
    textAlign: 'center',
    width: WINDOW_WIDTH * 0.93,
  },
  descriptionText: {
    textAlign: 'center',
    marginTop: mScale.base,
    color: '#D5D5D9',
    width: WINDOW_WIDTH * 0.93,
    paddingHorizontal:mScale.sm,
    flexGrow:1,
    flex:1
  },
  buttonsWrapper: {
    rowGap: mScale.lg,
    paddingHorizontal: mScale.sm,
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
});
