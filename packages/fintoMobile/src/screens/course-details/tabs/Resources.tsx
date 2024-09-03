import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { GradientTemplate } from '@shared/src/components/templates/GradientTemplate';
import { mScale } from '@shared/src/theme/metrics';
import PdfMolecule from '@src/components/molecules/PdfMolecule/PdfMolecule';
import React from 'react';
import { FlatList, View } from 'react-native';
interface ResourcesProps {}
export const Resources: React.FunctionComponent<ResourcesProps> = () => {
  const renderItem = ({item}:{item:any}) => {
    return <PdfMolecule item={item} />;
  };
  return (
    <GradientTemplate style={{paddingBottom:0,}} >
      <View>
        <TextAtom text={'Resources'} preset="heading4" />
        <TextAtom
          text="Upload your completed project in pdf or docx format. After submitting, mentor will give feedback in 2-3 days"
          preset="medium"
          style={{marginVertical: mScale.md,color:'#D5D5D9'}}
        />
        <View style={{marginVertical: mScale.base}}>
          <FlatList
            data={[...Array(3)]}
            renderItem={renderItem}
            contentContainerStyle={{
              rowGap: mScale.base,
              paddingBottom: mScale.base,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </GradientTemplate>
  );
};
