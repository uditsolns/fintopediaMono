import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {colorPresets} from '@shared/src/theme/color';
import {useNavigation} from '@react-navigation/native';
import TradeMolecule from '@src/components/molecules/TradeMolecule/TradeMolecule';
import StocksMolecule from '@src/components/molecules/StocksMolecule/StocksMolecule';
import SearchInputAtom from '@src/components/SearchInputAtom';
import { RouteKeys } from '@src/navigation/RouteKeys';

export default function Trade() {
  const navigation = useNavigation();

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {};

  const stockRenderItem = ({item}: {item: any}) => {
    const handlePress = () => {
     
    };
    return <StocksMolecule item={item} onPress={handlePress} />;
  };

  const stockDataRenderItem = ({item}: {item: any}) => {
    return <TradeMolecule item={item} onBuyStcok={()=>{
      navigation.navigate(RouteKeys.BUYSTOCKSSCREEN)
    }} />;
  };

  const onSearch = () => {};
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
      <View>
        <FlatList
          data={[...Array(10)]}
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
                    backgroundColor: true ? '#545664' : 'transparent',
                    borderRadius: true ? 4 : 0,
                    borderWidth: true ? 1 : 0,
                    borderColor: true ? '#B8BCCB' : 'transparent',
                    paddingHorizontal: true ? mScale.base : 0,
                  },
                ]}
                onPress={() => {}}>
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
          data={[...Array(10)]}
          renderItem={stockDataRenderItem}
          keyExtractor={item => item?.id?.toString()}
          contentContainerStyle={{rowGap: 10}}
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
