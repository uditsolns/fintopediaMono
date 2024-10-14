import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LoaderAtom from '@src/components/LoaderAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {mScale} from '@shared/src/theme/metrics';
import LatestNewsMolecule from '@src/components/molecules/LatestNewsMolecule/LatestNewsMolecule';

interface MockSellStocksProps {}

export const MockSellStocks: React.FC<MockSellStocksProps> = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = React.useState('');
  const [totalPrice, setTotalPrice] = React.useState('');
  const [remarks, setRemarks] = React.useState('');

  const onEndEditing = (value: string) => {
   
  };

  const sellStocks = async () => {
    
  };

  const checkSingleGameFinish = () => {
   
  };

  const getAllRoundLevelGamesData = () => {
   
  };

  useFocusEffect(
    React.useCallback(() => {
      let interval = setInterval(() => {
       
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }, []),
  );

  const renderItem = ({item}: {item: any}) => (
    <LatestNewsMolecule item={item} itemWidth={'fullWidth'} />
  );

  return (
    <GradientTemplate>
      <>
        {false ? (
          <View style={commonStyle.fullPageLoading}>
            <LoaderAtom size={'large'} />
          </View>
        ) : null}
        <HeaderLeftMolecule text={'Adani Stock'} />
        <ScrollViewAtom>
          <View style={{marginBottom: mScale.base}}>
            <InputAtom
              shape="square"
              label={'Stock Current Price'}
              placeholder={'Stock Current Price'}
              value={`₹ 2,998`}
              editable={false}
            />
          </View>
          <View style={{marginBottom: mScale.base}}>
            <InputAtom
              shape="square"
              label={'Quantity'}
              placeholder={'Enter Quantity'}
              keyboardType="numeric"
            />
          </View>
          <View style={{marginBottom: mScale.base}}>
            <InputAtom
              shape="square"
              label={'Total Price'}
              placeholder={'Total Price'}
              keyboardType="numeric"
              editable={false}
            />
          </View>
          <View style={{marginBottom: mScale.base}}>
            <InputAtom
              shape="square"
              label={'Remark (optional)'}
              placeholder={'Enter Remark'}
              multiline={true}
            />
          </View>

          <ButtonAtom
            title={'Sell'}
            textPreset={'heading4'}
            onPress={sellStocks}
          />

          <View style={{marginTop:mScale.xxl}}>
            <TextAtom
              text={'Catch up with latest news'}
              preset="heading2"
              style={{marginVertical: mScale.md}}
            />
            <FlatList
              data={[...Array(5)]}
              renderItem={renderItem}
              keyExtractor={item => item?.id?.toString()}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
              contentContainerStyle={{
                columnGap: mScale.base,
                paddingBottom: mScale.lg,
              }}
              horizontal={true}
            />
          </View>
        </ScrollViewAtom>
      </>
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({});
