import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import HistoryMolecule from '@src/components/molecules/HistoryMolecule/HistoryMolecule';
import GameHeaderMolecule from '@src/components/molecules/GameHeaderMolecule/GameHeaderMolecule';
import SearchInputAtom from '@src/components/SearchInputAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {mScale} from '@shared/src/theme/metrics';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {TransactionsResponse} from '@shared/src/utils/types/transactions';
import {getTransactions} from '@shared/src/provider/store/services/transactions.service';

export default function History() {
  const dispatch = useAppDispatch();
  const {transactions} = useAppSelector(state => state.transactions);

  const {auth} = useAppSelector(state => state.auth);
  const {singleGame} = useAppSelector(state => state.games);

  const [filterTransactions, setFilterTransactions] = React.useState<
    TransactionsResponse[]
  >(transactions || []);
  const [searchResultTransactions, setSearchResultTransactions] =
    React.useState<TransactionsResponse[]>(transactions || []);

  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    if (transactions) {
      const data = transactions?.filter(item => {
        return (
          item?.user_id == auth?.user?.id && item?.game_id == singleGame?.id
        );
      });
      setFilterTransactions(data);
      setSearchResultTransactions(data);
    }
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
      setSearchResultTransactions(transactions);
      setSearch(searchText);
    }
  };

  const onRefresh = () => {
    dispatch(getTransactions());
  };

  const historyRenderItem = ({item}: {item: TransactionsResponse}) => (
    <HistoryMolecule item={item} />
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
      <GameHeaderMolecule
        p1={'Name'}
        p2={'Qty'}
        p3={'Total Price'}
        p4={'Order Type'}
      />
      <View>
        <FlatList
          data={
            searchResultTransactions?.length ? searchResultTransactions : []
          }
          renderItem={historyRenderItem}
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
