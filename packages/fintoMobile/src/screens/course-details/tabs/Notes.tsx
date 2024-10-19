import {useRoute} from '@react-navigation/native';
import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale, WINDOW_HEIGHT} from '@shared/src/theme/metrics';
import {
  CourseNotesFields,
  CourseNotesResponse,
} from '@shared/src/utils/types/course-notes';
import {formatDateMonthTime} from '@src/components/Calculate';
import {MultilineTextInputAtom} from '@src/components/Input/MultilineTextInputAtom';
import React from 'react';
import {Alert, FlatList, Pressable, View} from 'react-native';
import {useCourseNotesHelper} from '@shared/src/components/structures/course-notes/courseNotes.helper';
import {courseNotesField} from '@shared/src/components/structures/course-notes/courseNotesModel';
import LoaderAtom from '@src/components/LoaderAtom';
import {
  createCourseNotes,
  deleteCourseNotes,
  updateCourseNotes,
} from '@shared/src/provider/store/services/course-note.service';
interface NotesProps {}
export const Notes: React.FunctionComponent<NotesProps> = () => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {singleCourse, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
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

  React.useEffect(() => {
    setFieldValue(courseNotesField.user_id.name, auth?.user?.id || '');
    setFieldValue(courseNotesField.course_id.name, singleCourse?.id || '');
  }, [data]);

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
      <View>
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
                            setNotes(item?.notes);
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
                      <TextAtom text={item?.notes || ''} preset="body" />
                    </View>
                  </View>
                </>
              );
            }}
            contentContainerStyle={{
              rowGap: mScale.base,
              paddingBottom: moderateScale(WINDOW_HEIGHT * 0.5),
            }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
        ) : null}
      </View>
    </View>
  );
};
