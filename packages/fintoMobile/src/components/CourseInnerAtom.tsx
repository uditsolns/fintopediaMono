import {commonStyle} from '@shared/src/commonStyle';
import {mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomCheckbox} from './CustomCheckbox';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import ImageAtom from '@shared/src/components/atoms/Image/ImageAtom';
import {colorPresets} from '@shared/src/theme/color';
import {Images} from '@shared/src/assets';

interface Lesson {
  id: string;
  section_id: string;
  subsection_heading: string;
  subsection_time: string;
  sub_video: string;
}

interface CourseInnerAtomProps {
  sectionNo: string | number;
  sectionHeading: string;
  lessons: Lesson[];
}

export const CourseInnerAtom: React.FC<CourseInnerAtomProps> = ({sectionNo,sectionHeading,lessons}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  

  const LessonItem: React.FC<{
    title: string;
    duration: string;
    checked: boolean;
    onPress: () => void;
  }> = ({title, duration, checked, onPress}) => {
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
        <CustomCheckbox isChecked={checked} onPress={onPress} />
        <View style={{flex: 1}}>
          <TextAtom text={title} preset="body" />
          <View style={[commonStyle.flexStart]}>
            <ImageAtom
              sourceRequire={require('@shared/src/assets/img/ph_video.png')}
            />
            <TextAtom
              text={duration}
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
          text={`Section ${sectionNo} : ${sectionHeading}` || ''}
          preset="heading4"
          style={{width: WINDOW_WIDTH * 0.8}}
        />
        {!expanded ? <Images.SVG.ChevronDown /> : <Images.SVG.ChevronTop />}
      </TouchableOpacity>
      {expanded && lessons?.length > 0 && (
        <FlatList
          data={lessons}
          renderItem={({item, index}) => (
            <LessonItem
              title={item.subsection_heading}
              duration={item.subsection_time}
              checked={true}
              onPress={() => {}}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
