import {Alert, FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {moderateScale, mScale, WINDOW_HEIGHT} from '@shared/src/theme/metrics';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {colorPresets} from '@shared/src/theme/color';
import {useNavigation} from '@react-navigation/native';
import TradeMolecule from '@src/components/molecules/TradeMolecule/TradeMolecule';
import StocksMolecule from '@src/components/molecules/StocksMolecule/StocksMolecule';
import SearchInputAtom from '@src/components/SearchInputAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {StocksResponse} from '@shared/src/utils/types/stocks';
import {StockDatasResponse} from '@shared/src/utils/types/stockDatas';
import {getStocks} from '@shared/src/provider/store/services/stocks.service';
import {getStockData} from '@shared/src/provider/store/services/stockdatas.service';
import {storeSingleStockData} from '@shared/src/provider/store/reducers/stockdatas.reducer';
import { getGameUserByLoginIDGameID } from '@shared/src/provider/store/services/gameusers.service';
import { storeUserGameAmount } from '@shared/src/provider/store/reducers/gameusers.reducer';
import { Toast } from 'react-native-toast-notifications';
import { resetTransaction } from '@shared/src/provider/store/reducers/transactions.reducer';

interface TradeProps {}

export default function Trade() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {stocks} = useAppSelector(state => state.stocks);
  const {
    stockData,
  } = useAppSelector(state => state.stockData);
  const {filterRoundLevelData} = useAppSelector(
    state => state.roundLevel,
  );
  const {user_game_amount} = useAppSelector(
    state => state.gameUsers,
  );
  const {singleGame} = useAppSelector(state => state.games);

  const {create} = useAppSelector(state => state.transactions);
  const [uniqueStocks, setUniqueStocks] = React.useState<StocksResponse[]>(
    stocks || [],
  );
  const [selectedStockId, setSelectedStockId] = React.useState<number | string>(
    'all',
  );
  const [searchStocksData, setSearchStocksData] = React.useState<
    StockDatasResponse[]
  >(stockData || []);
  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    if (stocks) {
      const unique = [
        ...new Map(stocks?.map(item => [item?.industry, item])).values(),
      ];
      setUniqueStocks(unique);
    }
  }, [stocks]);
  React.useEffect(() => {
    if (stockData) {
      setSearchStocksData(stockData);
    }
  }, [stockData]);

  const onRefresh = () => {
    dispatch(getStocks());
    dispatch(getStockData());
    setSearchStocksData(stockData);
  };
  

  const stockRenderItem = ({item}: {item: StocksResponse}) => {
    const handlePress = (id: number) => {
      setSelectedStockId(item.id);
      let filterStockDataRes = stockData?.filter(e1 => {
        return (
          e1?.stock?.industry?.toLowerCase() == item?.industry?.toLowerCase()
        );
      });
      setSearchStocksData(filterStockDataRes);
    };

    return (
      <StocksMolecule
        item={item}
        onPress={handlePress}
        selectedStockId={selectedStockId}
      />
    );
  };

  const stockDataRenderItem = ({item}: {item: StockDatasResponse}) => {
    return (
      <TradeMolecule
        item={item}
        onBuyStcok={() => {
          dispatch(storeSingleStockData(item));
          dispatch(resetTransaction())
          navigation.navigate(RouteKeys.BUYSTOCKSSCREEN);
        }}
      />
    );
  };

  const filterSearchByStockName = (searchText: string) => {
    if (searchText) {
      const filtered = stockData?.filter(item => {
        const matchesName = item?.stock?.name
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        return matchesName;
      });
      setSearch(searchText);
      setSearchStocksData(filtered);
    } else {
      setSearchStocksData(stockData);
      setSearch(searchText);
    }
  };
  return (
    <View style={[commonStyle.container, {marginTop: mScale.base}]}>
      <View style={{width: '100%'}}>
        <SearchInputAtom
          isRefreshIconVisible={true}
          onPress={onRefresh}
          value={search}
          onChangeText={text => {
            filterSearchByStockName(text);
          }}
        />
      </View>
      <View>
        <FlatList
          data={uniqueStocks?.length ? uniqueStocks : []}
          renderItem={stockRenderItem}
          keyExtractor={item => item?.id?.toString()}
          horizontal={true}
          contentContainerStyle={{gap: 20}}
          ListHeaderComponent={() => {
            return (
              <Pressable
                style={[
                  styles.content,
                  {
                    backgroundColor:
                      selectedStockId == 'all' ? '#545664' : 'transparent',
                    borderRadius: selectedStockId == 'all' ? 4 : 0,
                    borderWidth: selectedStockId == 'all' ? 1 : 0,
                    borderColor:
                      selectedStockId == 'all' ? '#B8BCCB' : 'transparent',
                    paddingHorizontal:
                      selectedStockId == 'all' ? mScale.base : 0,
                  },
                ]}
                onPress={() => {
                  setSelectedStockId('all');
                  setSearchStocksData(stockData);
                }}>
                <TextAtom
                  text={'All'}
                  preset="bodyBold"
                  style={styles.boldText}
                />
              </Pressable>
            );
          }}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={[
          commonStyle.flexSpaceBetween,
          {
            marginTop: mScale.base,
            borderBottomWidth: 0.5,
            borderColor: colorPresets.GRAY,
            paddingBottom: mScale.md,
            marginBottom: mScale.md,
          },
        ]}>
        <TextAtom
          text={'Name'}
          preset="medium"
          style={{fontWeight: '500', color: colorPresets.GRAY}}
        />
        <View style={[commonStyle.flexSpaceBetween, {width: '40%'}]}>
          <TextAtom
            text={'Avg.'}
            preset="medium"
            style={{fontWeight: '500', color: colorPresets.GRAY}}
          />
          <TextAtom
            text={'Buy'}
            preset="medium"
            style={{fontWeight: '500', color: colorPresets.GRAY}}
          />
        </View>
      </View>
      <View>
        <FlatList
          data={
            searchStocksData?.length
              ? searchStocksData?.filter(
                  e3 =>
                    e3.game_id == filterRoundLevelData?.game_id &&
                    e3.round_level == filterRoundLevelData?.round_level,
                )
              : []
          }
          renderItem={stockDataRenderItem}
          keyExtractor={item => item?.id?.toString()}
          contentContainerStyle={{rowGap: 10,paddingBottom:WINDOW_HEIGHT*0.25}}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(50),
  },
  boldText: {
    fontWeight: '600',
  },
});
