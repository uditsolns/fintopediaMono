import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {commonStyle} from '@shared/src/commonStyle';
import {useNavigation} from '@react-navigation/native';
import SeparatorAtom from '@src/components/SeperatorAtom';
import SearchInputAtom from '@src/components/SearchInputAtom';
import MockTradeMolecule from '@src/components/molecules/MockTradeMolecule/MockTradeMolecule';
import MockPopupAtom from '@src/components/Popup/MockPopupAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';

export default function MockTradeTrade() {
  const navigation = useNavigation();
  const [popupVisible, setPopupVisible] = React.useState(false);

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {};

  const stockDataRenderItem = ({item}: {item: any}) => {
    return (
      <MockTradeMolecule
        item={item}
        onBuyStcok={() => {
          setPopupVisible(true);
        }}
      />
    );
  };

  const onSearch = () => {};
  return (
    <View style={[commonStyle.container, {marginTop: mScale.base}]}>
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
          renderItem={stockDataRenderItem}
          keyExtractor={item => item?.id?.toString()}
          contentContainerStyle={{rowGap: 10}}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <SeparatorAtom
              style={{marginHorizontal: 0, marginTop: mScale.md}}
            />
          )}
        />
      </View>
      <MockPopupAtom
        visible={popupVisible}
        onBuyStock={() => {
          navigation.navigate(RouteKeys.MOCKTRADEBUYSTOCKS);
          setPopupVisible(false);
        }}
        onSellStock={() => {
          navigation.navigate(RouteKeys.MOCKTRADESELLSTOCKS);
          setPopupVisible(false);
        }}
        onClose={() => {
          setPopupVisible(false);
        }}
      />
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
