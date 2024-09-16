import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import LatestNewsMolecule from '@src/components/molecules/LatestNewsMolecule/LatestNewsMolecule';
import LoaderAtom from '@src/components/LoaderAtom';
import { GradientTemplate } from '@shared/src/components/templates/GradientTemplate';
import { mScale } from '@shared/src/theme/metrics';
import { commonStyle } from '@shared/src/commonStyle';

export default function LatestNews() {
  const navigation = useNavigation();

  const [refreshLoading, setRefreshLoading] = React.useState(false);
  const onRefresh = () =>{

  }
 

  const renderItem = ({item}:{item:any}) => (
    <LatestNewsMolecule item={item} itemWidth={undefined} />
  );
  const renderFooter = () => (false ? <LoaderAtom size="large" /> : null);

  return (
    <View style={[commonStyle.container,{marginTop:mScale.base}]}>
      <FlatList
        data={
          [...Array(5)]
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

