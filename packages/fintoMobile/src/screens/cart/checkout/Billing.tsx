import {useRoute} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {
  API_ENDPOINT,
  CALLBACK_URL,
  ENVIRONMENT,
  MERCHANT_ID,
  PRODUCTION_HOST_URL,
  REDIRECT_URL,
  SALT_INDEX,
  SALT_KEY,
} from '@src/components/Calculate';
import {CheckoutStep} from '@src/components/CheckoutStep';
import {GrandTotalPrice} from '@src/components/GrandTotalPrice';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {View} from 'react-native';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import sha256 from 'crypto-js/sha256';
import base64 from 'react-native-base64';

interface BillingProps extends NavType<'Billing'> {}

export const Billing: React.FunctionComponent<BillingProps> = ({
  navigation,
}) => {
  const routes = useRoute<any>();
  let cartData = routes?.params?.cartData;
  const {current_user, auth} = useAppSelector(state => state.auth);
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  const currentDate = new Date().toISOString().toString();
  const currentPurchaseDate = currentDate?.split('T')[0];
  let course_id_arr = courseCart?.map(el => el?.course_id);
  console.log(course_id_arr);

  React.useEffect(() => {
    PhonePePaymentSDK.init(ENVIRONMENT, MERCHANT_ID, '', true)
      .then(res =>
        console.log(`PhonePePaymentSDK initilized of this ${MERCHANT_ID}`, res),
      )
      .catch(err => console.log('PhonePePaymentSDK initilized error', err));
  }, []);

  const handlePayment = () => {
    const requestBody = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: `${new Date().getTime()}`,
      merchantUserId: `${auth?.user?.id}`,
      amount: cartData?.totalPay * 100,
      redirectUrl: REDIRECT_URL,
      redirectMode: 'REDIRECT',
      callbackUrl: CALLBACK_URL,
      mobileNumber: `${auth?.user?.phone}`,
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };
    let requestJSONBody = JSON.stringify(requestBody);
    let requestBase64Body = base64.encode(requestJSONBody);
    const input = requestBase64Body + API_ENDPOINT + SALT_KEY;
    const sha256Res = sha256(requestBase64Body + API_ENDPOINT + SALT_KEY);
    const finalXHeader = `${sha256Res}###${SALT_INDEX}`;
    PhonePePaymentSDK.startTransaction(
      requestBase64Body,
      finalXHeader,
      'com.aurahealing',
      null,
    )
      .then(res => {
        console.log('startTransaction response ', JSON.stringify(res));
        const sha256Res2 = sha256(
          `/pg/v1/status/${MERCHANT_ID}/${requestBody?.merchantTransactionId}` +
            SALT_KEY,
        );
        const finalXHeader2 = `${sha256Res2}###${SALT_INDEX}`;
        paymentCheckStaus(
          finalXHeader2,
          MERCHANT_ID,
          requestBody?.merchantTransactionId,
        );
      })
      .catch(e => {
        console.log('startTransaction err', e);
      })
      .finally(() => {
        console.log('startTransaction finally block');
      });
  };

  const paymentCheckStaus = (
    finalXHeader2: string,
    merchantId: string,
    merchantTransactionId: string,
  ) => {
    fetch(
      `${PRODUCTION_HOST_URL}/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': finalXHeader2,
          'X-MERCHANT-ID': merchantId,
        },
      },
    )
      .then(response => response.json())
      .then(async res => {
        console.log('payment success response', JSON.stringify(res));

        const formData = new FormData();

        formData.append('user_id', auth?.user?.id);
        formData.append('course_id', auth?.user?.id);
        formData.append('purchase_date', currentPurchaseDate);
        formData.append(
          'status',
          res?.code == 'PAYMENT_SUCCESS' ? 'paid' : 'failed',
        );
        formData.append(
          'payment_status',
          res?.code == 'PAYMENT_SUCCESS' ? 'paid' : 'failed',
        );
        formData.append(
          'phone_pe_payment_id',
          res?.data?.transactionId ||
            res?.data?.paymentInstrument?.pgServiceTransactionId ||
            '',
        );
        formData.append(
          'payment_type',
          res?.data?.paymentInstrument?.type || '',
        );
        formData.append('utr', res?.data?.paymentInstrument?.utr || '');
        formData.append(
          'upiTransactionId',
          res?.data?.paymentInstrument?.upiTransactionId || '',
        );
        formData.append(
          'accountHolderName',
          res?.data?.paymentInstrument?.accountHolderName || '',
        );
        formData.append(
          'accountType',
          res?.data?.paymentInstrument?.accountType || '',
        );
        formData.append(
          'pgTransactionId',
          res?.data?.paymentInstrument?.pgTransactionId || '',
        );
        formData.append(
          'pgServiceTransactionId',
          res?.data?.paymentInstrument?.pgServiceTransactionId || '',
        );
        formData.append('arn', res?.data?.paymentInstrument?.arn || '');
        formData.append(
          'cardType',
          res?.data?.paymentInstrument?.cardType || '',
        );
        formData.append('brn', res?.data?.paymentInstrument?.brn || '');

        // await updateTransactionMethod(id, formData,res);
        // await getAllTransactionsMethod(token, navigation);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      });
  };
  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: moderateScale(70),
      }}>
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
          // navigation.navigate(RouteKeys.PAYMENTSUCCESSSCREEN);
          handlePayment();
        }}
      />
    </GradientTemplate>
  );
};
