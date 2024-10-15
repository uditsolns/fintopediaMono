import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {getCourses} from '@shared/src/provider/store/services/courses.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CategoriesResponse} from '@shared/src/utils/types/categories';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import CarouselAtom from '@src/components/Carousel/CarouselAtom';
import GetStarted from '@src/components/GetStarted';
import Header from '@src/components/Header/Header';
import LoaderAtom from '@src/components/LoaderAtom';
import CategoriesMolecule from '@src/components/molecules/CategoriesMolecule/CategoriesMolecule';
import ContinueLearningMolecule from '@src/components/molecules/ContinueLearningMolecule/ContinueLearningMolecule';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import * as React from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {getBanner} from 'shared/src/provider/store/services/banner.service';
import {getCategories} from 'shared/src/provider/store/services/categories.service';

interface HomeProps extends NavType<'Home'> {}

export const Home: React.FC<HomeProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {banner, loading: bannerLoading} = useAppSelector(
    state => state.banner,
  ); 

  const {categories, loading: categoriesLoading} = useAppSelector(
    state => state.categories,
  );
  const {courses, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
  const [refreshLoading, setRefreshLoading] = React.useState(false);

  const [categoriesSelected, setCategoriesSelected] = React.useState<
    number | string
  >('all');

  const [filterCourses, setFilterCourses] = React.useState<CoursesResponse[]>(
    courses?.length ? courses : [],
  );

  React.useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getBanner());
    dispatch(getCategories());
    dispatch(getCourses());
    setRefreshLoading(false);
  };

  React.useEffect(() => {
    if (courses?.length) {
      setFilterCourses(courses);
    }
  }, [courses]);

  const continueLearningRenderItem = ({item}: {item: CoursesResponse}) => {
    return (
      <ContinueLearningMolecule
        item={item}
        onPress={() => {
          navigation.navigate(RouteKeys.AFTERENROLLINGCOURSEDETAILSSCREEN);
        }}
      />
    );
  };
  const categoriesRenderItem = ({item}: {item: CategoriesResponse}) => {
    return (
      <CategoriesMolecule
        item={item}
        categoriesSelectedId={categoriesSelected}
        onPress={id => {
          setCategoriesSelected(id);
          let filterCourseRes = courses?.filter(el => el?.category_id == id);
          setFilterCourses(filterCourseRes);
        }}
      />
    );
  };
  const innerCategoriesCoursesRenderItem = ({item}:{item:CoursesResponse}) => {
    return (
      <PopularCourseMolecule
        item={item}
        onPress={() => {
          navigation.navigate(RouteKeys.BEFOREENROLLINGCOURSEDETAILSSCREEN);
        }}
      />
    );
  };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => <View style={{flexDirection: 'row'}}></View>,
  //   });
  // });

  return (
    <GradientTemplate
      style={{
        paddingHorizontal: 0,
        paddingBottom: 0,
        paddingTop: moderateScale(60),
      }}>
      {bannerLoading?.banner ||
      categoriesLoading?.categories ||
      coursesLoading?.courses ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View> 
      ) : null}
      <ScrollViewAtom
        nestedScrollEnabled={true}
        style={{paddingBottom: moderateScale(100)}}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
        }>
        <View>
          <CarouselAtom data={banner?.length ? banner : []} />
        </View>
        {auth ? (
          <View>
            <ViewAll title="Continue Learning" visible={false} />
            <View style={{paddingLeft: mScale.base}}>
              <FlatList
                data={[...Array(5)]}
                renderItem={continueLearningRenderItem}
                horizontal={true}
                contentContainerStyle={{
                  columnGap: 20,
                  flexGrow: 1,
                  paddingEnd: mScale.lg,
                }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        ) : null}
        <View style={{marginVertical: mScale.xl}}>
          {categories?.length ? (
            <>
              <ViewAll title="All Categories" />
              <View style={{paddingLeft: mScale.base}}>
                <FlatList
                  data={categories?.length ? categories : []}
                  renderItem={categoriesRenderItem}
                  horizontal={true}
                  contentContainerStyle={{
                    columnGap: 20,
                    flexGrow: 1,
                    paddingEnd: mScale.lg,
                  }}
                  showsHorizontalScrollIndicator={false}
                  ListHeaderComponent={() => {
                    return (
                      <Pressable
                        style={[
                          styles.content,
                          categoriesSelected == 'all' && {
                            backgroundColor: '#545664',
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: '#B8BCCB',
                            paddingHorizontal: mScale.base,
                          },
                        ]}
                        onPress={() => {
                          setCategoriesSelected('all');
                          setFilterCourses(courses)
                        }}>
                        <TextAtom
                          text={'All'}
                          preset="titleBold"
                          style={styles.boldText}
                        />
                      </Pressable>
                    );
                  }}
                />
              </View>
            </>
          ) : null}
          <View style={{paddingLeft: mScale.base, marginTop: mScale.base}}>
            <FlatList
              data={filterCourses?.length ? filterCourses : []}
              renderItem={innerCategoriesCoursesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={[{marginVertical: mScale.xl, flex: 1}]}>
          <ImageBackground
            source={require('@shared/src/assets/img/quizBg.png')}
            style={{flex: 1, padding: mScale.xxl}}>
            <TextAtom
              text={'Navigate your financial journey, take the finance quiz'}
              preset="heading3"
              style={{textAlign: 'center', marginBottom: mScale.md}}
            />
            <TextAtom
              text={
                'Join 6000+ in discovering your financial strengths through our interactive quiz.'
              }
              preset="medium"
              style={{textAlign: 'center', marginBottom: mScale.lg}}
            />
            <ButtonAtom title="Attempt quiz" />
          </ImageBackground>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Popular Courses" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={courses?.length ? courses : []}
              renderItem={innerCategoriesCoursesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollViewAtom>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          paddingHorizontal: mScale.base,
          width: '100%',
        }}>
        <GetStarted
          onPress={() => {
            navigation.navigate(RouteKeys.DONTKNOWWHERETOSTARTSCREEN);
          }}
        />
      </View>
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: mScale.base,
    paddingVertical: mScale.md,
  } as ViewStyle,
  boldText: {
    fontWeight: '600',
  } as TextStyle,
});
