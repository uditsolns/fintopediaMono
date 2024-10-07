import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { commonStyle } from '@shared/src/commonStyle';
import { mScale } from '@shared/src/theme/metrics';
import { colorPresets } from '@shared/src/theme/color';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import PreviousRoundMolecule from '@src/components/molecules/PreviousRoundMolecule/PreviousRoundMolecule';
import SearchInputAtom from '@src/components/SearchInputAtom';
import { useAppDispatch, useAppSelector } from '@shared/src/provider/store/types/storeTypes';



export default function PreviousRoundPrice() {
  const dispatch = useAppDispatch();
  const {filterRoundLevelData, singleRoundLevel} = useAppSelector(
    state => state.roundLevel,
  );
  const previousRoundRenderItem = ({item}:{item:any}) => (
    <PreviousRoundMolecule item={item} />
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
          style={{fontWeight: '500',color:colorPresets.GRAY}}
          numberOfLines={1}
        />
        <TextAtom
          text={'Price'}
          preset="medium"
          style={{fontWeight: '500',color:colorPresets.GRAY}}
          numberOfLines={1}
        />
      </View>
      <View>
        <FlatList
          data={
            [...Array(5)]
          }
          renderItem={previousRoundRenderItem}
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
