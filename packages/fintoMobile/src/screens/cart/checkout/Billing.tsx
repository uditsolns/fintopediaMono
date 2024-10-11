import {useRoute} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CheckoutStep} from '@src/components/CheckoutStep';
import {GrandTotalPrice} from '@src/components/GrandTotalPrice';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {View} from 'react-native';

interface BillingProps extends NavType<'Billing'> {}

export const Billing: React.FunctionComponent<BillingProps> = ({
  navigation,
}) => {
  const routes = useRoute<any>();
  let cartData = routes?.params?.cartData;
  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: moderateScale(70),
      }}>
      <ScrollViewAtom>
        <View>
          <CheckoutStep activeStep={2} />
          <View style={{padding: mScale.base}}>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Name*"
                placeholder="Enter your name"
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Phone number *"
                placeholder="Enter your phone number"
                keyboardType="numeric"
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Address"
                placeholder={'Enter your address'}
                multiline={true}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label={'Location'}
                placeholder={'Enter your location'}
                multiline={true}
              />
            </View>

            <View
              style={[
                commonStyle.flexStart,
                {
                  borderWidth: 1,
                  borderColor: colorPresets.GRAY3,
                  marginTop: mScale.xxl,
                  padding: mScale.md2,
                  flex: 1,
                  borderRadius: 8,
                },
              ]}>
              <Images.SVG.InfoIcon />
              <TextAtom
                text={
                  'Note: You need to fill all the optional details within 24 hours of checkout'
                }
                preset="medium"
                style={{flex: 1, padding: mScale.md}}
              />
            </View>
          </View>
        </View>
      </ScrollViewAtom>
      <GrandTotalPrice
        btnTitle="Pay now"
        itemCount={cartData?.totalItem}
        price={cartData?.totalPay}
        discount_price={cartData?.totalDiscount}
        onPress={() => {
          navigation.navigate(RouteKeys.PAYMENTSUCCESSSCREEN);
        }}
      />
    </GradientTemplate>
  );
};
