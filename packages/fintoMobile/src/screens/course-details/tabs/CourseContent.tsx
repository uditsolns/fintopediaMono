
import { useRoute } from '@react-navigation/native';
import { useAppSelector } from '@shared/src/provider/store/types/storeTypes';
import {CourseInnerAtom} from '@src/components/CourseInnerAtom';
import React from 'react';
import {FlatList, View} from 'react-native';


interface CourseContentProps {}
export const CourseContent: React.FunctionComponent<
  CourseContentProps
> = () => {

  const {
    courses,
    singleCourse,
    loading: coursesLoading,
  } = useAppSelector(state => state.courses);
   let route = useRoute<any>();
   const {course, id} = route.params || {};
   const data = singleCourse ? singleCourse : course;

  return (
    <View
      style={{flex: 1}}>
      <FlatList
        data={singleCourse?.sections?.length ? singleCourse?.sections : [] }
        renderItem={({item}) => (
          <CourseInnerAtom item={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled={false}
      />
    </View>
  );
};
