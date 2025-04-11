import {useFocusEffect} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {
  deleteCourseCart,
  getCourseCart,
} from '@shared/src/provider/store/services/CourseCart.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CourseCartResponse} from '@shared/src/utils/types/CourseCart';
import {
  addTwoNumber,
  calculatePercetageAmount,
  roundFigure,
  subtractTwoNumber,
  sumCalculate,
} from '@src/components/Calculate';
import {CheckoutStep} from '@src/components/CheckoutStep';
import {useCartContext} from '@src/components/context/CartContextApi';
import {GrandTotalPrice} from '@src/components/GrandTotalPrice';
import LoaderAtom from '@src/components/LoaderAtom';
import CartMolecule from '@src/components/molecules/CartMolecule/CartMolecule';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {FlatList, View} from 'react-native';

interface CheckoutProps extends NavType<'Checkout'> {}

export const Checkout: React.FunctionComponent<CheckoutProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const {
    courseCart,
    delete: deleteCart,
    loading: courseCartLoading,
    create,
  } = useAppSelector(state => state.courseCart);
  const [subtotal, setSubtotal] = React.useState<number>(0);
  const [totalDiscount, setTotalDiscount] = React.useState<number>(0);
  const [totalPay, setTotalPay] = React.useState<number>(0);
  const [gst, setGst] = React.useState<number>(0);
  const [actualPricetotal, setActualPricetotal] = React.useState<number>(0);
  const {
    isCouponCodeApply,
    totalPaymentAmount,
    setTotalPaymentAmount,
    setKeepTotalPaymentAmount,
    couponCodePercentage,
    keepTotalPaymentAmount,
  } = useCartContext();
  React.useEffect(() => {
    try {
      if (courseCart?.length) {
        let sale_price = sumCalculate(courseCart, 'sale_price');
        let actual_price = sumCalculate(courseCart, 'actual_price');
        let totalDiscountAmount = subtractTwoNumber(sale_price, actual_price);
        let gstTotal = (sale_price * 18) / 100;
        let totalPayAmount = addTwoNumber(sale_price, gstTotal);
        setActualPricetotal(actual_price);
        setGst(gstTotal);
        setSubtotal(sale_price);
        setTotalDiscount(totalDiscountAmount);
        setTotalPay(totalPayAmount);
        setKeepTotalPaymentAmount(totalPayAmount);
      }
    } catch (error) {
      console.log('useeffect checkout error', error);
    }
  }, [courseCart, deleteCart]);

  useFocusEffect(
    React.useCallback(() => {
      if (couponCodePercentage) {
        let amt = calculatePercetageAmount(
          +couponCodePercentage,
          +keepTotalPaymentAmount,
        );
        let total2 = subtractTwoNumber(amt, +keepTotalPaymentAmount);
        setTotalPaymentAmount(roundFigure(total2));
      }
    }, [courseCart, create, deleteCart, totalPay, keepTotalPaymentAmount]),
  );

  const renderItem = ({item}: {item: CourseCartResponse}) => {
    return (
      <CartMolecule
        item={item?.course}
        saveForLaterBoolean={false}
        onRemove={() => {
          let id = Number(item?.id);
          dispatch(
            deleteCourseCart({
              id,
              onSuccess: data => {
                dispatch(getCourseCart());
                console.log('delete cart');
              },
              onError: err => {},
            }),
          );
        }}
      />
    );
  };
  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: moderateScale(70),
        padding: mScale.lg1,
      }}>
      {courseCartLoading?.delete || courseCartLoading?.courseCart ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null}
      <ScrollViewAtom nestedScrollEnabled={true}>
        <View style={{marginTop: mScale.base}}>
          <CheckoutStep activeStep={1} />
        </View>
        <View style={{padding: mScale.base}}>
          <FlatList
            data={courseCart?.length ? courseCart : []}
            renderItem={renderItem}
            contentContainerStyle={{
              rowGap: mScale.base,
              paddingBottom: mScale.lg,
            }}
          />
        </View>
      </ScrollViewAtom>
      <GrandTotalPrice
        btnTitle="Next"
        itemCount={courseCart?.length}
        price={isCouponCodeApply ? totalPaymentAmount : totalPay}
        discount_price={actualPricetotal}
        onPress={() => {
          try {
            if (courseCart?.length > 0) {
              let cartData = {
                totalItem: courseCart?.length,
                totalPay: isCouponCodeApply ? totalPaymentAmount : totalPay,
                totalDiscount: totalDiscount,
                totalSubTotal: subtotal,
                actualPrice: actualPricetotal,
                gst: gst,
              };
              navigation.navigate(RouteKeys.BILLINGSCREEN, {
                cartData: cartData,
              });
            }
          } catch (error) {
            console.log('checkout error', error);
          }
        }}
      />
    </GradientTemplate>
  );
};
