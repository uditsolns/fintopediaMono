import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import ProgressBar from '@src/components/ProgressBar';
import RatingReview from '@src/components/RatingReview';
import React from 'react';
import {Alert, FlatList, Pressable, View, ViewStyle} from 'react-native';
import {BeforeEnrollingCourseAtom} from '@src/components/BeforeEnrollingCourseAtom';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import LearningMolecule from '@src/components/molecules/LearningMolecule/LearningMolecule';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {NavType} from '@src/navigation/types';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {useFocusEffect} from '@react-navigation/native';
import LoaderAtom from '@src/components/LoaderAtom';
import {
  getCourses,
  getCoursesById,
} from '@shared/src/provider/store/services/courses.service';
import {getCoursesSections} from '@shared/src/provider/store/services/courseSections.service';
import {getCourseReviews} from '@shared/src/provider/store/services/course-review.service';
import {CourseReviewResponse} from '@shared/src/utils/types/course-review';
import {VdoPlayerView} from 'vdocipher-rn-bridge';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';
import {clearVideoUrl} from '@shared/src/provider/store/reducers/courses.reducer';
import Orientation from 'react-native-orientation-locker';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import GradientBorderBox from '@src/components/Border/GradientBorderBox';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';
import {isInCart} from '@src/components/Calculate';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {createCourseCart} from '@shared/src/provider/store/services/CourseCart.service';
import {isCoursePurchased} from '@shared/src/components/atoms/Calculate';

interface BeforeEnrollingCourseDetailsProps
  extends NavType<'BeforeEnrollingCourseDetails'> {}
const testOtp = {
  otp: '20160313versASE323hWIImvm6bLVuhCJxeBlUvQXCD7jEa5wnwzZwAXyw1BsDmK',
  playbackInfo:
    'eyJ2aWRlb0lkIjoiNDk3NzExMzcwMTdkNDAwYzg4NDI0ZTNjNmEzZDQ3NTQifQ==',
};

export const BeforeEnrollingCourseDetails: React.FunctionComponent<
  BeforeEnrollingCourseDetailsProps
> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const {course, id} = route.params || {};
  const {
    videoPlayerBeforePurchaseUrl,
    setVideoPlayerBeforePurchaseUrl,
    playVideoStartBeforePurchaseLoading,
    setPlayVideoStartBeforePurchaseLoading,
  } = useVideoPlayerContext();
  const {
    courses,
    singleCourse,
    video_url,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  const {coursesSection, loading: coursesSectionLoading} = useAppSelector(
    state => state.coursesSection,
  );
  const {course_review, loading: course_review_loading} = useAppSelector(
    state => state.courseReviews,
  );

  const {auth} = useAppSelector(state => state.auth);
  const {courseget_purchase} = useAppSelector(
    state => state.coursesgetPurchase,
  );

  const [refreshLoading, setRefreshLoading] = React.useState(false);
  const [playVideoStart, setPlayVideoStart] = React.useState(false);
  const [height2, setHeight2] = React.useState<string | number>(220);
  const [embedInfo, setEmbedInfo] = React.useState<any>(video_url);
  const videoPlayerRef = React.useRef<any>(null);

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
    onRefresh();
    return () => {
      dispatch(clearVideoUrl());
      Orientation.lockToPortrait();
    };
  }, []);

  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getCourses());
    dispatch(getCoursesSections());
    dispatch(getCourseReviews());
    setRefreshLoading(false);
  };
  const renderItem = ({item}: {item: CourseReviewResponse}) => {
    return <LearningMolecule item={item} itemWidth={'full-width'} />;
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
          let params = {
            id: Number(item?.id),
          };
          dispatch(getCoursesById(params));
          if (item?.course_video_embed) {
            setVideoPlayerBeforePurchaseUrl(item?.course_video_embed);
            setPlayVideoStartBeforePurchaseLoading(false);
          }
        }}
        onPress={async () => {
          let params = {
            user_id: Number(auth?.user?.id),
            course_id: Number(item?.id),
            status: '1',
          };
          if (isInCart(courseCart, item?.id)) {
            navigation.navigate(RouteKeys.CARTSCREEN);
          } else if (isCoursePurchased(courseget_purchase, item?.id)) {
            navigation.navigate(RouteKeys.AFTERENROLLINGCOURSEDETAILSSCREEN, {
              id: item?.id,
            });
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
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: moderateScale(60),
      }}>
      {coursesLoading.courses || coursesSectionLoading?.coursesSection ? (
        <LoaderAtom />
      ) : (
        <ScrollViewAtom nestedScrollEnabled={true}>
          <View style={{paddingHorizontal: mScale.base}}>
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
              {playVideoStartBeforePurchaseLoading &&
              videoPlayerBeforePurchaseUrl ? (
                <>
                  <VdoPlayerView
                    ref={videoPlayerRef}
                    style={{height: height2, width: '100%'} as ViewStyle}
                    embedInfo={
                      videoPlayerBeforePurchaseUrl
                        ? videoPlayerBeforePurchaseUrl
                        : embedInfo
                        ? embedInfo
                        : video_url
                    }
                    onLoaded={data => {
                      Orientation.unlockAllOrientations();
                      console.log('on loaded :', data);
                    }}
                    onLoadError={e => {
                      console.log('onLoadError =>', e);
                    }}
                    onProgress={time => {
                      console.log('progress', time);
                    }}
                    onMediaEnded={data => {
                      Orientation.lockToPortrait();
                      setPlayVideoStartBeforePurchaseLoading(false);
                      console.log('onmediaended called', data);
                    }}
                    onEnterFullscreen={() => {
                      setHeight2('100%');
                      Orientation.unlockAllOrientations();
                    }}
                    onVdoEnterFullscreen={() => {
                      setHeight2('100%');
                      Orientation.unlockAllOrientations();
                    }}
                    onExitFullscreen={() => {
                      Orientation.lockToPortrait();
                      setHeight2(220);
                    }}
                    onVdoExitFullscreen={() => {
                      Orientation.lockToPortrait();
                      setHeight2(220);
                    }}
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
                      width: WINDOW_WIDTH * 0.91,
                      height: moderateScale(235),
                      borderRadius: mScale.md,
                    }}
                    resizeMode="cover"
                  />
                  <PressableAtom
                    style={[commonStyle.play]}
                    onPress={() => {
                      if (data?.course_video_embed) {
                        setVideoPlayerBeforePurchaseUrl(
                          data?.course_video_embed,
                        );
                        setPlayVideoStartBeforePurchaseLoading(true);
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
          </View>
          <View style={{paddingHorizontal: mScale.base}}>
            <TextAtom
              text={data?.name || ''}
              preset="heading3"
              style={{marginVertical: mScale.base}}
            />
            <TextAtom
              text={data?.description || ''}
              preset="medium"
              style={{color: '#D5D5D9'}}
            />

            <View
              style={{
                marginTop: mScale.md3,
                marginBottom: mScale.lg1,
              }}>
              <ProgressBar
                level={data?.course_type?.toLowerCase()}
                hours={data?.duration_time?.replace(/\D+/g, '') || ''}
                textPreset="smallBold"
                mv={5}
              />
              <View style={{position: 'absolute', right: 0}}>
                {data?.rating ? (
                  <RatingReview
                    rating={data?.rating || ''}
                    review={data?.reviews || ''}
                    textPreset="smallBold"
                    mb={0}
                  />
                ) : null}
              </View>
            </View>
            <ButtonAtom
              title={`Course starts from  ₹ ${data?.sale_price}`}
              preset="fourthy"
            />

            <TextAtom
              text={'This course includes'}
              preset="heading3"
              style={{marginBottom: mScale.md, marginTop: moderateScale(60)}}
            />
            {data?.sections?.map((el, index) => {
              return (
                <View
                  key={index}
                  style={[
                    commonStyle.flexStart,
                    {
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                      marginVertical: mScale.md,
                      flex: 1,
                    },
                  ]}>
                  <View style={{marginEnd: mScale.md, marginTop: mScale.xxs}}>
                    <Images.SVG.CheckBoxIcon2 />
                  </View>

                  <TextAtom
                    preset="body"
                    style={{color: '#F3F4F7'}}
                    text={el?.section_heading || ''}
                  />
                </View>
              );
            })}
          </View>
          <View
            style={{
              padding: mScale.base,
              paddingVertical: mScale.xxl,
              backgroundColor: '#0D0F1C',
            }}>
            <TextAtom
              text={'This course includes'}
              preset="heading3"
              style={{marginVertical: mScale.md}}
            />
            <View
              style={[
                commonStyle.flexSpaceBetween,
                {flexWrap: 'wrap', rowGap: 20},
              ]}>
              <GradientBorderBox
                borderRadium={9}
                linearColor={['#222431', '#222431']}
                width={'47%'}>
                <Pressable
                  style={{
                    backgroundColor: '#222431',
                    padding: mScale.base,
                    borderRadius: 9,
                    width: moderateScale(150),
                    height: moderateScale(150),
                    marginEnd: mScale.md,
                  }}>
                  <Images.SVG.YearAccess width={24} height={24} />
                  <View style={{marginVertical: mScale.md}}>
                    <TextAtom
                      text={'1 Year Access'}
                      preset="titleBold"
                      style={{marginTop: mScale.md}}
                    />
                    <TextAtom
                      preset="small"
                      text={
                        'I bought a course on option trading by Jyoti Budhia jisme maine Option Trading ke regarding basic concept.'
                      }
                      numberOfLines={2}
                      style={{
                        color: '#D5D5D9',
                        fontWeight: '400',
                        marginTop: mScale.md,
                      }}
                    />
                  </View>
                </Pressable>
              </GradientBorderBox>
              <GradientBorderBox
                borderRadium={9}
                linearColor={['#222431', '#222431']}
                width={'47%'}>
                <Pressable
                  style={{
                    backgroundColor: '#222431',
                    padding: mScale.base,
                    borderRadius: 9,
                    width: moderateScale(150),
                    height: moderateScale(150),
                    marginEnd: mScale.md,
                  }}>
                  <Images.SVG.Certificate width={24} height={24} />
                  <View style={{marginVertical: mScale.md}}>
                    <TextAtom
                      text={'Certificate of completion'}
                      preset="titleBold"
                      style={{marginTop: mScale.md}}
                    />
                    <TextAtom
                      preset="small"
                      text={
                        'I bought a course on option trading by Jyoti Budhia jisme maine Option Trading ke regarding basic concept.'
                      }
                      numberOfLines={2}
                      style={{
                        color: '#D5D5D9',
                        fontWeight: '400',
                        marginTop: mScale.md,
                      }}
                    />
                  </View>
                </Pressable>
              </GradientBorderBox>
            </View>
          </View>
          <View style={{paddingHorizontal: mScale.base, flex: 1}}>
            <TextAtom
              text={'Your Course Overview'}
              preset="heading3"
              style={{marginTop: mScale.md}}
            />
            {/* <TextAtom
              preset="body"
              text={'3 sections • 24 topics • 4 hrs 38 mins content'}
              style={{color: '#E8EBED'}}
            /> */}
            <View>
              <FlatList
                data={data?.sections?.length ? data?.sections : []}
                renderItem={({item}) => (
                  <BeforeEnrollingCourseAtom item={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
                removeClippedSubviews={true}
              />
            </View>
          </View>
          {data?.about_me && (
            <View
              style={{
                marginHorizontal: mScale.base,
                flex: 1,
                backgroundColor: '#2D303D',
                padding: mScale.base,
                borderRadius: 10,
              }}>
              <TextAtom text={'About The Course'} preset="heading4" />
              <TextAtom preset="medium" text={data?.about_me || ''} />
            </View>
          )}
          {course_review?.filter(el => el?.course_id == data?.id)?.length ? (
            <>
              <View style={{padding: mScale.base}}>
                <View style={{paddingHorizontal: mScale.base}}>
                  <TextAtom
                    preset="heading3"
                    text={'See what others are achieving through learning'}
                    style={{textAlign: 'center'}}
                  />
                </View>
              </View>
              <View style={{paddingLeft: mScale.base}}>
                <FlatList
                  data={
                    course_review?.length
                      ? course_review?.filter(el => el?.course_id == data?.id)
                      : []
                  }
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  onEndReachedThreshold={0.2}
                  contentContainerStyle={{
                    columnGap: mScale.base,
                    paddingBottom: mScale.lg,
                  }}
                  horizontal={true}
                  keyExtractor={(item): any => item?.id}
                />
              </View>
            </>
          ) : null}
          <View style={{marginVertical: mScale.xl}}>
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
                renderItem={innerCategoriesCoursesRenderItem}
                horizontal={true}
                contentContainerStyle={{
                  columnGap: 20,
                  flexGrow: 1,
                  paddingEnd: mScale.lg,
                }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item): any => item?.id}
              />
            </View>
          </View>
        </ScrollViewAtom>
      )}
    </GradientTemplate>
  );
};
