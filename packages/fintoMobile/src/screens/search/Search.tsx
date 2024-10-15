import {useNavigation} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import CourseMolecule from '@src/components/molecules/CourseMolecule/CourseMolecule';
import TagsAtom from '@src/components/TagsAtom';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import {CategoriesArr} from '../auth/Signup';
import SortbyAtom from '@src/components/SortbyAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {NavType} from '@src/navigation/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';

interface SearchProps extends NavType<'Search'> {}

export const Search: React.FC<SearchProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {categories} = useAppSelector(state => state.categories);

  const {courses, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
  const [filterCourses, setFilterCourses] = React.useState<CoursesResponse[]>(
    courses?.length ? courses : [],
  );
  const [search, setSearch] = React.useState<string>('');

  React.useEffect(() => {
    if (courses?.length) {
      setFilterCourses(courses);
    }
  }, [courses]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{width: WINDOW_WIDTH * 0.8}}>
            <InputAtom
              shape="square"
              placeholder="Search courses"
              rightIcon={
                <Images.SVG.Search width={22} color={colorPresets.GRAY} />
              }
              autoCapitalize="none"
              style={{width: WINDOW_WIDTH}}
              value={search}
              onChangeText={text => filterSearchByStockName(text)}
            />
          </View>
        );
      },
    });
  }, [search]);

  const filterSearchByStockName = (searchText: string) => {
    if (searchText) {
      const filtered = courses?.filter(item => {
        const matchesName = item?.name
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        return matchesName;
      });
      setSearch(searchText);
      setFilterCourses(filtered);
    } else {
      setFilterCourses(courses);
      setSearch(searchText);
    }
  };

  const renderItem = ({item}: {item: CoursesResponse}) => {
    return (
      <View style={{paddingLeft: mScale.base, paddingRight: mScale.md}}>
        <CourseMolecule item={item} />
      </View>
    );
  };
  return (
    <GradientTemplate
      style={{
        paddingHorizontal: 0,
        paddingBottom: 0,
        paddingTop: moderateScale(75),
      }}>
      <FlatList
        data={filterCourses?.length ? filterCourses : []}
        renderItem={renderItem}
        contentContainerStyle={{rowGap: mScale.base, paddingBottom: mScale.lg}}
        ListHeaderComponent={
          <View
            style={{
              marginTop: mScale.md,
              paddingLeft: mScale.base,
              paddingRight: mScale.md,
            }}>
            <View style={[commonStyle.flexStart]}>
              <TextAtom preset="heading3" text={'Finance Course'} />
              <TextAtom
                preset="large"
                text={`(1,235)`}
                style={{color: colorPresets.GRAY, marginStart: mScale.sm}}
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
          <>
            {false && (
              <View
                style={{
                  marginTop: mScale.md,
                  paddingLeft: mScale.base,
                  paddingRight: mScale.md,
                }}>
                <ViewAll
                  title="Top Searches"
                  visible={false}
                  paddingHorizontal={0}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: mScale.md,
                  }}>
                  {categories?.map((data, index) => {
                    return <TagsAtom title={data?.category_name} key={index} />;
                  })}
                </View>
              </View>
            )}
          </>
        }
      />
    </GradientTemplate>
  );
};
