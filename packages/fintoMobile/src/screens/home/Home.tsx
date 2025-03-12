import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {
  storeSingleCourse,
  storeVideoUrl,
} from '@shared/src/provider/store/reducers/courses.reducer';
import {storeSingleOngoingCourse} from '@shared/src/provider/store/reducers/ongoing.course.reducer';
import {
  createCourseCart,
  getCourseCart,
} from '@shared/src/provider/store/services/CourseCart.service';
import {getCourses} from '@shared/src/provider/store/services/courses.service';
import {getOngoingCourse} from '@shared/src/provider/store/services/ongoing-course.service';
import {getOngoingCourseStatus} from '@shared/src/provider/store/services/ongoing-courses-status.service';
import {getUserById} from '@shared/src/provider/store/services/user.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CategoriesResponse} from '@shared/src/utils/types/categories';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {OngoingCoursesResponse} from '@shared/src/utils/types/ongoing-course';
import {OngoingCoursesStatusResponse} from '@shared/src/utils/types/ongoing-courses-status';
import {UserCourseHistoryResponse} from '@shared/src/utils/types/UserCourseHistory';
import {isInCart} from '@src/components/Calculate';
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
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  const {user_course_history, loading: user_course_history_loading} =
    useAppSelector(state => state.userCourseHistory);
  const {ongoing_courses, loading: ongoing_courses_loading} = useAppSelector(
    state => state.ongoingCourse,
  );
  const {ongoing_courses_status, loading: ongoingCourseStatusLoading} =
    useAppSelector(state => state.ongoingCourseStatus);
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
    let id = `${auth?.user?.id}`;
    setRefreshLoading(true);
    dispatch(getUserById({id}));
    dispatch(getBanner());
    dispatch(getCategories());
    dispatch(getCourses());
    dispatch(getCourseCart());
    dispatch(getOngoingCourse());
    dispatch(getOngoingCourseStatus());
    setRefreshLoading(false);
  };

  React.useEffect(() => {
    if (courses?.length) {
      setFilterCourses(courses);
    }
  }, [courses]);

  const continueLearningRenderItem = ({
    item,
  }: {
    item: OngoingCoursesStatusResponse;
  }) => {
    return (
      <ContinueLearningMolecule
        item={item?.ongoing}
        onPress={() => {
          // if (item?.course?.course_video_embed) {
          //   dispatch(storeVideoUrl(item?.course?.course_video_embed));
          // }
          dispatch(storeSingleOngoingCourse(item?.ongoing));
          navigation.navigate(RouteKeys.AFTERENROLLINGCOURSEDETAILSSCREEN, {
            id: item?.ongoing?.course_id,
          });
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
  const innerCategoriesCoursesRenderItem = ({
    item,
  }: {
    item: CoursesResponse;
  }) => {
    return (
      <PopularCourseMolecule
        item={item}
        onView={() => {
          if (item?.course_video_embed) {
            dispatch(storeVideoUrl(item?.course_video_embed));
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
    );
  };

  return (
    <GradientTemplate
      style={{
        paddingHorizontal: 0,
        paddingBottom: 0,
        paddingTop: moderateScale(60),
      }}>
      {bannerLoading?.banner ||
      categoriesLoading?.categories ||
      coursesLoading?.courses ||
      courseCartLoading?.courseCart ||
      courseCartLoading.create ||
      user_course_history_loading?.user_course_history ||
      ongoing_courses_loading?.ongoing_courses ? (
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
        <View style={{paddingTop: moderateScale(22)}}>
          <CarouselAtom data={banner?.length ? banner : []} />
        </View>
        {auth?.token && ongoing_courses_status?.length ? (
          <View style={{marginTop: moderateScale(32)}}>
            <ViewAll title="Continue Learning" visible={false} />
            <View style={{paddingLeft: mScale.base, marginTop: mScale.lg}}>
              <FlatList
                data={
                  ongoing_courses_status?.length ? ongoing_courses_status : []
                }
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
        <View style={{marginTop: moderateScale(38)}}>
          {categories?.length ? (
            <>
              <ViewAll
                title="All Categories"
                onPress={() => {
                  navigation.navigate(RouteKeys.COURSECATEGORYSCREEN);
                }}
              />
              <View style={{paddingLeft: mScale.base, marginTop: mScale.lg}}>
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
                            borderTopWidth: 0.5,
                            borderLeftWidth: 0.35,
                            borderRightWidth: 1,
                            borderBottomWidth: 0.4,
                            borderColor: '#B8BCCB',
                          },
                        ]}
                        onPress={() => {
                          setCategoriesSelected('all');
                          setFilterCourses(courses);
                        }}>
                        <TextAtom
                          text={'All'}
                          preset="smallBold"
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
              data={
                courses?.length
                  ? courses?.filter(el => el?.is_popular === 1)
                  : []
              }
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
