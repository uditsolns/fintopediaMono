import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {commonStyle} from '@shared/src/commonStyle';
import {Images} from '@shared/src/assets';
import {colorPresets} from '@shared/src/theme/color';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';

interface HeaderProps {
  text?: string;
  visible?: boolean;
  textVisible?: boolean;
  cartVisible?: boolean;
  ph?: number;
}

export default function Header({
  text,
  visible = true,
  textVisible = true,
  cartVisible = true,
  ph = mScale.base,
}: HeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {courseCart} = useAppSelector(state => state.courseCart);
  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        {
          gap: mScale.lg1,
          marginVertical: mScale.lg,
          paddingHorizontal: ph,
          backgroundColor: colorPresets.TRANSPARENT,
        },
      ]}>
      <View style={[commonStyle.flexStart, {gap: mScale.lg1, flex: 1}]}>
        {visible ? (
          <Pressable onPress={() => navigation.goBack()}>
            <Images.SVG.ChevronLeft width={24} />
          </Pressable>
        ) : null}
        {textVisible ? <TextAtom text={text} preset="heading3" /> : null}
      </View>
      <View style={[commonStyle.flexSpaceBetween]}>
        <Pressable
          style={{marginRight: mScale.sm}}
          onPress={() => {
            navigation.navigate(RouteKeys.SEARCHSCREEN);
          }}>
          <Images.SVG.Search2 width={24} />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate(RouteKeys.NOTIFICATIONSCREEN);
          }}>
          <Images.SVG.Bell width={24} />
        </Pressable>
        {cartVisible ? (
          <Pressable
            style={{marginStart: mScale.sm}}
            onPress={() => {
              navigation.navigate(RouteKeys.CARTSCREEN);
            }}>
            {courseCart?.length ? (
              <View
                style={{
                  backgroundColor: colorPresets.PRIMARY,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  minWidth: moderateScale(20),
                  height: moderateScale(20),
                  paddingHorizontal: 6,
                  zIndex: 1,
                  alignSelf: 'flex-start',
                }}>
                <TextAtom
                  text={`${courseCart?.length || ''}`}
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                  preset="xxSmallBold"
                />
              </View>
            ) : null}

            <Images.SVG.ShoppingCart width={24} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
