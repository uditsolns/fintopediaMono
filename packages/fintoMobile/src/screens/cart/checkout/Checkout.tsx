import {useNavigation, useRoute} from '@react-navigation/native';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {CheckoutStep} from '@src/components/CheckoutStep';
import {GrandTotalPrice} from '@src/components/GrandTotalPrice';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import CartMolecule from '@src/components/molecules/CartMolecule/CartMolecule';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {FlatList, View} from 'react-native';

interface CheckoutProps extends NavType<'Checkout'> {}

export const Checkout: React.FunctionComponent<CheckoutProps> = ({
  navigation,
}) => {
  const routes = useRoute<any>();
  let cartData = routes?.params?.cartData;
  const {courses, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
  const renderItem = ({item}: {item: CoursesResponse}) => {
    return <CartMolecule item={item} saveForLaterBoolean={false} />;
  };
  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: moderateScale(70),
      }}>
      <ScrollViewAtom>
        <CheckoutStep activeStep={1} />
        <View style={{padding: mScale.base}}>
          <FlatList
            data={courses?.length ? courses : []}
            renderItem={renderItem}
            contentContainerStyle={{
              rowGap: mScale.base,
              paddingBottom: mScale.lg,
            }}
            nestedScrollEnabled={true}
          />
        </View>
      </ScrollViewAtom>
      <GrandTotalPrice
        btnTitle="Next"
        itemCount={cartData?.totalItem}
        price={cartData?.totalPay}
        discount_price={cartData?.totalDiscount}
        onPress={() => {
          navigation.navigate(RouteKeys.BILLINGSCREEN, {cartData: cartData});
        }}
      />
    </GradientTemplate>
  );
};
