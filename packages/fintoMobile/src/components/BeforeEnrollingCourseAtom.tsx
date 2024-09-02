import { Images } from '@shared/src/assets';
import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { mScale, WINDOW_WIDTH } from '@shared/src/theme/metrics';
import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


interface Lesson {
  title: string;
  duration: string;
  completed: boolean;
}

interface BeforeEnrollingCourseAtomProps {
  section: string;
  lessons: Lesson[];
}

export const BeforeEnrollingCourseAtom: React.FC<
  BeforeEnrollingCourseAtomProps
> = ({section, lessons}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const LessonItem: React.FC<{
    title: string;
  }> = ({title}) => {
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
              <Images.SVG.Play1 />
            </Pressable>
            {/* <CustomCricleBtn
              width={mScale.base}
              height={mScale.base}
              iconName="play"
              btnBg={colorPresets.WHITE}
              iconSize={mScale.sm}
              iconColor={colorPresets.BLACK}
            /> */}
            <TextAtom
              text={title}
              preset="medium"
              color={'#CFCFD3'}
              style={{marginStart: mScale.md}}
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
            text={section}
            preset="heading4"
            style={{width: WINDOW_WIDTH * 0.75}}
          />
          <TextAtom
            preset="small"
            text={'9 topics • 1 hrs'}
            color={colorPresets.PRIMARY}
          />
        </View>
        {expanded ? 
      <Images.SVG.ChevronTop />   :  <Images.SVG.ChevronDown />  
      }
       
      </TouchableOpacity>
      {expanded && lessons.length > 0 && (
        <FlatList
          data={lessons}
          renderItem={({item, index}) => <LessonItem title={item.title} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
