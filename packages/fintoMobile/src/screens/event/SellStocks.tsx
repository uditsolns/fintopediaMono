import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
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
import {getGameUserByLoginIDGameID} from '@shared/src/provider/store/services/gameusers.service';
import {storeUserGameAmount} from '@shared/src/provider/store/reducers/gameusers.reducer';
import {Toast} from 'react-native-toast-notifications';

interface SellStocksProps extends NavType<'SellStocks'> {}

export const SellStocks: React.FC<SellStocksProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {singleStockData} = useAppSelector(state => state.stockData);
  const {filterRoundLevelData, singleRoundLevel} = useAppSelector(
    state => state.roundLevel,
  );
  const {singleGame} = useAppSelector(state => state.games);
  const {news} = useAppSelector(state => state.news);
  const {create, loading} = useAppSelector(state => state.transactions);
  const {user_game_amount} = useAppSelector(state => state.gameUsers);

  const {buySellFormik, buySellInputProps} = useBuySellHelper();
  const {handleSubmit, isSubmitting, setFieldValue, values, resetForm} =
    buySellFormik;

  React.useEffect(() => {
    setFieldValue(buySellField.game_id.name, singleStockData?.game_id);
    setFieldValue(buySellField.user_id.name, auth?.user?.id);
    setFieldValue(buySellField.stock_id.name, singleStockData?.stock_id);
    setFieldValue(buySellField.order_type.name, 'Sell');
    setFieldValue(buySellField.round_level.name, singleStockData?.round_level);
  }, [singleStockData]);

  React.useEffect(() => {
    const stock_filter_amount = singleStockData?.stock?.stock_datas!.find(
      e3 => {
        return (
          e3.game_id == filterRoundLevelData?.game_id &&
          e3.round_level == filterRoundLevelData?.round_level
        );
      },
    );

    let current_price: string =
      stock_filter_amount?.stock_current_price?.toString() || '0';
    let quantity: string = values.order_qty?.trim()?.toString() || '0';
    const cleanCurrentPrice = parseFloat(current_price.replace(/,/g, '')) || 0;
    const cleanQuantity = parseFloat(quantity.replace(/,/g, '')) || 0;
    const totalPrice = (cleanQuantity * cleanCurrentPrice).toString();
    setFieldValue(buySellField.total_price.name, totalPrice);
    setFieldValue(buySellField.stock_current_price.name, current_price);
  }, [singleStockData, values.order_qty, values.stock_current_price]);

  const sellStocks = async () => {
    const filterOrderQty = singleStockData?.user?.user_transactions?.find(
      el => el?.stock_id == singleStockData?.stock_id,
    );
    if (Number(values.order_qty) > filterOrderQty?.order_qty) {
      Toast.show('Quantity is less than equal to total quantity', {
        type: 'error',
      });
    } else { 
      await handleSubmit();
      if (create?.id) {
        Alert.alert('Sell Succeessfully');
        let user_id = Number(auth?.user?.id);
        let game_id = Number(singleGame?.id);
        dispatch(
          getGameUserByLoginIDGameID({
            user_id,
            game_id,
            onSuccess: data => {
              console.log(
                'succes of getGameUserByLoginIDGameID of sell screen',
                data,
                user_game_amount,
              );
              if (user_game_amount == 0) {
                dispatch(storeUserGameAmount(data?.amount));
              }
            },
            onError: () => {},
          }),
        );
        navigation.goBack();
      }
    }
  };

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
            title={'Sell'}
            textPreset={'heading4'}
            onPress={sellStocks}
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
