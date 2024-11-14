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
import {
  Alert,
  FlatList,
  LayoutChangeEvent,
  SafeAreaView,
  ScrollView,
  View,
  ViewStyle,
} from 'react-native';
import {
  moderateScale,
  mScale,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@shared/src/theme/metrics';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {Images} from '@shared/src/assets';
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
import {getCourseUploadFile} from '@shared/src/provider/store/services/course-upload-file.service';
import {getCourseReviews} from '@shared/src/provider/store/services/course-review.service';
import {VdoPlayerView} from 'vdocipher-rn-bridge';
import Orientation from 'react-native-orientation-locker';
import {clearVideoUrl} from '@shared/src/provider/store/reducers/courses.reducer';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';

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
    video_url,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
  const [index, setIndex] = React.useState(route.params?.tab ?? 0);
  const [routes] = React.useState(CourseDetailsRouteKeys);
  const [width, setWidth] = React.useState(WINDOW_WIDTH);
  // const [height, setHeight] = React.useState(WINDOW_HEIGHT / 2);
  const [height2, setHeight2] = React.useState<string | number>(220);
  const [playVideoStart, setPlayVideoStart] = React.useState(false);
  const [embedInfo, setEmbedInfo] = React.useState<any>(video_url);
  const videoPlayer = React.useRef<any>(null);
  const {course, id} = route.params || {};

  const [tabHeights, setTabHeights] = React.useState<number[]>([]);

  const setHeight = React.useCallback(
    (tab: string, height: number) => {
      setTabHeights(prevHeights => ({
        ...prevHeights,
        [tab]: height,
      }));
    },
    [setTabHeights],
  );

  React.useEffect(() => {
    setEmbedInfo(video_url);
  }, [video_url]);

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
    dispatch(getCourseReviews());
    Orientation.unlockAllOrientations();
    return () => {
      // dispatch(clearVideoUrl());
      Orientation.lockToPortrait();
    };
  }, []);

  React.useEffect(() => {
    if (route.params?.tab) {
      setIndex(route.params?.tab);
    } else {
      setIndex(0);
    }
  }, [route.params?.tab]);

  const handleTabLayout = React.useCallback(
    (index: number) => (event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      setTabHeights(prevHeights => {
        const updatedHeights = [...prevHeights];
        updatedHeights[index] = height;
        return updatedHeights;
      });
    },
    [setTabHeights],
  );

  const renderScene = ({route}: {route: {key: string}}) => {
    switch (route.key) {
      case 'courseContent':
        return <CourseContent onLayout={handleTabLayout(0)} />;
      case 'overview':
        return <Overview onLayout={handleTabLayout(1)} />;
      case 'notes':
        return <Notes onLayout={handleTabLayout(2)} />;
      case 'reviews':
        return <Reviews onLayout={handleTabLayout(3)} />;
      case 'learningMode':
        return <LearningMode onLayout={handleTabLayout(4)} />;
      case 'uploadProject':
        return <UploadProject onLayout={handleTabLayout(5)} />;
      case 'resources':
        return <Resources onLayout={handleTabLayout(6)} />;
      default:
        return null;
    }
  };

  const innerCategoriesRenderItem = ({item}: {item: CoursesResponse}) => {
    return <PopularCourseMolecule item={item} />;
  };

  return (
    <GradientTemplate
      style={{paddingHorizontal: 0, paddingTop: moderateScale(60)}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        stickyHeaderIndices={[1]}>
        <View
          style={{
            paddingHorizontal: mScale.base,
            paddingVertical: mScale.lg,
            backgroundColor: '#060A18',
          }}>
          <TextAtom text={`${singleCourse?.name}`} preset="heading2" />
        </View>
        <View>
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
          {playVideoStart && video_url ? (
            <>
              <VdoPlayerView
                ref={videoPlayer}
                style={{height: height2, width: '100%'} as ViewStyle}
                embedInfo={embedInfo ? embedInfo : video_url}
                onLoaded={data => {
                  console.log('on loaded :', data);
                }}
                onLoadError={e => {
                  console.log('onLoadError =>', e);
                }}
                onProgress={time => {
                  console.log('progress', time);
                }}
                onMediaEnded={data => {
                  console.log('onmediaended called', data);
                }}
                onEnterFullscreen={() => setHeight2('100%')}
                onPlaybackProperties={data =>
                  console.log('onPlaybackProperties', data)
                }
              />
            </>
          ) : (
            <>
              <ImageAtom
                sourceRequire={require('@shared/src/assets/img/courseplaceholder2.png')}
                imageStyle={{
                  width: WINDOW_WIDTH,
                  height: moderateScale(235),
                  borderRadius: mScale.md,
                }}
                resizeMode="cover"
              />
              <PressableAtom
                style={[commonStyle.play]}
                onPress={() => {
                  console.log(
                    '--------',
                    playVideoStart,
                    data?.course_video_embed,
                  );
                  if (data?.course_video_embed) {
                    setPlayVideoStart(true);
                  } else {
                    Alert.alert("This course doesn't contain any videos.");
                  }
                }}>
                <ImageAtom
                  sourceRequire={require('@shared/src/assets/img/play.png')}
                />
              </PressableAtom>
            </>
          )}
        </View>
        <View style={{flex: 1, height: tabHeights[index] || WINDOW_HEIGHT / 2}}>
          <TabView
            navigationState={{index, routes}}
            renderTabBar={props => <MyCourseTabMolecule {...props} />}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: WINDOW_WIDTH}}
            lazy={true}
          />
        </View>
      </ScrollView>
      {/* <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Frequently Bought Together" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={
                courses?.length
                  ? courses?.filter(
                      el =>
                        el?.category_id == data?.category_id &&
                        el.id != data?.id,
                    )
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
        </View> */}
    </GradientTemplate>
  );
};
