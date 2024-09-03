import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import {CourseInnerAtom} from '@src/components/CourseInnerAtom';
import React from 'react';
import {FlatList, View} from 'react-native';

export const data = [
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
  const [width, setWidth] = React.useState(WINDOW_WIDTH);
  const [height, setHeight] = React.useState(WINDOW_HEIGHT);

  return (
    <View
      // style={{flex: 1, flexGrow: 1, width: width, height: height, zIndex: 1}}
      onLayout={event => {
        const {width, height} = event.nativeEvent.layout;
        setWidth(width);
        setHeight(height);
      }}>
      {data.map(item => {
        return (
          <CourseInnerAtom section={item.section} lessons={item.lessons} />
        );
      })}
      {/* <FlatList
        data={data}
        renderItem={({item}) => (
          <CourseInnerAtom section={item.section} lessons={item.lessons} />
        )}
        keyExtractor={(item, index) => index.toString()}
      /> */}
    </View>
  );
};
