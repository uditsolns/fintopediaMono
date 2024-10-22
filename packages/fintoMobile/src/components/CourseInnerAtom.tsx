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
interface CourseInnerAtomProps {
  item: CourseSections;
}

export interface CourseLessonItem {
  el?: CourseSubSections;
  onPress?: () => void;
}
export const CourseInnerAtom: React.FC<CourseInnerAtomProps> = ({item}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const LessonItem = ({el, onPress}: CourseLessonItem) => {
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
        <CustomCheckbox isChecked={true} onPress={onPress} />
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
      </View>
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
          text={`Section ${item?.section_number} : ${item?.section_heading}` || ''}
          preset="heading4"
          style={{width: WINDOW_WIDTH * 0.8}}
        />
        {!expanded ? <Images.SVG.ChevronDown /> : <Images.SVG.ChevronTop />}
      </TouchableOpacity>
      {expanded && item?.subsections?.length > 0 && (
        <FlatList
          data={item?.subsections}
          renderItem={({item, index}) => (
            <LessonItem el={item} onPress={() => {}} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
