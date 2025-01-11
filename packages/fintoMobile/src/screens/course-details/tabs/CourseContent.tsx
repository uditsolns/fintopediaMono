import {useRoute} from '@react-navigation/native';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {CourseInnerAtom} from '@src/components/CourseInnerAtom';
import React from 'react';
import {FlatList, LayoutChangeEvent, View} from 'react-native';

interface CourseContentProps {
  onLayout: (event: LayoutChangeEvent) => void;
}
export const CourseContent: React.FunctionComponent<CourseContentProps> = ({
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

  return (
    <View onLayout={onLayout} style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={singleCourse?.sections?.length ? singleCourse?.sections : []}
        renderItem={({item}) => <CourseInnerAtom item={item} />}
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled={false}
      />
    </View>
  );
};
