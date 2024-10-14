import {useNavigation} from '@react-navigation/native';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import { mScale } from '@shared/src/theme/metrics';
import { CheckoutStep } from '@src/components/CheckoutStep';
import { GrandTotalPrice } from '@src/components/GrandTotalPrice';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import CartMolecule from '@src/components/molecules/CartMolecule/CartMolecule';
import { RouteKeys } from '@src/navigation/RouteKeys';
import React from 'react';
import { FlatList, View } from 'react-native';

interface CheckoutProps {}

export const Checkout: React.FunctionComponent<CheckoutProps> = () => {
  const navigation = useNavigation();
  const renderItem = ({}) => {
    return <CartMolecule saveForLaterBoolean={false} />;
  };
  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
      }}>
      <View style={{paddingHorizontal: mScale.base}}>
        <HeaderLeftMolecule text={'Order details'} />
      </View>
      <ScrollViewAtom>
        <CheckoutStep activeStep={1} />
        <View style={{padding: mScale.base}}>
          <FlatList
            data={[...Array(5)]}
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
        itemCount={5}
        price={'7,000'}
        discount_price={'5,00'}
        onPress={() => {
          navigation.navigate(RouteKeys.BILLINGSCREEN);
        }}
      />
    </GradientTemplate>
  );
};
