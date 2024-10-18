import {
  useRoute,
  RouteProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {CourseDetailsRouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {SceneMap, TabView} from 'react-native-tab-view';
import {CourseContent} from './tabs/CourseContent';
import {Overview} from './tabs/Overview';
import {Notes} from './tabs/Notes';
import {Reviews} from './tabs/Reviews';
import {LearningMode} from './tabs/LearningMode';
import {UploadProject} from './tabs/UploadProject';
import {Resources} from './tabs/Resources';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import Header from '@src/components/Header/Header';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {FlatList, SafeAreaView, ScrollView, View} from 'react-native';
import {
  moderateScale,
  mScale,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@shared/src/theme/metrics';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {Images} from '@shared/src/assets';
import ImageAtom from '@src/components/Image/ImageAtom';
import {MyCourseTabMolecule} from '@src/components/molecules/MyCourseTabMolecule/MyCourseTabMolecule';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import {NavType} from '@src/navigation/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {
  getCourses,
  getCoursesById,
} from '@shared/src/provider/store/services/courses.service';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {getCourseNotes} from '@shared/src/provider/store/services/course-note.service';
import { getCourseUploadFile } from '@shared/src/provider/store/services/course-upload-file.service';

type RouteParams = {
  tab?: number;
};

interface AfterEnrollingCourseDetailsProps
  extends NavType<'AfterEnrollingCourseDetails'> {}

export const AfterEnrollingCourseDetails: React.FC<
  AfterEnrollingCourseDetailsProps
> = () => {
  let route = useRoute<any>();
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {
    courses,
    singleCourse,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
  const [index, setIndex] = React.useState(route.params?.tab ?? 0);
  const [routes] = React.useState(CourseDetailsRouteKeys);
  const [width, setWidth] = React.useState(WINDOW_WIDTH);
  const [height, setHeight] = React.useState(WINDOW_HEIGHT);
  const {course, id} = route.params || {};

  useFocusEffect(
    React.useCallback(() => {
      let params = {
        id: Number(id),
      };
      if (id) {
        dispatch(getCoursesById(params));
      }
    }, [id]),
  );

  const data = singleCourse ? singleCourse : course;

  React.useEffect(() => {
    dispatch(getCourses());
    dispatch(getCourseNotes());
    dispatch(getCourseUploadFile());
  }, []);

  React.useEffect(() => {
    if (route.params?.tab) {
      setIndex(route.params?.tab);
    } else {
      setIndex(0);
    }
  }, [route.params?.tab]);

  const renderScene = SceneMap({
    courseContent: CourseContent,
    overview: Overview,
    notes: Notes,
    reviews: Reviews,
    learningMode: LearningMode,
    uploadProject: UploadProject,
    resources: Resources,
  });

  const innerCategoriesRenderItem = ({item}: {item: CoursesResponse}) => {
    return <PopularCourseMolecule item={item} />;
  };

  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
        flex: 1,
        flexGrow: 1,
        paddingTop: moderateScale(60),
      }}>
      <ScrollViewAtom>
        <View
          style={{
            paddingHorizontal: mScale.base,
            paddingVertical: mScale.lg,
            backgroundColor: '#060A18',
          }}>
          <TextAtom text={`${singleCourse?.name}`} preset="heading2" />
        </View>
        <View style={{alignSelf: 'center', position: 'relative'}}>
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 15,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              zIndex: 1,
            }}>
            <Images.SVG.ShareIcon />
          </View>
          <ImageAtom
            sourceRequire={require('@shared/src/assets/img/courseplaceholder2.png')}
            style={{width: WINDOW_WIDTH, height: moderateScale(235)}}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
            }}>
            <Images.SVG.Play1 />
          </View>
        </View>
        <View
          style={{flex: 1, height: height}}
          onLayout={event => {
            const {width, height} = event.nativeEvent.layout;
            setWidth(width);
            setHeight(height);
          }}>
          <TabView
            navigationState={{index, routes}}
            renderTabBar={props => <MyCourseTabMolecule {...props} />}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: WINDOW_WIDTH}}
            lazy={true}
          />
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Frequently Bought Together" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={
                courses?.length
                  ? courses?.filter(el => el?.category_id == data?.category_id)
                  : []
              }
              renderItem={innerCategoriesRenderItem}
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
    </GradientTemplate>
  );
};
