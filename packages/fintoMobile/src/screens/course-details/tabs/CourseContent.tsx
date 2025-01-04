import {useRoute} from '@react-navigation/native';
import { ScrollViewAtom } from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {CourseInnerAtom} from '@src/components/CourseInnerAtom';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
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

  const innerCategoriesRenderItem = ({item}: {item: CoursesResponse}) => {
    return <PopularCourseMolecule item={item} />;
  };

  return (
    <View style={{flex: 1}}>
      <ScrollViewAtom>
        <FlatList
          style={{flex: 1}}
          data={singleCourse?.sections?.length ? singleCourse?.sections : []}
          renderItem={({item}) => <CourseInnerAtom item={item} />}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={false}
        />
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Frequently Bought Together" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={
                courses?.length
                  ? courses?.filter(
                      el =>
                        el?.category_id == data?.category_id &&
                        el.id != data?.id,
                    )
                  : []
              }
              renderItem={innerCategoriesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollViewAtom>
    </View>
  );
};
