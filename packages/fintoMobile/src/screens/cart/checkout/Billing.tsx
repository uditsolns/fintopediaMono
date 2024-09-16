import {useNavigation} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {CheckoutStep} from '@src/components/CheckoutStep';
import {GrandTotalPrice} from '@src/components/GrandTotalPrice';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {View} from 'react-native';
interface BillingProps {}

export const Billing: React.FunctionComponent<BillingProps> = () => {
  const navigation = useNavigation();
  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
      }}>
      <View style={{paddingHorizontal: mScale.base}}>
        <HeaderLeftMolecule text={'Billing'} />
      </View>
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
        itemCount={5}
        price={'7,000'}
        discount_price={'5,00'}
        onPress={() => {
          navigation.navigate(RouteKeys.PAYMENTSUCCESSSCREEN);
        }}
      />
    </GradientTemplate>
  );
};
