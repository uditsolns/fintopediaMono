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
import {FlatList, View} from 'react-native';
import SortbyAtom from '@src/components/SortbyAtom';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {NavType} from '@src/navigation/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {postSeachCourses} from '@shared/src/provider/store/services/search-courses.service';
import {FilterModal} from '@src/components/Popup/FilterModal';
import LoaderAtom from '@src/components/LoaderAtom';
import {getRandomItem, isInCart} from '@src/components/Calculate';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';
import {createCourseCart} from '@shared/src/provider/store/services/CourseCart.service';

interface SearchProps extends NavType<'Search'> {}

export const Search: React.FC<SearchProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {categories} = useAppSelector(state => state.categories);
  const {courses, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
  const {search_courses, loading: search_courses_loading} = useAppSelector(
    state => state.searchCourses,
  );
  const [filterCourses, setFilterCourses] = React.useState<CoursesResponse[]>(
    search_courses?.length ? search_courses : [],
  );
  const [search, setSearch] = React.useState<string>('');
  const [isFullPageModalVisible, setIsFullPageModalVisible] =
    React.useState(false);
  const [sortByRating, setSortByRating] = React.useState<string | null>('');
  const [filterByCourse, setFilterByCourse] = React.useState<string | null>('');
  const [sortBySelectedVisible, setSortBySelectedVisible] =
    React.useState<boolean>(false);
  const {
    setVideoPlayerBeforePurchaseUrl,
    setPlayVideoStartBeforePurchaseLoading,
  } = useVideoPlayerContext();
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  const {auth} = useAppSelector(state => state.auth);

  React.useEffect(() => {
    let params = {
      name: '',
      sale_price: '',
      category_name: '',
      min_sale_price: '',
      max_sale_price: '',
      course_language: '',
      sort_rating: 'desc',
    };
    dispatch(
      postSeachCourses({
        params,
        onSuccess(data) {},
        onError(error) {
          console.log(error);
        },
      }),
    );
  }, []);

  React.useEffect(() => {
    if (search_courses?.length) {
      setFilterCourses(search_courses);
    }
  }, [search_courses]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{width: WINDOW_WIDTH * 0.8, height: 100, marginTop: 30}}>
            <InputAtom
              shape="square"
              placeholder="Search courses"
              rightIcon={
                <Images.SVG.Search width={22} color={colorPresets.GRAY} />
              }
              autoCapitalize="none"
              style={{width: WINDOW_WIDTH, height: 10}}
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
      const filtered = search_courses?.filter(item => {
        const matchesName = item?.name
          ?.toLowerCase()
          .includes(searchText.toLowerCase());
        return matchesName;
      });
      setSearch(searchText);
      setFilterCourses(filtered);
    } else {
      setFilterCourses(search_courses);
      setSearch(searchText);
    }
  };

  const renderItem = ({item}: {item: CoursesResponse}) => {
    return (
      <View style={{paddingLeft: mScale.base, paddingRight: mScale.md}}>
        <CourseMolecule
          item={item}
          onView={() => {
            if (item?.course_video_embed) {
              setVideoPlayerBeforePurchaseUrl(item?.course_video_embed);
              setPlayVideoStartBeforePurchaseLoading(false);
            }
            navigation.navigate(RouteKeys.BEFOREENROLLINGCOURSEDETAILSSCREEN, {
              id: item?.id,
            });
          }}
          onPress={async () => {
            let params = {
              user_id: Number(auth?.user?.id),
              course_id: Number(item?.id),
              status: '1',
            };
            if (isInCart(courseCart, item?.id)) {
              navigation.navigate(RouteKeys.CARTSCREEN);
            } else {
              await dispatch(
                createCourseCart({
                  params,
                  onSuccess: data => {
                    navigation.navigate(RouteKeys.CARTSCREEN);
                  },
                  onError: err => {},
                }),
              ).unwrap();
            }
          }}
        />
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
      {search_courses_loading?.search_courses ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null}
      <FlatList
        data={filterCourses?.length ? filterCourses : []}
        renderItem={renderItem}
        contentContainerStyle={{gap: mScale.lg1, paddingBottom: mScale.lg}}
        ListHeaderComponent={
          <View
            style={{
              marginTop: mScale.md,
              paddingLeft: mScale.base,
              paddingRight: mScale.md,
            }}>
            {filterByCourse ? (
              <View style={[commonStyle.flexStart]}>
                <TextAtom preset="heading3" text={filterByCourse || ''} />
                <TextAtom
                  preset="large"
                  text={
                    search_courses?.length
                      ? `(${search_courses?.length || ''})`
                      : ''
                  }
                  style={{color: colorPresets.GRAY, marginStart: mScale.sm}}
                />
              </View>
            ) : null}
            <View
              style={[
                commonStyle.flexSpaceBetween,
                {marginVertical: mScale.base},
              ]}>
              <SortbyAtom
                sortByTitle="Sort by"
                title={sortByRating || 'Select'}
                iconName={'chevron'}
                onPress={() => {
                  setSortBySelectedVisible(true);
                  setIsFullPageModalVisible(true);
                }}
              />
              <SortbyAtom
                sortByTitle="Filter by"
                title={filterByCourse || 'Select'}
                iconName={'filter'}
                onPress={() => {
                  setSortBySelectedVisible(false);
                  setIsFullPageModalVisible(true);
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
                  marginTop: mScale.xl,
                  paddingLeft: mScale.base,
                  paddingRight: mScale.md,
                }}>
                <ViewAll
                  title="Top searches"
                  visible={false}
                  preset="heading2"
                />
                <View style={{paddingLeft: mScale.base, marginTop: mScale.xl}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: mScale.lg3,
                    }}>
                    {getRandomItem(categories)
                      ?.slice(0, 5)
                      ?.map((data, index) => (
                        <TagsAtom title={data?.category_name} key={index} />
                      ))}
                  </View>
                </View>
              </View>
            )}
          </>
        }
      />
      <FilterModal
        isFullPageModalVisible={isFullPageModalVisible}
        onClose={() => {
          setIsFullPageModalVisible(!isFullPageModalVisible);
        }}
        bodyPayload={(payload: any) => {
          console.log(payload.rating?.rating);
          setSortByRating(payload?.rating?.rating);
          setFilterByCourse(payload?.categories?.category_name);
          let [minSal, maxSal] = payload?.price?.price
            ? payload?.price?.price?.split(' - ')?.map(Number)
            : '';
          let params = {
            name: '',
            sale_price: '',
            category_name: payload?.categories?.category_name || '',
            min_sale_price: minSal || '',
            max_sale_price: maxSal || '',
            course_language: '',
            // sort_rating: sortBySelectedVisible ? payload?.rating?.value : '',
            sort_rating: payload?.rating?.value,
          };
          console.log(JSON.stringify(params));
          dispatch(
            postSeachCourses({
              params,
              onSuccess(data) {
                // setFilterByCourse(null);
                // setSortByRating(null)
              },
              onError(error) {
                console.log(error);
              },
            }),
          );
          setIsFullPageModalVisible(false);
        }}
        isRatingVisible={sortBySelectedVisible}
      />
    </GradientTemplate>
  );
};
