import { useNavigation } from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import HeaderLeftMolecule from '@src/components/Header/HeaderLeftMolecule';
import CourseMolecule from '@src/components/molecules/CourseMolecule/CourseMolecule';
import TagsAtom from '@src/components/TagsAtom';
import { ViewAll } from '@src/components/ViewAll/ViewAll';
import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import { CategoriesArr } from '../auth/Signup';
import SortbyAtom from '@src/components/SortbyAtom';
import { RouteKeys } from '@src/navigation/RouteKeys';

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}) => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <View style={{paddingLeft: mScale.base,paddingRight:mScale.md}}>
        <CourseMolecule item={item} />
      </View>
    );
  };
  return (
    <GradientTemplate style={{paddingHorizontal: 0, paddingBottom: 0}}>
      <View
        style={[
          commonStyle.flexSpaceBetween,
          {paddingHorizontal: mScale.base},
        ]}>
        <View>
          <HeaderLeftMolecule />
        </View>
        <View style={{width: WINDOW_WIDTH * 0.8}}>
          <InputAtom
            shape="square"
            placeholder="Search courses"
            rightIcon={
              <Images.SVG.Search width={22} color={colorPresets.GRAY} />
            }
            autoCapitalize="none"
            style={{width: WINDOW_WIDTH}}
          />
        </View>
      </View>
      <FlatList
        data={[...Array(5)]}
        renderItem={renderItem}
        contentContainerStyle={{rowGap: mScale.base, paddingBottom: mScale.lg}}
        ListHeaderComponent={
          <View style={{marginTop: mScale.md,paddingLeft: mScale.base,paddingRight:mScale.md}}>
            <View style={[commonStyle.flexStart]}>
              <TextAtom preset="heading3" text={'Finance Course'} />
              <TextAtom
                preset="large"
                text={`(1,235)`}
                style={{color:colorPresets.GRAY,marginStart: mScale.sm}}
              />
            </View>
            <View
              style={[
                commonStyle.flexSpaceBetween,
                {marginVertical: mScale.base},
              ]}>
              <SortbyAtom
                sortByTitle="Sort by"
                title="Most Popular"
                iconName={'chevron'}
                onPress={() => {
                  navigation.navigate(RouteKeys.FILTERBYCOURSESCREEN);
                }}
              />
              <SortbyAtom
                sortByTitle="Filter by"
                title="Accounting and bookkeeping"
                iconName={'filter'}
                onPress={() => {
                  navigation.navigate(RouteKeys.FILTERBYCOURSESCREEN);
                }}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={{marginTop: mScale.md, paddingLeft: mScale.base,paddingRight:mScale.md}}>
            <ViewAll
              title="Top Searches"
              visible={false}
              paddingHorizontal={0}
            />
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', gap: mScale.md}}>
              {CategoriesArr.map((data, index) => {
                return(
                  <TagsAtom title={data?.name} key={index} />
                )
              })}
            </View>
          </View>
        }
      />
    </GradientTemplate>
  );
};
