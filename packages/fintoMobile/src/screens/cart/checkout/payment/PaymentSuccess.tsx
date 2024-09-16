import {useNavigation} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {fontPresets} from '@shared/src/theme/typography';
import ProgressBar from '@src/components/ProgressBar';
import React from 'react';
import {Text, TextStyle, TouchableOpacity, View} from 'react-native';

interface PaymentSuccessProps {}

export const PaymentSuccess: React.FunctionComponent<
  PaymentSuccessProps
> = () => {
  const navigation = useNavigation();
  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
      }}>
      <ScrollViewAtom>
        <View style={{paddingHorizontal: mScale.base}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Images.SVG.SuccessIcon />
            <TextAtom
              text={
                'Thank you for enrolling in the Comprehensive Finance Course!'
              }
              preset="heading2"
              style={
                {marginVertical: mScale.base, textAlign: 'center'} as TextStyle
              }
            />
            <TextAtom
              text={
                'We look forward to helping you achieve your financial goals!'
              }
              preset="medium"
              style={
                {
                  marginBottom: mScale.md,
                  textAlign: 'center',
                  fontWeight: '400',
                } as TextStyle
              }
            />
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
            <TextAtom
              text={'Comprehensive Finance Masterclass'}
              preset="heading4"
            />
            <TextAtom
              text={
                'This course provides an introduction to the principles of finance and their application in the business world.'
              }
              preset="medium"
              style={{color: colorPresets.GRAY}}
            />
            <ProgressBar hours={'20'} level="intermediate" />
            <View
              style={[
                commonStyle.flexSpaceBetween,
                {marginVertical: mScale.base},
              ]}>
              <TextAtom text={'₹ 2,999'} preset="heading3" />
              {/* <ButtonIconLeftAtom
                iconName={'arrow-forward'}
                iconColor={colorPresets.BLACK}
                btnTitle={'Start this course now'}
                color={colorPresets.BLACK}
                preset={'titleBold'}
              /> */}
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
            <View>
              <TextAtom
                text={'Invoice Number: INV-20240628-001'}
                preset="medium"
                style={{marginBottom: mScale.md}}
              />
              <View
                style={[
                  commonStyle.flexSpaceBetween,
                  {flex: 1, alignItems: 'flex-start', marginBottom: mScale.md},
                ]}>
                <TextAtom
                  text={'Comprehensive Finance Course - Masterclass'}
                  preset="heading4"
                  style={{width: moderateScale(200)}}
                />
                <TextAtom text={'₹ 2,999'} preset="heading4" />
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#282A37',
                marginVertical: mScale.lg,
              }}
            />
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom text={'Subtotal'} preset="body" />
              <TextAtom text={'₹ 6,000'} preset="heading4" />
            </View>
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom
                text={'Discount'}
                preset="body"
                style={{color: '#B5B5B5'}}
              />
              <TextAtom
                text={'-₹ 1,000'}
                preset="heading4"
                style={{color: colorPresets.PRIMARY}}
              />
            </View>
            <View style={[commonStyle.flexSpaceBetween, {}]}>
              <TextAtom text={'GST'} preset="body" style={{color: '#B5B5B5'}} />
              <TextAtom
                text={'+ ₹ 100'}
                preset="body"
                style={{color: '#B5B5B5'}}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#282A37',
                marginVertical: mScale.lg,
              }}
            />
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom text={'Grand Total'} preset="heading3" />
              <TextAtom text={'₹ 6,000'} preset="heading3" />
            </View>
            <TouchableOpacity
              style={[commonStyle.flexEnd, {marginTop: mScale.base}]}>
              {/* <IconButtonAtom2 iconName={'download-outline'} size={25} /> */}
              <Images.SVG.DownloadIcon />
              <TextAtom
                text={'Download invoice'}
                preset="heading4"
                style={{
                  marginStart: mScale.md,
                  textDecorationLine: 'underline',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={[{paddingVertical: mScale.base}]}>
            <Text style={{...fontPresets.title, color: colorPresets.CTA}}>
              If you have any questions regarding this invoice, please contact
              us at{' '}
              <Text style={{color: colorPresets.PRIMARY}}>
                support@fintopedia.com
              </Text>{' '}
              or call{' '}
              <Text style={{color: colorPresets.PRIMARY}}>(123) 456-7890</Text>.
            </Text>
          </View>
        </View>
      </ScrollViewAtom>
      <View
        style={{
          paddingHorizontal: mScale.base,
          paddingVertical: mScale.lg,
          borderTopWidth: 0.5,
          borderColor: colorPresets.GRAY3,
        }}>
        {/* <SmallButtonAtom
          btnColor={'transparent'}
          btnTitle={'Back to home'}
          preset={'mediumBold'}
          color={colorPresets.WHITE}
          style={{
            borderWidth: 1,
            borderColor: colorPresets.BORDERCOLOR,
            borderRadius: 6,
          }}
          onPress={() => {
            navigation.navigate(RouteKeys.HOME);
          }}
        /> */}
      </View>
    </GradientTemplate>
  );
};
