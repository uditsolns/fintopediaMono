import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LoaderAtom from '@src/components/LoaderAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {mScale} from '@shared/src/theme/metrics';
import LatestNewsMolecule from '@src/components/molecules/LatestNewsMolecule/LatestNewsMolecule';
import {NavType} from '@src/navigation/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {useBuySellHelper} from '@shared/src/components/structures/buy-sell/buySell.helper';
import {buySellField} from '@shared/src/components/structures/buy-sell/buySellModel';
import {NewsResponse} from '@shared/src/utils/types/news';

interface BuyStocksProps extends NavType<'BuyStocks'> {}

export const BuyStocks: React.FC<BuyStocksProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {singleStockData} = useAppSelector(state => state.stockData);
  const {singleGame} = useAppSelector(state => state.games);
  const {filterRoundLevelData, singleRoundLevel} = useAppSelector(
    state => state.roundLevel,
  );
  const {news} = useAppSelector(state => state.news);
  const {create,loading} = useAppSelector(
    state => state.transactions,
  );

  const {buySellFormik, buySellInputProps} = useBuySellHelper();
  const {handleSubmit, isSubmitting, setFieldValue, values, resetForm} =
    buySellFormik;

  React.useEffect(() => {
    setFieldValue(buySellField.game_id.name, singleStockData?.game_id);
    setFieldValue(buySellField.user_id.name, auth?.user?.id);
    setFieldValue(buySellField.stock_id.name, singleStockData?.stock_id);
    setFieldValue(buySellField.order_type.name, 'Buy');
    setFieldValue(
      buySellField.stock_current_price.name,
      singleStockData?.stock_current_price,
    );
    setFieldValue(buySellField.round_level.name, singleStockData?.round_level);
  }, [singleStockData]);

  const buyStocks = async () => {
    handleSubmit();
    
  };

  React.useEffect(() => {
    let current_price: string =
      singleStockData?.stock_current_price?.toString() || '0';
    let quantity: string = values.order_qty?.trim()?.toString() || '0';
    const cleanCurrentPrice = parseFloat(current_price.replace(/,/g, '')) || 0;
    const cleanQuantity = parseFloat(quantity.replace(/,/g, '')) || 0;
    const totalPrice = (cleanQuantity * cleanCurrentPrice).toString();
    setFieldValue(buySellField.total_price.name, totalPrice);
  }, [values.order_qty, values.stock_current_price]);

  const renderItem = ({item}: {item: NewsResponse}) => (
    <LatestNewsMolecule item={item} itemWidth={'fullWidth'} />
  );

  return (
    <GradientTemplate>
      <>
        {loading.create ? (
          <View style={commonStyle.fullPageLoading}>
            <LoaderAtom size={'large'} />
          </View>
        ) : null}
        <HeaderLeftMolecule text={'Adani Stock'} />
        <ScrollViewAtom>
          <View style={{marginBottom: mScale.base}}>
            <InputAtom
              shape="square"
              label={buySellField.stock_current_price.label}
              placeholder={buySellField.stock_current_price.placeHolder}
              {...buySellInputProps(buySellField.stock_current_price.name)}
              editable={false}
            />
          </View>
          <View style={{marginBottom: mScale.base}}>
            <InputAtom
              shape="square"
              label={buySellField.order_qty.label}
              placeholder={buySellField.order_qty.placeHolder}
              {...buySellInputProps(buySellField.order_qty.name)}
              keyboardType="numeric"
            />
          </View>
          <View style={{marginBottom: mScale.base}}>
            <InputAtom
              shape="square"
              label={buySellField.total_price.label}
              placeholder={buySellField.total_price.placeHolder}
              {...buySellInputProps(buySellField.total_price.name)}
              keyboardType="numeric"
              editable={false}
            />
          </View>
          <View style={{marginBottom: mScale.base}}>
            <InputAtom
              shape="square"
              label={'Remark (optional)'}
              placeholder={'Enter Remark'}
              multiline={true}
            />
          </View>
          <ButtonAtom
            title={'Buy'}
            textPreset={'heading4'}
            onPress={buyStocks}
          />

          <View style={{marginTop: mScale.xxl}}>
            <TextAtom
              text={'Catch up with latest news'}
              preset="heading2"
              style={{marginVertical: mScale.md}}
            />
            <FlatList
              data={
                news?.length
                  ? news.filter(e3 => e3.set_id == filterRoundLevelData?.set_id)
                  : []
              }
              renderItem={renderItem}
              keyExtractor={item => item?.id?.toString()}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
              contentContainerStyle={{
                columnGap: mScale.base,
                paddingBottom: mScale.lg,
              }}
              horizontal={true}
            />
          </View>
        </ScrollViewAtom>
      </>
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({});
