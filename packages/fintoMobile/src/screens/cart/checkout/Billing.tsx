import {useRoute} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {
  API_ENDPOINT,
  CALLBACK_URL,
  ENABLE_LOGGING,
  ENVIRONMENT,
  FLOW_ID,
  MERCHANT_ID,
  ORDER_STATUS_URL,
  PACKAGE_NAME,
  PRODUCTION_HOST_URL,
  REDIRECT_URL,
  SALT_INDEX,
  SALT_KEY,
} from '@src/components/Calculate';
import {CheckoutStep} from '@src/components/CheckoutStep';
import {GrandTotalPrice} from '@src/components/GrandTotalPrice';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {BackHandler, Platform, View} from 'react-native';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import sha256 from 'crypto-js/sha256';
import base64 from 'react-native-base64';
import {
  createPurchaseHistory,
  getPurchaseHistoryById,
} from '@shared/src/provider/store/services/PurchaseHistory.service';
import LoaderAtom from '@src/components/LoaderAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {useCartContext} from '@src/components/context/CartContextApi';
import {getCoursesgetPurchase} from '@shared/src/provider/store/services/coursesget-purchase.service';

interface BillingProps extends NavType<'Billing'> {}

export const Billing: React.FunctionComponent<BillingProps> = ({
  navigation,
}) => {
  const {orderId, merchantOrderID, accessToken} = useCartContext();
  const routes = useRoute<any>();
  const dispatch = useAppDispatch();
  let cartData = routes?.params?.cartData;
  const {current_user, auth} = useAppSelector(state => state.auth);
  const {courseCart} = useAppSelector(state => state?.courseCart);
  const {loading} = useAppSelector(state => state?.purchaseHistory);
  const currentDate = new Date().toISOString().toString();
  const currentPurchaseDate = currentDate?.split('T')[0];
  let course_id_arr = courseCart?.length
    ? courseCart?.map(el => el?.course_id)
    : [];

  React.useEffect(() => {
    const backAction = () => {
      console.log('backAction');
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  React.useEffect(() => {
    try {
      PhonePePaymentSDK.init(ENVIRONMENT, MERCHANT_ID, FLOW_ID, ENABLE_LOGGING)
        .then(res =>
          console.log(
            `PhonePePaymentSDK initilized of this ${MERCHANT_ID}`,
            res,
          ),
        )
        .catch(err => console.log('PhonePePaymentSDK initilized error', err));
    } catch (error) {
      console.log('PhonePePaymentSDK initilized error', error);
    }
  }, []);

  const handlePayment = () => {
    try {
      let request = {
        orderId: orderId?.orderId,
        merchantId: MERCHANT_ID,
        token: orderId?.token,
        paymentMode: {
          type: 'PAY_PAGE',
        },
      };
      let requestJSONBody = JSON.stringify(request);
      PhonePePaymentSDK.startTransaction(requestJSONBody, null)
        .then(async res => {
          console.log('startTransaction response ', res);
          await paymentCheckStaus();
        })
        .catch(e => {
          console.log('startTransaction err', e);
        })
        .finally(() => {
          console.log('startTransaction finally block');
        });
    } catch (error) {
      console.log('handlePayment error', error);
    }
  };

  const paymentCheckStaus = async () => {
    console.log(`${ORDER_STATUS_URL}/${merchantOrderID}/status?details=true&errorContext=true`,accessToken,MERCHANT_ID)
    try {
      fetch(`https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order/${merchantOrderID}/status?details=true&errorContext=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `O-Bearer ${accessToken}`,
          'X-MERCHANT-ID': MERCHANT_ID,
        },
      })
        .then(response => response.json())
        .then(res => {
          console.log('PhonePe Payment Status:', JSON.stringify(res));
        })
        .catch(error => {
          console.log('error', error);
        });
    } catch (error) {
      console.log('paymentCheckStaus error', error);
    }
  };

  React.useEffect(() => {
    getUPIAppsInstalled();
  }, []);
  const getUPIAppsInstalled = async () => {
    if (Platform.OS == 'ios') {
      PhonePePaymentSDK.getUPIAppsInstalledforIos()
        .then(a => {
          console.log(JSON.stringify(a));
        })
        .catch(error => {
          console.log('error:' + error.message);
        });
    } else {
      PhonePePaymentSDK.getUpiAppsForAndroid()
        .then(a => {
          console.log(JSON.stringify(a));
        })
        .catch(error => {
          console.log('error:' + error.message);
        });
    }
  };
  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: moderateScale(70),
        padding: mScale.lg1,
      }}>
      {loading?.singlePurchaseHistory || loading?.create ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null}
      <ScrollViewAtom>
        <View>
          <View>
            <CheckoutStep activeStep={2} />
          </View>
          <View style={{padding: mScale.base}}>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Name*"
                placeholder="Enter your name"
                value={`${current_user?.first_name} ${current_user?.surname_name} `}
                editable={false}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Phone number *"
                placeholder="Enter your phone number"
                keyboardType="numeric"
                value={`${current_user?.phone}`}
                editable={false}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label="Email"
                placeholder={'Enter your email'}
                value={`${current_user?.email}`}
                editable={false}
              />
            </View>
            <View style={{marginBottom: mScale.lg}}>
              <InputAtom
                shape="square"
                label={'Location'}
                placeholder={'Location'}
                multiline={true}
                value={`${current_user?.res_address || ''}`}
                editable={false}
              />
            </View>

            <View
              style={[
                commonStyle.flexStart,
                {
                  borderWidth: 0.5,
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
        itemCount={cartData?.totalItem || ''}
        price={cartData?.totalPay || ''}
        discount_price={cartData?.actualPrice || ''}
        onPress={() => {
          handlePayment();
        }}
      />
    </GradientTemplate>
  );
};
