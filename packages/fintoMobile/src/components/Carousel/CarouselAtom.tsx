import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {imageUrl} from '@shared/src/config/imageUrl';
import {colorPresets} from '@shared/src/theme/color';
import {mScale, WINDOW_HEIGHT, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import {BannerResponse} from '@shared/src/utils/types/banner';
import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface CarouselAtomProps {
  data: BannerResponse[];
}

export default function CarouselAtom({data}: CarouselAtomProps) {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const renderCarousel = ({item}: {item: BannerResponse}) => {
    return (
      <Pressable style={styles.pressable}>
        <ImageBackground
          style={styles.imageBackground}
          source={
            item?.name
              ? {uri: `${imageUrl}/Banners/${item.name}`}
              : require('@shared/src/assets/img/carousel1.png')
          }
          resizeMode="stretch"
          blurRadius={0}>
          <View style={styles.offerBanner}>
            {/* <TextAtom text="Limited Time Offer" preset="xSmall" /> */}
          </View>
          <View style={styles.textContainer}>
            {/* <TextAtom text="Upto 50% Off" preset="heading1" /> */}
            {/* <TextAtom
              text="on all trading & finance courses."
              preset="xSmall"
              numberOfLines={2}
            /> */}
            {/* <TextAtom
              text="Explore now"
              preset="titleBold"
              style={[styles.exploreText, {color: colorPresets.PRIMARY}]}
            /> */}
          </View>
        </ImageBackground>
      </Pressable>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {data?.map((_, index) => {
          const isActive = activeSlide === index;
          const dotSize = isActive ? mScale.sm : mScale.sm;
          const dotColor = isActive ? colorPresets.PRIMARY : colorPresets.CTA;
          return (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={{flex: 1, alignSelf: 'center', marginBottom: mScale.lg2}}>
      <Carousel
        // mode="parallax"
        enabled={true}
        data={data}
        width={WINDOW_WIDTH * 0.92}
        height={WINDOW_HEIGHT * 0.22}
        renderItem={renderCarousel}
        onSnapToItem={(index: number) => setActiveSlide(index)}
        panGestureHandlerProps={{activeOffsetX: [-10, 10]}}
        pagingEnabled={false}
        loop={true}
        autoPlay={true}
        scrollAnimationDuration={1000}
      />
      <Pagination />
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
    alignSelf: 'center',
  } as ViewStyle,
  imageBackground: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.21,
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
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:mScale.base
  } as ViewStyle,
  paginationDot: {
    borderRadius: 25,
    marginHorizontal: 3,
  } as ViewStyle,
});
