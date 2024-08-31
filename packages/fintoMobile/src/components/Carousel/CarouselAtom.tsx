import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { mScale, WINDOW_HEIGHT, WINDOW_WIDTH } from '@shared/src/theme/metrics';
import React, {useRef, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, View, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';


interface CarouselAtomProps {}

export default function CarouselAtom() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const carouselRef = useRef<Carousel<CarouselAtomProps>>(null);

  const renderCarousel = ({item}: {item: CarouselAtomProps}) => (
    <Pressable style={styles.pressable}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('@shared/src/assets/img/carousel1.png')}
        resizeMode="cover"
        blurRadius={0}>
        <View style={styles.offerBanner}>
          <TextAtom text="Limited Time Offer" preset="xSmall" />
        </View>
        <View style={styles.textContainer}>
          <TextAtom text="Upto 50% Off" preset="heading1" />
          <TextAtom
            text="on all trading & finance courses."
            preset="xSmall"
            numberOfLines={2}
          />
          <TextAtom
            text="Explore now"
            preset="titleBold"
            color={colorPresets.PRIMARY}
            style={styles.exploreText}
          />
        </View>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View style={{flex: 1}}>
      <Carousel
        ref={carouselRef}
        layout="default"
        data={[...Array(5)]}
        renderItem={renderCarousel}
        sliderWidth={WINDOW_WIDTH}
        itemWidth={WINDOW_WIDTH * 0.92}
        onSnapToItem={(index: number) => setActiveSlide(index)}
      />
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={5}
          activeDotIndex={activeSlide}
          containerStyle={styles.pagination}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.inactivePaginationDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderWidth: 1,
    borderColor: colorPresets.GRAY3,
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  } as ViewStyle,
  imageBackground: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.2,
  } as ImageStyle,
  offerBanner: {
    backgroundColor: colorPresets.TERTIARY,
    paddingHorizontal: mScale.md,
    paddingVertical: mScale.xs,
    alignSelf: 'flex-start',
  } as ViewStyle,
  textContainer: {
    marginStart: mScale.lg,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    marginTop: mScale.xl,
  } as ViewStyle,
  exploreText: {
    textDecorationLine: 'underline',
    marginTop: mScale.md,
  } as TextStyle,
  paginationContainer: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    bottom: mScale.md,
  } as ViewStyle,
  pagination: {} as ViewStyle,
  paginationDot: {
    width: mScale.md,
    height: mScale.md,
    borderRadius: mScale.md / 2,
    marginHorizontal: -mScale.md,
    backgroundColor: colorPresets.PRIMARY,
  } as ViewStyle,
  inactivePaginationDot: {
    backgroundColor: colorPresets.CTA,
  } as ViewStyle,
});
