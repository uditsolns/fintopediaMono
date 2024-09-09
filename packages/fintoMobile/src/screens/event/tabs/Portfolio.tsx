import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {Images} from '@shared/src/assets';
import GameHeaderMolecule from '@src/components/molecules/GameHeaderMolecule/GameHeaderMolecule';
import PortfolioMolecule from '@src/components/molecules/PortfolioMolecule/PortfolioMolecule';
import SearchInputAtom from '@src/components/SearchInputAtom';
import { commonStyle } from '@shared/src/commonStyle';
import { mScale } from '@shared/src/theme/metrics';
import { RouteKeys } from '@src/navigation/RouteKeys';

export default function Portfolio() {
  const navigation = useNavigation();

  const portfolioRenderItem = ({item}: {item: any}) => {
    const onSellStcok = () => {
      let id = item?.id;
      navigation.navigate(RouteKeys.SELLSTOCKSSCREEN)
    };

    return <PortfolioMolecule item={item} onSellStcok={onSellStcok} />;
  };
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
        p3={'Buying Price'}
        p4={'Current Price'}
      />
      <View>
        <FlatList
          data={[...Array(10)]}
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
