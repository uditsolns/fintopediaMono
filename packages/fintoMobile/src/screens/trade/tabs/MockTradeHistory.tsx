import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import GameHeaderMolecule from '@src/components/molecules/GameHeaderMolecule/GameHeaderMolecule';
import SearchInputAtom from '@src/components/SearchInputAtom';
import { commonStyle } from '@shared/src/commonStyle';
import { mScale } from '@shared/src/theme/metrics';
import MockTradeHistoryMolecule from '@src/components/molecules/MockTradeHistoryMolecule/MockTradeHistoryMolecule';

export default function MockTradeHistory() {
  const navigation = useNavigation();
  const historyRenderItem = ({item}: {item: any}) => (
    <MockTradeHistoryMolecule item={item} />
  );
  return (
    <View style={[commonStyle.container,{marginTop:mScale.base}]}>
      <View style={{width: '100%'}}>
        <SearchInputAtom
          isRefreshIconVisible={true}
          onPress={() => {
            console.log('hello refresh');
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
          data={[...Array(7)]}
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
