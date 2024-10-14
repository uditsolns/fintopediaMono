import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import HistoryMolecule from '@src/components/molecules/HistoryMolecule/HistoryMolecule';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {Images} from '@shared/src/assets';
import GameHeaderMolecule from '@src/components/molecules/GameHeaderMolecule/GameHeaderMolecule';
import SearchInputAtom from '@src/components/SearchInputAtom';
import { commonStyle } from '@shared/src/commonStyle';
import { mScale } from '@shared/src/theme/metrics';

export default function History() {
  const navigation = useNavigation();
  const historyRenderItem = ({item}: {item: any}) => (
    <HistoryMolecule item={item} />
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
