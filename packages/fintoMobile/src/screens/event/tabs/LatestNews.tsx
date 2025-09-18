import {FlatList, RefreshControl, View} from 'react-native';
import * as React from 'react';
import LatestNewsMolecule from '@src/components/molecules/LatestNewsMolecule/LatestNewsMolecule';
import LoaderAtom from '@src/components/LoaderAtom';
import {mScale} from '@shared/src/theme/metrics';
import {commonStyle} from '@shared/src/commonStyle';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {getNews} from '@shared/src/provider/store/services/news.service';
import {NewsResponse} from '@shared/src/utils/types/news';

export default function LatestNews() {
  const dispatch = useAppDispatch();
  const {news, loading} = useAppSelector(state => state.news);
  const {filterRoundLevelData, singleRoundLevel} = useAppSelector(
    state => state.roundLevel,
  );
  
  const [refreshLoading, setRefreshLoading] = React.useState(false);
  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getNews());
    setRefreshLoading(false);
  };

  const renderItem = ({item}: {item: NewsResponse}) => (
    <LatestNewsMolecule item={item} itemWidth={undefined} />
  );
  const renderFooter = () =>
    loading.news ? <LoaderAtom size="large" /> : null;

  return (
    <View style={[commonStyle.container, {marginTop: mScale.base}]}>
      <FlatList
        data={
          news?.length
            ? news.filter(e3 => e3.set_id == filterRoundLevelData?.set_id)
            : []
        }
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{rowGap: mScale.base}}
      />
    </View>
  );
}
