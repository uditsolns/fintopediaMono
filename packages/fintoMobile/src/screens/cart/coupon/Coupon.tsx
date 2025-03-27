import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {
  applyCouponCode,
  getCouponCode,
} from '@shared/src/provider/store/services/coupon-code.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {fontPresets} from '@shared/src/theme/typography';
import {CouponCodeResponse} from '@shared/src/utils/types/coupon-code';
import LoaderAtom from '@src/components/LoaderAtom';
import CouponMolecule from '@src/components/molecules/CouponMolecule/CouponMolecule';
import SeparatorAtom from '@src/components/SeperatorAtom';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';
import {useCartContext} from '@src/components/context/CartContextApi';
import {Toast} from 'react-native-toast-notifications';
import {subtractTwoNumber} from '@src/components/Calculate';

interface CouponProps extends NavType<'Coupon'> {}

export const Coupon: React.FunctionComponent<CouponProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {coupon_code, loading} = useAppSelector(state => state.couponCode);
  const [refreshLoading, setRefreshLoading] = React.useState<boolean>(false);
  const [discount, setDiscount] = React.useState<string>('');
  const {
    isCouponCodeApply,
    setIsCouponCodeApply,
    setTotalPaymentAmount,
    keepTotalPaymentAmount,
    setCouponCodePercentage,
  } = useCartContext();
  const {courseCart} = useAppSelector(state => state.courseCart);

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getCouponCode());
    setRefreshLoading(false);
  };
  const renderItem = ({item}: {item: CouponCodeResponse}) => {
    return (
      <CouponMolecule
        item={item}
        onPress={() => {
          Clipboard.setString(`${item?.discount_code}`);
        }}
      />
    );
  };

  const handleApplyCoupon = () => {
    let params = {discountCode: discount};
    dispatch(applyCouponCode(params))
      .unwrap()
      .then((originalPromiseResult: any) => {
        if (!discount) {
          Toast.show('Please enter your coupon code', {
            type: 'error',
          });
        } else if (originalPromiseResult?.message) {
          Toast.show(originalPromiseResult?.message, {
            type: 'error',
          });
        } else {
          // let discountCourse = courseCart?.find(
          //   el => el?.course_id == originalPromiseResult?.course_id,
          // );
          // const salePrice = +discountCourse?.course?.sale_price || 0;
          // const gstAmount =salePrice * (18 / 118)
          // let subs1 = subtractTwoNumber(gstAmount, keepTotalPaymentAmount);
          // let subs2 = subtractTwoNumber(salePrice, subs1);
          // console.log('subs1', subs1);
          // console.log('subs2', subs2);
          console.log('originalPromiseResult', originalPromiseResult);
          let amt = Number(keepTotalPaymentAmount);
          const discount =
            +originalPromiseResult?.discount?.replace(/\D+/g, '') || 0;
          setCouponCodePercentage(discount);
          const discountAmount = (amt * discount) / 100;
          const finalAmount = amt - discountAmount;
          setIsCouponCodeApply(true);
          setTotalPaymentAmount(finalAmount);
          Toast.show('Coupon code applied successfully', {
            type: 'success',
          });
          navigation.goBack();
          // setDiscount('');
        }
      })
      .catch((error: any) => {
        console.log('rejectedValueOrSerializedError', JSON.stringify(error));
      });
  };

  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingTop: moderateScale(70),
        padding: mScale.lg1,
      }}>
      {loading.coupon_code ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <FlatList
        data={coupon_code?.length ? coupon_code : []}
        renderItem={renderItem}
        refreshing={refreshLoading}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View>
            <View
              style={[
                commonStyle.flexSpaceBetween,
                {marginTop: moderateScale(32)},
              ]}>
              <TextInput
                placeholder="Enter promo code"
                placeholderTextColor={colorPresets.CTA}
                style={{
                  color: colorPresets.CTA,
                  height: moderateScale(43),
                  flex: 1,
                  ...fontPresets.title,
                  fontWeight: '400',
                  paddingStart: mScale.base,
                  borderWidth: 0.3,
                  borderColor: colorPresets.GRAY3,
                  overflow: 'hidden',
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  letterSpacing: -0.14,
                }}
                value={discount}
                onChangeText={text => setDiscount(text)}
              />
              <PressableAtom
                style={{
                  backgroundColor: isCouponCodeApply
                    ? '#76D651'
                    : colorPresets.CTA,
                  height: moderateScale(43),
                  width: moderateScale(90),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  marginStart: -10,
                }}
                onPress={handleApplyCoupon}>
                <TextAtom
                  text={isCouponCodeApply ? 'Applied' : 'Apply'}
                  preset="titleBold"
                  style={{color: colorPresets.BLACK}}
                />
              </PressableAtom>
            </View>
            <SeparatorAtom
              marginHorizontal={0}
              style={{marginTop: moderateScale(28), marginBottom: mScale.sm}}
              bgColor={'#404251'}
            />
          </View>
        }
        contentContainerStyle={{
          gap: mScale.lg,
        }}
        showsVerticalScrollIndicator={false}
      />
    </GradientTemplate>
  );
};
