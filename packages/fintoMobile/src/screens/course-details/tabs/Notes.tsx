import {useNavigation, useRoute} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {
  CourseNotesFields,
  CourseNotesResponse,
} from '@shared/src/utils/types/course-notes';
import {formatDateMonthTime, isInCart} from '@src/components/Calculate';
import {MultilineTextInputAtom} from '@src/components/Input/MultilineTextInputAtom';
import React from 'react';
import {
  Alert,
  FlatList,
  LayoutChangeEvent,
  Pressable,
  View,
} from 'react-native';
import {useCourseNotesHelper} from '@shared/src/components/structures/course-notes/courseNotes.helper';
import {courseNotesField} from '@shared/src/components/structures/course-notes/courseNotesModel';
import LoaderAtom from '@src/components/LoaderAtom';
import {
  createCourseNotes,
  deleteCourseNotes,
  updateCourseNotes,
} from '@shared/src/provider/store/services/course-note.service';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';
import {createCourseCart} from '@shared/src/provider/store/services/CourseCart.service';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {isCoursePurchased} from '@shared/src/components/atoms/Calculate';

interface NotesProps {
  onLayout: (event: LayoutChangeEvent) => void;
}

export const Notes: React.FunctionComponent<NotesProps> = ({onLayout}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {
    courses,
    singleCourse,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
  const {course_notes, loading: course_notes_loading} = useAppSelector(
    state => state.courseNotes,
  );
  let route = useRoute<any>();

  const {course, id} = route.params || {};
  const data = singleCourse ? singleCourse : course;
  const {courseNotesFormik, courseNotesInputProps} = useCourseNotesHelper();
  const {handleSubmit, setFieldValue, values, handleChange} = courseNotesFormik;
  const [notes, setNotes] = React.useState<string | null>('');
  const [selectedNote, setSelectedNote] =
    React.useState<CourseNotesResponse | null>(null);

  const navigation = useNavigation();
  const {
    setVideoPlayerBeforePurchaseUrl,
    setPlayVideoStartBeforePurchaseLoading,
  } = useVideoPlayerContext();
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  const {courseget_purchase} = useAppSelector(
    state => state.coursesgetPurchase,
  );

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
    <View style={{flex: 1, padding: mScale.base}}>
      {coursesLoading.singleCourse ||
      coursesLoading.courses ||
      course_notes_loading.create ||
      course_notes_loading.course_notes ||
      course_notes_loading.update ||
      course_notes_loading.delete ? (
        <LoaderAtom size="large" />
      ) : null}
      <ScrollViewAtom>
        <MultilineTextInputAtom
          placeholderTitle="Add a note at 0.15"
          onCancel={() => {
            setNotes('');
            setSelectedNote(null);
          }}
          onSave={() => {
            let params: CourseNotesFields = {
              id: selectedNote?.id,
              user_id: Number(auth?.user?.id),
              course_id: Number(data?.id),
              notes: notes,
            };
            if (!notes) {
              Alert.alert('Note is required.');
              return;
            }
            if (selectedNote) {
              dispatch(
                updateCourseNotes({
                  params,
                  onSuccess(data) {},
                  onError(error) {},
                }),
              );
              return true;
            }
            dispatch(
              createCourseNotes({
                params,
                onSuccess(data) {},
                onError(error) {},
              }),
            );
            setNotes('');
            setSelectedNote(null);
          }}
          value={notes}
          onChangeText={setNotes}
        />
        {course_notes?.length ? (
          <FlatList
            data={
              course_notes?.length
                ? course_notes?.filter(el => el?.user_id == auth?.user?.id)
                : []
            }
            renderItem={({item}) => {
              let note = item?.notes ? item?.notes : '';
              note = note
                .toString()
                .replace(/<br \/>|<p>|<ol>|<\/ol>|<ul>|<\/ul>/g, '')
                .replace(/<\/p>|<br>|<\/li>/g, '\n')
                .replace(/<li>/g, '\n\u2022')
                .replace(/<li style="list-style-type: none;">/g, '\n\u2022')
                .replace(/&gt;/g, '\u003E')
                .replace(/&lt;/g, '\u003C')
                .replace(/&#8220;|&#8221;/g, '\u0022')
                .replace(/<strong>|<\/strong>/g, '')
                .replace(/&amp;/g, '\u0026')
                .replace(/&nbsp;/g, ' ');
              return (
                <>
                  <View style={{marginVertical: mScale.md}}>
                    <View style={[commonStyle.flexSpaceBetween]}>
                      <TextAtom
                        text={
                          item?.updated_at
                            ? formatDateMonthTime(item?.updated_at)
                            : ''
                        }
                        preset="heading4"
                      />
                      <View style={[commonStyle.flexSpaceBetween]}>
                        <Pressable
                          style={{marginEnd: mScale.md}}
                          onPress={() => {
                            let note2 = item?.notes ? item?.notes : '';
                            note2 = note2
                              .toString()
                              .replace(
                                /<br \/>|<p>|<ol>|<\/ol>|<ul>|<\/ul>/g,
                                '',
                              )
                              .replace(/<\/p>|<br>|<\/li>/g, '\n')
                              .replace(/<li>/g, '\n\u2022')
                              .replace(
                                /<li style="list-style-type: none;">/g,
                                '\n\u2022',
                              )
                              .replace(/&gt;/g, '\u003E')
                              .replace(/&lt;/g, '\u003C')
                              .replace(/&#8220;|&#8221;/g, '\u0022')
                              .replace(/<strong>|<\/strong>/g, '')
                              .replace(/&amp;/g, '\u0026')
                              .replace(/&nbsp;/g, ' ');
                            setNotes(note2);
                            setSelectedNote(item);
                          }}>
                          <Images.SVG.Pencil />
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            let id = Number(item?.id);
                            dispatch(
                              deleteCourseNotes({
                                id,
                                onSuccess(data) {},
                                onError(error) {},
                              }),
                            );
                          }}>
                          <Images.SVG.Trash />
                        </Pressable>
                      </View>
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: colorPresets.GRAY3,
                        borderRadius: 9,
                        marginVertical: mScale.base,
                        padding: mScale.base,
                        backgroundColor: '#222431',
                      }}>
                      <TextAtom text={note || ''} preset="body" />
                    </View>
                  </View>
                </>
              );
            }}
            contentContainerStyle={{
              rowGap: mScale.base,
              // paddingBottom: moderateScale(WINDOW_HEIGHT * 0.5),
            }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
        ) : null}
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
        </View>
      </ScrollViewAtom>
    </View>
  );
};
