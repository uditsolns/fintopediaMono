import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {getCouponCode} from '@shared/src/provider/store/services/coupon-code.service';
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


interface CouponProps extends NavType<'Coupon'> {}

export const Coupon: React.FunctionComponent<CouponProps> = () => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {coupon_code, loading} = useAppSelector(state => state.couponCode);
  const [refreshLoading, setRefreshLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getCouponCode());
    setRefreshLoading(false);
  };
  const renderItem = ({item}: {item: CouponCodeResponse}) => {
    return <CouponMolecule item={item} onPress={()=>{
      Clipboard.setString(`${item?.discount_code}`)
    }} />;
  };
  return (
    <GradientTemplate style={{paddingBottom: 0, paddingTop: moderateScale(70)}}>
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
            {/* <View
              style={[commonStyle.flexSpaceBetween, {marginTop: mScale.base}]}>
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
                  borderWidth: 1,
                  borderColor: colorPresets.GRAY3,
                  overflow: 'hidden',
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: colorPresets.CTA,
                  height: moderateScale(42.5),
                  width: moderateScale(90),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  marginStart: -5,
                }}>
                <TextAtom
                  text={'Apply'}
                  preset="titleBold"
                  style={{color: colorPresets.BLACK}}
                />
              </TouchableOpacity>
            </View> */}
            <SeparatorAtom
              marginHorizontal={0}
              style={{marginVertical: mScale.lg2}}
              bgColor={'#404251'}
            />
          </View>
        }
        contentContainerStyle={{
          rowGap: mScale.base,
          paddingBottom: mScale.base,
        }}
        showsVerticalScrollIndicator={false}
      />
    </GradientTemplate>
  );
};
