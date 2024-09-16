import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import Dropdown from '@src/components/Dropdown/Dropdown';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import TagsAtom from '@src/components/TagsAtom';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import * as React from 'react';
import {FlatList, StyleSheet, View, ListRenderItem} from 'react-native';

interface Category {
  id: number;
  name: string;
}

export const CategoriesArr: Category[] = [
  {
    id: 1,
    name: 'Investment strategy',
  },
  {
    id: 2,
    name: 'Finance',
  },
  {
    id: 3,
    name: 'Mutual funds',
  },
  {
    id: 4,
    name: 'Stock trading',
  },
  {
    id: 5,
    name: 'Investment',
  },
  {
    id: 6,
    name: 'Money Market',
  },
];

export default function CourseCategory() {
  const innerCategoriesRenderItem: ListRenderItem<any> = ({item}) => {
    return <PopularCourseMolecule item={item} />;
  };

  return (
    <GradientTemplate style={{paddingHorizontal: 0, paddingBottom: 0}}>
      <View style={{paddingHorizontal: mScale.base}}>
        <HeaderLeftMolecule />
      </View>
      <ScrollViewAtom nestedScrollEnabled={true}>
        <View style={{marginBottom: mScale.xs}}>
          <ViewAll title="All Categories" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', gap: mScale.md}}>
              {CategoriesArr.map((data, index) => (
                <TagsAtom title={data?.name} key={index} />
              ))}
            </View>
          </View>
        </View>
        <View
          style={[
            {
              marginVertical: mScale.xl,
              flex: 1,
              backgroundColor: 'transparent',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colorPresets.GRAY3,
            },
          ]}>
          <View style={{flex: 1, padding: mScale.xl}}>
            <TextAtom
              text={'Don’t know where to start?'}
              preset="heading3"
              style={{textAlign: 'center', marginBottom: mScale.md}}
            />
            <TextAtom
              text={
                'Create screens directly in Method or add your images from Sketch or Figma.'
              }
              preset="medium"
              style={{textAlign: 'center', marginBottom: mScale.lg}}
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
          </View>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Popular Courses" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
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
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Previously Viewed Courses" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
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
}

const styles = StyleSheet.create({});
