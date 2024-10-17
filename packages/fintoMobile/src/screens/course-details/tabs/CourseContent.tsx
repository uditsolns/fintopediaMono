
import { useRoute } from '@react-navigation/native';
import { useAppSelector } from '@shared/src/provider/store/types/storeTypes';
import {CourseInnerAtom} from '@src/components/CourseInnerAtom';
import React from 'react';
import {FlatList, View} from 'react-native';

export const data2 = [
  {
    section: 'Section 1: Course Introduction',
    lessons: [
      {
        title: 'Roles and responsibilities of a product manager',
        duration: '5 min',
        completed: true,
      },
      {
        title: 'A day in a life of product manager',
        duration: '5 min',
        completed: false,
      },
    ],
  },
  {
    section: 'Section 2: Basics of Stock Market',
    lessons: [
      {title: 'Stock Market Overview', duration: '10 min', completed: false},
      {title: 'Introduction to Shares', duration: '8 min', completed: false},
    ],
  },
  {
    section: 'Section 3: Mastering Money Management principles',
    lessons: [],
  },
];

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
        data={data2}
        renderItem={({item}) => (
          <CourseInnerAtom section={item.section} lessons={item.lessons} />
        )}
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled={false}
      />
    </View>
  );
};
