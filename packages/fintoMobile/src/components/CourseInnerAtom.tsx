import {commonStyle} from '@shared/src/commonStyle';
import {mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomCheckbox} from './CustomCheckbox';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {colorPresets} from '@shared/src/theme/color';
import {Images} from '@shared/src/assets';
import {
  CourseSections,
  CourseSubSections,
} from '@shared/src/utils/types/courses';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {storeVideoUrl} from '@shared/src/provider/store/reducers/courses.reducer';
import {updateOngoingCourse} from '@shared/src/provider/store/services/ongoing-course.service';
interface CourseInnerAtomProps {
  item: CourseSections;
}

export interface CourseLessonItem {
  el?: CourseSubSections;
  onPress?: () => void;
  courseChecked?: boolean;
}
export const CourseInnerAtom: React.FC<CourseInnerAtomProps> = ({item}) => {
  let section_id = item?.id;

  const {ongoing_courses, loading: ongoing_courses_loading} = useAppSelector(
    state => state.ongoingCourse,
  );
  const {auth} = useAppSelector(state => state.auth);
  const {singleCourse} = useAppSelector(state => state.courses);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const LessonItem = ({el, onPress, courseChecked}: CourseLessonItem) => {
    return (
      <PressableAtom
        style={[
          commonStyle.flexStart,
          {
            flex: 1,
            alignItems: 'flex-start',
            paddingHorizontal: mScale.lg,
            paddingVertical: mScale.base,
            backgroundColor: '#222431',
          },
        ]}
        onPress={onPress}>
        <CustomCheckbox isChecked={courseChecked} />
        <View style={{flex: 1}}>
          <TextAtom text={el?.subsection_heading || ''} preset="body" />
          <View style={[commonStyle.flexStart]}>
            <ImageAtom
              sourceRequire={require('@shared/src/assets/img/ph_video.png')}
            />
            <TextAtom
              text={el?.subsection_time || ''}
              preset="medium"
              style={{marginStart: mScale.sm, color: '#6D6E6E'}}
            />
          </View>
        </View>
      </PressableAtom>
    );
  };

  return (
    <View
      style={{
        backgroundColor: colorPresets.BLACK,
        paddingTop: mScale.lg,
      }}>
      <TouchableOpacity
        style={[commonStyle.flexSpaceBetween, {padding: mScale.base}]}
        onPress={() => setExpanded(!expanded)}>
        <TextAtom
          text={
            `Section ${item?.section_number} : ${item?.section_heading}` || ''
          }
          preset="heading4"
          style={{width: WINDOW_WIDTH * 0.8}}
        />
        {!expanded ? <Images.SVG.ChevronDown /> : <Images.SVG.ChevronTop />}
      </TouchableOpacity>
      {expanded && item?.subsections?.length > 0 && (
        <FlatList
          data={item?.subsections}
          renderItem={({item}) => {
            const ongoingCourse = ongoing_courses?.find(
              el =>
                el?.user_id === auth?.user?.id &&
                el?.course_id === singleCourse?.id &&
                el?.section_id === section_id &&
                el?.sub_section_id === item?.id,
            );

            const ongoingId = ongoingCourse?.id || null;
            const check_icon_course_section = ongoing_courses?.some(
              e2 =>
                e2?.user_id === auth?.user?.id &&
                e2?.course_id === singleCourse?.id &&
                e2?.section_id === section_id &&
                e2?.sub_section_id === item?.id &&
                e2?.watching_status === 'true',
            );
            return (
              <LessonItem
                el={item}
                onPress={() => {
                  let params = {
                    id: ongoingId,
                    user_id: Number(auth?.user?.id),
                    course_id: Number(singleCourse?.id),
                    section_id: section_id,
                    sub_section_id: item?.id,
                    watching_status: 'true',
                    course_percentage: '0',
                  };
                  if (ongoingId) {
                    dispatch(
                      updateOngoingCourse({
                        params,
                        onSuccess(data) {
                          console.log(
                            'succes of update ongoing copurses',
                            data,
                          );
                        },
                        onError(error) {},
                      }),
                    );
                  }
                  dispatch(storeVideoUrl(item?.sub_video_embed));
                }}
                courseChecked={check_icon_course_section}
              />
            );
          }}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
