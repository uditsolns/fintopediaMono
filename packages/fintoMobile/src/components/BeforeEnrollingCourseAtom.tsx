import {Images} from '@shared/src/assets';
import {commonStyle} from '@shared/src/commonStyle';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {colorPresets} from '@shared/src/theme/color';
import {mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import { CourseSections, CourseSubSections } from '@shared/src/utils/types/courses';
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CourseLessonItem } from './CourseInnerAtom';

interface BeforeEnrollingCourseAtomProps {
  item: CourseSections;
}


export const BeforeEnrollingCourseAtom: React.FC<
  BeforeEnrollingCourseAtomProps
> = ({item}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const LessonItem = ({el}:{el:CourseSubSections}) => {
    return (
      <View
        style={[
          commonStyle.flexStart,
          {
            flex: 1,
            alignItems: 'flex-start',
            paddingHorizontal: mScale.lg,
            paddingVertical: mScale.base,
            backgroundColor: '#222431',
          },
        ]}>
        <View style={{flex: 1}}>
          <View style={[commonStyle.flexStart]}>
            <Pressable>
              <Images.SVG.Play2 />
            </Pressable>
            <TextAtom
              text={el?.subsection_heading || ''}
              preset="medium"
              style={{marginStart: mScale.md, color: '#CFCFD3'}}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#F3F4F733',
        borderRadius: 10,
        marginVertical: mScale.base,
        borderWidth: 1,
        borderColor: colorPresets.GRAY3,
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        style={[commonStyle.flexSpaceBetween, {padding: mScale.base}]}
        onPress={() => setExpanded(!expanded)}>
        <View>
          <TextAtom
            text={`Section ${item?.section_number} : ${item?.section_heading}` || ''}
            preset="heading4"
            style={{width: WINDOW_WIDTH * 0.75}}
          />
          <TextAtom
            preset="small"
            text={'9 topics • 1 hrs'}
            style={{color: colorPresets.PRIMARY}}
          />
        </View>
        {expanded ? <Images.SVG.ChevronTop /> : <Images.SVG.ChevronDown />}
      </TouchableOpacity>
      {expanded && item?.subsections?.length > 0 && (
        <FlatList
          data={item?.subsections}
          renderItem={({item}) => <LessonItem el={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
