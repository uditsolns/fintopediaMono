import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {mScale} from '@shared/src/theme/metrics';
import Dropdown from '@src/components/Dropdown/Dropdown';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import React from 'react';
import {FlatList, TextStyle, View} from 'react-native';
import {CategoriesArr} from '../auth/Signup';
import {colorPresets} from '@shared/src/theme/color';
import GroupRadioButton from '@src/components/GroupRadioButton';

const options = [
  {label: 'Beginner', value: 'beginner'},
  {label: 'Intermediate', value: 'intermediate'},
  {label: 'Pro', value: 'pro'},
];

interface DontKnowWhereToStartProps {}
export const DontKnowWhereToStart: React.FunctionComponent<
  DontKnowWhereToStartProps
> = () => {
  const innerCategoriesRenderItem = ({item}) => {
    return <PopularCourseMolecule item={item} />;
  };

  return (
    <GradientTemplate style={{paddingBottom: 0, paddingHorizontal: 0}}>
      <View style={{paddingHorizontal: mScale.base}}>
        <HeaderLeftMolecule />
      </View>
      <ScrollViewAtom>
        <View>
          <View style={{paddingHorizontal: mScale.base}}>
            <TextAtom
              text={`Don’t know where\nto start?`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={
                'Create screens directly in Method or add your images from Sketch or Figma. You can even sync designs from your cloud storage!'
              }
              preset="medium"
              style={
                {
                  textAlign: 'center',
                  marginTop: mScale.base,
                  marginBottom: mScale.lg2,
                } as TextStyle
              }
            />
            <Dropdown
              dropdownItemArr={CategoriesArr}
              itemLabelField="name"
              onSelect={item => {
                console.log(item);
              }}
              placeholder={'Select category'}
              dropdownBg="#121622"
              dropdownTextColor={colorPresets.CTA}
              textColor={colorPresets.CTA}
            />
            <View style={{marginVertical: mScale.base}}>
              <GroupRadioButton
                options={options}
                onSelect={item => {
                  console.log(item);
                }}
                selectedValue="beginner"
              />
            </View>
            {/* <SmallButtonAtom btnTitle={'Let’s go'} preset={'mediumBold'} /> */}
            <View style={{marginTop: mScale.xxl}}>
              <TextAtom
                text={`Become a Finance Manager\n in 3 months`}
                preset="heading2"
                style={{textAlign: 'center'}}
              />
            </View>
          </View>
          <View
            style={{paddingLeft: mScale.base, paddingVertical: mScale.base}}>
            <FlatList
              data={[...Array(5)]}
              renderItem={innerCategoriesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
};
