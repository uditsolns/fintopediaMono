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
  subtractTwoNumber,
  sumCalculate,
} from '@src/components/Calculate';
import {CheckoutStep} from '@src/components/CheckoutStep';
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

  React.useEffect(() => {
    if (courseCart) {
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
    }
  }, [courseCart, create, deleteCart]);

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
      }}>
      {courseCartLoading?.delete || courseCartLoading?.courseCart ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null}
      <ScrollViewAtom nestedScrollEnabled={true}>
        <View>
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
        price={totalPay}
        discount_price={actualPricetotal}
        onPress={() => {
          if (courseCart?.length > 0) {
            let cartData = {
              totalItem: courseCart?.length,
              totalPay: totalPay,
              totalDiscount: totalDiscount,
              totalSubTotal: subtotal,
              actualPrice: actualPricetotal,
              gst: gst,
            };
            navigation.navigate(RouteKeys.BILLINGSCREEN, {cartData: cartData});
          }
        }}
      />
    </GradientTemplate>
  );
};
