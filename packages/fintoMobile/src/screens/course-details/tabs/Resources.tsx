import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { GradientTemplate } from '@shared/src/components/templates/GradientTemplate';
import { moderateScale, mScale } from '@shared/src/theme/metrics';
import PdfMolecule from '@src/components/molecules/PdfMolecule/PdfMolecule';
import React from 'react';
import { FlatList, View } from 'react-native';
interface ResourcesProps {}
export const Resources: React.FunctionComponent<ResourcesProps> = () => {
  const renderItem = ({item}:{item:any}) => {
    return <PdfMolecule item={item} />;
  };
  return (
    <View style={{flex: 1,flexGrow:1, padding: mScale.base,paddingBottom:0,zIndex:1}}>
      <View>
        <TextAtom text={'Resources'} preset="heading4" />
        <TextAtom
          text="Upload your completed project in pdf or docx format. After submitting, mentor will give feedback in 2-3 days"
          preset="medium"
          style={{marginVertical: mScale.md,color:'#D5D5D9'}}
        />
        <View style={{marginVertical: mScale.base}}>
          <FlatList
            data={[...Array(15)]}
            renderItem={renderItem}
            contentContainerStyle={{
              rowGap: mScale.base,
              paddingBottom: moderateScale(150),
            }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
        </View>
      </View>
    </View>
  );
};
