import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import {mScale, WINDOW_HEIGHT} from '@shared/src/theme/metrics';
import {colorPresets} from '@shared/src/theme/color';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import PreviousRoundMolecule from '@src/components/molecules/PreviousRoundMolecule/PreviousRoundMolecule';
import SearchInputAtom from '@src/components/SearchInputAtom';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {getStockData} from '@shared/src/provider/store/services/stockdatas.service';
import {StockDatasResponse} from '@shared/src/utils/types/stockDatas';

export default function PreviousRoundPrice() {
  const dispatch = useAppDispatch();
  const {filterRoundLevelData, singleRoundLevel} = useAppSelector(
    state => state.roundLevel,
  );

  const {stockData} = useAppSelector(state => state.stockData);
  const [searchStocksData, setSearchStocksData] = React.useState<
    StockDatasResponse[]
  >(stockData || []);
  const [search, setSearch] = React.useState<string>('');
  const [roundLevel, setRoundLevel] = React.useState<number | string>(
    filterRoundLevelData?.round_level!,
  );

  React.useEffect(() => {
    if (stockData) {
      setRoundLevel(
        filterRoundLevelData?.round_level > 1
          ? filterRoundLevelData?.round_level - 1
          : 1,
      );
      setSearchStocksData(stockData);
    }
  }, [stockData]);

  const onRefresh = () => {
    dispatch(getStockData());
    setSearchStocksData(stockData);
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

  const previousRoundRenderItem = ({item}: {item: StockDatasResponse}) => (
    <PreviousRoundMolecule item={item} />
  );
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
      <View
        style={[
          commonStyle.flexSpaceBetween,
          {
            marginTop: mScale.base,
            borderBottomWidth: 0.5,
            borderColor: colorPresets.GRAY,
            marginBottom: mScale.base,
            paddingBottom: mScale.base,
            width: '100%',
          },
        ]}>
        <TextAtom
          text={'Name'}
          preset="medium"
          style={{fontWeight: '500', color: colorPresets.GRAY}}
          numberOfLines={1}
        />
        <TextAtom
          text={'Price'}
          preset="medium"
          style={{fontWeight: '500', color: colorPresets.GRAY}}
          numberOfLines={1}
        />
      </View>
      <View>
        <FlatList
          data={
            searchStocksData?.length
              ? searchStocksData?.filter(
                  e3 =>
                    e3.game_id == filterRoundLevelData?.game_id &&
                    e3.round_level == roundLevel,
                )
              : []
          }
          renderItem={previousRoundRenderItem}
          keyExtractor={item => item?.id?.toString()}
          contentContainerStyle={{rowGap: 10,paddingBottom:WINDOW_HEIGHT*0.2}}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
