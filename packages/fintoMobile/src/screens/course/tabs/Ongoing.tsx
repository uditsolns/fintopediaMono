import { mScale } from '@shared/src/theme/metrics';
import GetStarted from '@src/components/GetStarted';
import OngoingMolecule from '@src/components/molecules/OngoingMolecule/OngoingMolecule';
import React from 'react';
import { FlatList, View } from 'react-native';
interface OngoingInterface {}

const Ongoing: React.FunctionComponent<OngoingInterface> = () => {
  const renderItem = ({item}:{item:any}) => {
    return <OngoingMolecule item={item} />;
  };
  return (
    <View style={{flex:1,paddingTop:mScale.base}}>
      <View style={{alignSelf: 'center', paddingLeft: mScale.base}}>
        <FlatList
          data={[...Array(10)]}
          renderItem={renderItem}
          contentContainerStyle={{
            rowGap: mScale.base,
            paddingBottom: mScale.base,
          }}
          ListFooterComponent={
            <View
              style={{
                paddingRight: mScale.base,
              }}>
              <GetStarted
                onPress={() => {
                  console.log('get started');
                }}
                btnTitle={'Redeem now'}
                title={'Fintopedia Credits: 500'}
                titleDesc={'You can use your credits to buy your next course!'}
              />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default Ongoing;
