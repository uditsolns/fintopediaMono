import {useNavigation, useRoute} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {InputAtom} from '@shared/src/components/atoms/Input/InputAtom';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {LinearGradientMolecule} from '@shared/src/components/molecules/Gradient/LinearGradientMolecule';
import { createCourseCart } from '@shared/src/provider/store/services/CourseCart.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {mScale, WINDOW_HEIGHT, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import { isInCart } from '@src/components/Calculate';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import SeparatorAtom from '@src/components/SeperatorAtom';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import { RouteKeys } from '@src/navigation/RouteKeys';
import React from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

let dailyReminderArr = [
  {
    id: 1,
    text: 'Daily',
  },
  {
    id: 2,
    text: 'Weekly',
  },
  {
    id: 3,
    text: 'Monthly',
  },
];

interface LearningModeProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const LearningMode: React.FunctionComponent<LearningModeProps> = ({
  onLayout,
}) => {
  const {
    courses,
    singleCourse,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
  let route = useRoute<any>();

  const {course, id} = route.params || {};
  const data = singleCourse ? singleCourse : course;

  let [selectedReminder, setSelectedReminder] = React.useState<number>(1);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [width, setWidth] = React.useState(WINDOW_WIDTH * 0.92);
  const [height, setModuleHeight] = React.useState<number>(WINDOW_HEIGHT * 0.5);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {
    setVideoPlayerBeforePurchaseUrl,
    setPlayVideoStartBeforePurchaseLoading,
  } = useVideoPlayerContext();
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  const {auth} = useAppSelector(state => state.auth);

  const innerCategoriesRenderItem = ({item}: {item: CoursesResponse}) => {
    return (
      <PopularCourseMolecule
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
    );
  };

  return (
    <ScrollViewAtom style={{padding: mScale.base, paddingBottom: 0}}>
      <View style={{marginVertical: mScale.md}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colorPresets.GRAY3,
            borderRadius: 7,
            padding: mScale.lg2,
            backgroundColor: '#222431',
          }}>
          <TextAtom text={'Schedule Daily Timer'} preset="heading4" />
          <TextAtom
            style={{color: '#D5D5D9'}}
            text={
              'Set up push notifications or calendar events to stay on track for your learning goals.'
            }
            preset="medium"
          />
          <ButtonAtom
            title={'Add a learning reminder'}
            preset="primary"
            onPress={() => {
              setVisible(true);
            }}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: colorPresets.GRAY3,
            borderRadius: 7,
            padding: mScale.lg2,
            backgroundColor: '#222431',
            marginVertical: mScale.base,
          }}>
          <TextAtom text={'Mobile Notification'} preset="heading4" />
          <TextAtom
            text={'Receive learning reminders on your mobile device.'}
            preset="medium"
            style={{color: '#D5D5D9'}}
          />
          <InputAtom
            shape="square"
            placeholder={'Your phone number'}
            keyboardType="numeric"
          />
          <ButtonAtom title={'Send'} preset="primary" />
          <TextAtom
            style={{color: '#9D9D9D'}}
            preset="xSmall"
            text={`By providing your phone number, you agree to receive a one-time automated text message with a link to get app. Standard messaging rates may apply.`}
          />
        </View>
      </View>
      <Modal
        transparent={true}
        visible={visible}
        animationType="slide"
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.overlay}>
          <View
            style={{
              alignSelf: 'center',
              width: WINDOW_WIDTH * 0.92,
              padding: 20,
              borderRadius: 8,
              overflow: 'hidden',
            }}
            onLayout={event => {
              const {width, height} = event.nativeEvent.layout;
              setWidth(width);
              setModuleHeight(height);
            }}>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                zIndex: -1,
                alignSelf: 'center',
              }}>
              <LinearGradientMolecule
                width={width}
                height={height}
                radius={0}
                colors={['rgba(45, 48, 61, 1)', 'rgba(33, 35, 48, 1)']}
              />
            </View>
            <View style={[commonStyle.flexSpaceBetween, {width: '100%'}]}>
              <TextAtom text={'Schedule Daily Timer'} preset="heading2" />
              <Pressable
                onPress={() => {
                  setVisible(false);
                }}>
                <Images.SVG.Cross />
              </Pressable>
            </View>
            <SeparatorAtom
              marginHorizontal={0}
              bgColor={colorPresets.CTA}
              style={{marginVertical: mScale.base}}
            />
            <View style={{marginVertical: mScale.base}}>
              <TextAtom text={'Frequency'} preset="titleBold" />
              <View
                style={[
                  commonStyle.flexStart,
                  {alignSelf: 'flex-start', marginVertical: mScale.md},
                ]}>
                {dailyReminderArr?.map((el, index) => (
                  <TouchableOpacity
                    key={el.id}
                    style={{
                      padding: mScale.md,
                      backgroundColor:
                        selectedReminder == el?.id
                          ? colorPresets.BLACK
                          : 'rgba(255,255,255,0.1)',
                      borderRadius: 20,
                      marginEnd: mScale.md,
                    }}
                    onPress={() => {
                      setSelectedReminder(index + 1);
                    }}>
                    <TextAtom
                      text={el?.text}
                      preset="xSmallBold"
                      style={{
                        color:
                          selectedReminder == el?.id
                            ? colorPresets.CTA
                            : colorPresets.GRAY,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={{marginBottom: mScale.base}}>
              <TextAtom text={'Time'} preset="titleBold" />
              <TouchableOpacity
                style={[
                  commonStyle.flexSpaceBetween,
                  {
                    borderWidth: 1,
                    borderColor: colorPresets.GRAY3,
                    borderRadius: 6,
                    backgroundColor: 'rgba(34, 36, 49, 1)',
                    padding: mScale.md,
                    marginVertical: mScale.md,
                  },
                ]}>
                <TextAtom text={'12.00 pm '} />
                <Images.SVG.Selector />
              </TouchableOpacity>
            </View>
            <View>
              <TextAtom text={'Link your Calendar'} preset="titleBold" />
              <ButtonAtom title={'Continue with Google'} preset={'tertiary'} />
            </View>
            <View
              style={[
                commonStyle.flexEnd,
                {alignItems: 'center', marginVertical: mScale.base},
              ]}>
              <ButtonAtom title={'Cancel'} preset={'secondary'} />
              <ButtonAtom title={'Save'} preset={'primary'} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={{marginVertical: mScale.xl}}>
        <ViewAll
          title="Frequently Bought Together"
          visible={false}
          paddingHorizontal={0}
        />
        <View>
          <FlatList
            data={
              courses?.length
                ? courses?.filter(
                    el =>
                      el?.category_id == data?.category_id && el.id != data?.id,
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
      </View>
    </ScrollViewAtom>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  popup: {
    width: '100%',
    borderRadius: 8,
    padding: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    alignSelf: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});
