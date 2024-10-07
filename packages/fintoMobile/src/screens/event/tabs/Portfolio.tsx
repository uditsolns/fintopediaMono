import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import GameHeaderMolecule from '@src/components/molecules/GameHeaderMolecule/GameHeaderMolecule';
import PortfolioMolecule from '@src/components/molecules/PortfolioMolecule/PortfolioMolecule';
import SearchInputAtom from '@src/components/SearchInputAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {mScale} from '@shared/src/theme/metrics';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {getTransactions} from '@shared/src/provider/store/services/transactions.service';
import {TransactionsResponse} from '@shared/src/utils/types/transactions';
import { storeSingleStockData } from '@shared/src/provider/store/reducers/stockdatas.reducer';

export default function Portfolio() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {singleGame} = useAppSelector(state => state.games);
  const {transactions, single_transactions} = useAppSelector(
    state => state.transactions,
  );
  const {filterRoundLevelData, singleRoundLevel} = useAppSelector(
    state => state.roundLevel,
  );
  const [search, setSearch] = React.useState<string>('');

  const onRefresh = () => {
    dispatch(getTransactions());
  };

  const [filterTransactions, setFilterTransactions] = React.useState<
    TransactionsResponse[]
  >(transactions || []);
  const [searchResultTransactions, setSearchResultTransactions] =
    React.useState<TransactionsResponse[]>(transactions || []);

  React.useEffect(() => {
    try {
      const data = transactions?.filter(item => {
        const data_stock_filter = item?.user?.user_transactions?.find(
          el => el.stock_id == item.stock_id,
        );
        return (
          // item?.user_id == auth?.user?.id &&
          item?.order_type?.toLowerCase() == 'buy' &&
          item?.game_id == singleGame?.id &&
          Number(data_stock_filter?.order_qty) > 0
        );
      });
      const reverseData = data && [...data].reverse();
      const key = 'stock_id';
      const unique = [
        ...new Map(reverseData?.map(item => [item[key], item])).values(),
      ];
      setFilterTransactions(unique);
      setSearchResultTransactions(unique);
    } catch (err) {}
  }, [transactions]);

  const filterSearchByStockName = (searchText: string) => {
    if (searchText) {
      const filtered = filterTransactions?.filter(item => {
        const matchesName = item?.stock?.name
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        return matchesName;
      });
      setSearch(searchText);
      setSearchResultTransactions(filtered);
    } else {
      setSearchResultTransactions(filterTransactions);
      setSearch(searchText);
    }
  };

  const portfolioRenderItem = ({item}: {item: TransactionsResponse}) => {
    const onSellStcok = () => {
       dispatch(storeSingleStockData(item))
      navigation.navigate(RouteKeys.SELLSTOCKSSCREEN)
    };

    return (
      <PortfolioMolecule
        item={item}
        onSellStcok={onSellStcok}
        filterRoundLevel={filterRoundLevelData}
      />
    );
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
      <GameHeaderMolecule
        p1={'Name'}
        p2={'Qty'}
        p3={'Buying Price'}
        p4={'Current Price'}
      />
      <View>
        <FlatList
          data={
            searchResultTransactions?.length ? searchResultTransactions : []
          }
          renderItem={portfolioRenderItem}
          keyExtractor={item => item?.id?.toString()}
          contentContainerStyle={{rowGap: 10}}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
