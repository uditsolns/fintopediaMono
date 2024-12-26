import {useFocusEffect} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {fontPresets} from '@shared/src/theme/typography';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {
  addTwoNumber,
  subtractTwoNumber,
  sumCalculate,
} from '@src/components/Calculate';
import LoaderAtom from '@src/components/LoaderAtom';
import ProgressBar from '@src/components/ProgressBar';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {
  Alert,
  BackHandler,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

interface PaymentSuccessProps extends NavType<'PaymentSuccess'> {}

export const PaymentSuccess: React.FunctionComponent<PaymentSuccessProps> = ({
  navigation,
}) => {
  const {singlePurchaseHistory, loading} = useAppSelector(
    state => state.purchaseHistory,
  );
  const [subtotal, setSubtotal] = React.useState<number>(0);
  const [totalDiscount, setTotalDiscount] = React.useState<number>(0);
  const [totalPay, setTotalPay] = React.useState<number>(0);
  const [gst, setGst] = React.useState<number>(0);
  const [actualPricetotal, setActualPricetotal] = React.useState<number>(0);

  React.useEffect(() => {
    if (singlePurchaseHistory?.courses?.length) {
      let sale_price = sumCalculate(
        singlePurchaseHistory?.courses,
        'sale_price',
      );
      let actual_price = sumCalculate(
        singlePurchaseHistory?.courses,
        'actual_price',
      );
      let totalDiscountAmount = subtractTwoNumber(sale_price, actual_price);
      let gstTotal = (sale_price * 18) / 100;
      let totalPayAmount = addTwoNumber(sale_price, gstTotal);
      setGst(gstTotal);
      setActualPricetotal(actual_price);
      setSubtotal(sale_price);
      setTotalDiscount(totalDiscountAmount);
      setTotalPay(totalPayAmount);
    }
  }, [singlePurchaseHistory]);

  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
      }}>
      {loading?.singlePurchaseHistory ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null}
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
          {singlePurchaseHistory?.courses?.map((el, index) => {
            return <PurchaseCourse el={el} key={index} />;
          })}

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
              {singlePurchaseHistory?.courses?.slice(0, 3)?.map((el, index) => {
                return <CourseNameAndPrice el={el} />;
              })}
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
              <TextAtom text={'Actual price'} preset="large" />
              <TextAtom text={`₹ ${actualPricetotal}`} preset="heading3" />
            </View>
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom text={'Sale price'} preset="large" />
              <TextAtom text={`₹ ${subtotal}`} preset="heading3" />
            </View>
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom
                text={'Discount'}
                preset="body"
                style={{color: '#B5B5B5'}}
              />
              <TextAtom
                text={`- ₹ ${totalDiscount}`}
                preset="heading4"
                style={{color: colorPresets.PRIMARY}}
              />
            </View>
            <View style={[commonStyle.flexSpaceBetween, {}]}>
              <TextAtom text={'GST'} preset="body" style={{color: '#B5B5B5'}} />
              <TextAtom
                text={`+ ₹ ${gst}`}
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
              <TextAtom text={`₹ ${totalPay}`} preset="heading3" />
            </View>
            <TouchableOpacity
              style={[commonStyle.flexEnd, {marginTop: mScale.base}]}>
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
        <ButtonAtom
          title={'Back to home'}
          preset={'tertiary'}
          textPreset="heading4"
          onPress={() => {
            navigation.navigate(RouteKeys.HOMESCREEN);
          }}
        />
      </View>
    </GradientTemplate>
  );
};

const PurchaseCourse = ({el}: {el: CoursesResponse}) => {
  return (
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
      <TextAtom text={el?.name} preset="heading4" />
      <TextAtom
        text={el?.description}
        preset="medium"
        style={{color: colorPresets.GRAY}}
      />
      <ProgressBar
        hours={el?.duration_time || ''}
        level={el?.course_type?.toLowerCase() || 'intermediate'}
      />
      <View
        style={[commonStyle.flexSpaceBetween, {marginVertical: mScale.base}]}>
        <TextAtom text={`₹ ${el?.sale_price}`} preset="heading3" />
        <ButtonAtom title={'Start this course now'} />
      </View>
    </View>
  );
};

const CourseNameAndPrice = ({el}: {el: CoursesResponse}) => {
  return (
    <View
      style={[
        commonStyle.flexSpaceBetween,
        {flex: 1, alignItems: 'flex-start', marginBottom: mScale.md},
      ]}>
      <TextAtom
        text={el?.name}
        preset="heading4"
        style={{width: moderateScale(200)}}
      />
      <TextAtom text={`₹ ${el?.sale_price}`} preset="heading4" />
    </View>
  );
};
