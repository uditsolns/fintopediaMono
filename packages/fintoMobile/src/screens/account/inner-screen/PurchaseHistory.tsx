import { commonStyle } from '@shared/src/commonStyle';
import { GradientTemplate } from '@shared/src/components/templates/GradientTemplate';
import { mScale } from '@shared/src/theme/metrics';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import LoaderAtom from '@src/components/LoaderAtom';
import PurchaseHistoryMolecule from '@src/components/molecules/PurchaseHistoryMolecule/PurchaseHistoryMolecule';
import {FlatList, Text, View} from 'react-native';

interface PurchaseHistoryProps {}

export const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({}) => {
  const renderItem = ({item}:{item:any}) => {
    return <PurchaseHistoryMolecule item={item} />;
  };
  return (
    <GradientTemplate style={{paddingBottom: 0}}>
      {false ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <HeaderLeftMolecule text={'Purchase history'} />
      <FlatList
        data={[...Array(10)]}
        renderItem={renderItem}
        contentContainerStyle={{rowGap: mScale.base,paddingBottom:mScale.base}}
        showsVerticalScrollIndicator={false}
      />
    </GradientTemplate>
  );
};
