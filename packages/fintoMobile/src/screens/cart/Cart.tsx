import React from 'react';
import {FlatList, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {mScale} from '@shared/src/theme/metrics';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {colorPresets} from '@shared/src/theme/color';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import ImageAtom from '@src/components/Image/ImageAtom';
import CartMolecule from '@src/components/molecules/CartMolecule/CartMolecule';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import {Images} from '@shared/src/assets';
import {RouteKeys} from '@src/navigation/RouteKeys';

interface CartProps {}

export const Cart: React.FC<CartProps> = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return <CartMolecule item={item} />;
  };

  const innerCategoriesRenderItem = ({item}) => {
    return <PopularCourseMolecule item={item} />;
  };
  return (
    <GradientTemplate style={{paddingBottom: 0, paddingHorizontal: 0}}>
      <View style={[{paddingHorizontal: mScale.base}]}>
        <HeaderLeftMolecule text={'My Cart'} />
      </View>
      <ScrollViewAtom nestedScrollEnabled={true}>
        <View style={{paddingHorizontal: mScale.base}}>
          <FlatList
            data={[...Array(5)]}
            renderItem={renderItem}
            contentContainerStyle={{
              rowGap: mScale.base,
              paddingBottom: mScale.lg,
            }}
            nestedScrollEnabled={true}
          />
          <View>
            <TextAtom
              text={'You have 2 items in your cart'}
              preset="body"
              style={{marginBottom: mScale.md}}
            />
            <View
              style={[
                commonStyle.flexSpaceBetween,
                {
                  padding: mScale.base,
                  borderWidth: 1,
                  borderColor: colorPresets.GRAY3,
                  borderRadius: 12,
                  backgroundColor: '#121622',
                },
              ]}>
              <View style={[commonStyle.flexStart]}>
                <Images.SVG.DiscountIcon />
                <TextAtom
                  text={'Coupons and Bank offers'}
                  preset="body"
                  style={{marginStart: mScale.base}}
                />
              </View>
              <Pressable
                onPress={() => {
                  navigation.navigate(RouteKeys.COUPONSCREEN);
                }}>
                <Images.SVG.ChevronRight />
              </Pressable>
            </View>
          </View>
          <View
            style={[
              {
                padding: mScale.lg,
                borderWidth: 1,
                borderColor: colorPresets.GRAY3,
                borderRadius: 12,
                backgroundColor: '#121622',
                marginVertical: mScale.base,
              },
            ]}>
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom text={'Subtotal'} preset="large" />
              <TextAtom text={'₹ 6,000'} preset="heading3" />
            </View>
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom text={'Discount'} preset="body" color={'#B5B5B5'} />
              <TextAtom
                text={'-₹ 1,000'}
                preset="heading4"
                color={colorPresets.PRIMARY}
              />
            </View>
            <View style={[commonStyle.flexSpaceBetween, {}]}>
              <TextAtom text={'GST'} preset="body" color={'#B5B5B5'} />
              <TextAtom text={'+ ₹ 100'} preset="body" color={'#B5B5B5'} />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dotted',
                borderColor: '#282A37',
                marginVertical: mScale.lg,
              }}
            />
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom text={'You pay'} preset="heading3" />
              <TextAtom text={'₹ 6,000'} preset="heading3" />
            </View>
          </View>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={[...Array(5)]}
              renderItem={innerCategoriesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                // flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Your might also like" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={[...Array(5)]}
              renderItem={innerCategoriesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollViewAtom>
      <View
        style={[
          commonStyle.flexStart,
          {
            backgroundColor: '#222431',
            padding: mScale.base,
            borderBottomWidth: 1,
            borderColor: colorPresets.GRAY3,
          },
        ]}>
        <ImageAtom
          sourceRequire={require('@shared/src/assets/img/congrats.png')}
        />
        <View style={[commonStyle.flexStart, {marginStart: mScale.md}]}>
          <TextAtom
            text={'Wohoo! You’re saving'}
            preset="titleBold"
            style={{marginRight: mScale.sm}}
          />
          <TextAtom
            text={'₹ 1,000'}
            preset="titleBold"
            style={{marginRight: mScale.sm}}
            color={colorPresets.SECONDARY}
          />
          <TextAtom text={'on this order'} preset="titleBold" />
        </View>
      </View>
      <View
        style={[
          commonStyle.flexSpaceBetween,
          {paddingHorizontal: mScale.base, paddingVertical: mScale.lg},
        ]}>
        <View>
          <TextAtom
            text={'Grand total'}
            preset="medium"
            color={'#B5B5B5'}
            style={{marginBottom: mScale.xxs}}
          />
          <TextAtom text={'₹ 7,000'} preset="heading3" />
        </View>
        <View>
          <Pressable
            style={{
              paddingHorizontal: mScale.lg,
              backgroundColor: colorPresets.CTA,
            }}
            onPress={() => {
              navigation.navigate(RouteKeys.CHECKOUTSCREEN);
            }}>
            <TextAtom
              text={'Proceed to checkout'}
              preset={'heading4'}
              color={'#0C0C0C'}
            />
          </Pressable>
        </View>
      </View>
    </GradientTemplate>
  );
};
