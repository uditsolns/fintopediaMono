import { commonStyle } from '@shared/src/commonStyle';
import { GradientTemplate } from '@shared/src/components/templates/GradientTemplate';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import LoaderAtom from '@src/components/LoaderAtom';
import CertificationsMolecule from '@src/components/molecules/CertificationsMolecule/CertificationsMolecule';
import {FlatList, View} from 'react-native';

interface CertificationsProps {}

export const Certifications: React.FC<CertificationsProps> = ({}) => {
  const renderItem = ({item}:{item:any}) => {
    return <CertificationsMolecule item={item} />;
  };
  return (
    <GradientTemplate style={{paddingBottom:0,paddingTop:moderateScale(70)}}>
      {false ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <FlatList
        data={[...Array(10)]}
        renderItem={renderItem}
        contentContainerStyle={{rowGap: mScale.base,paddingBottom:mScale.base}}
      />
    </GradientTemplate>
  );
};
