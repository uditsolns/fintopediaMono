import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import { createCourseCart } from '@shared/src/provider/store/services/CourseCart.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {colorPresets} from '@shared/src/theme/color';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {getRandomItem, isInCart} from '@src/components/Calculate';
import Dropdown from '@src/components/Dropdown/Dropdown';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import TagsAtom from '@src/components/TagsAtom';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import { RouteKeys } from '@src/navigation/RouteKeys';
import {NavType} from '@src/navigation/types';
import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

interface CourseCategoryProps extends NavType<'CourseCategory'> {}
export default function CourseCategory({navigation}: CourseCategoryProps) {
  const dispatch = useAppDispatch();
  const {courses} = useAppSelector(state => state.courses);
  const {auth} = useAppSelector(state => state.auth);
  const {categories, loading: categoriesLoading} = useAppSelector(
    state => state.categories,
  );
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );

  React.useEffect(() => {}, []);

  const innerCategoriesCoursesRenderItem = ({
    item,
  }: {
    item: CoursesResponse;
  }) => {
    return <PopularCourseMolecule item={item}  onPress={async () => {
      let params = {
        user_id: Number(auth?.user?.id),
        course_id: Number(item?.id),
        status: '1',
      };
      if (isInCart(courseCart, item?.id)) {
        navigation.navigate(RouteKeys.CARTSCREEN);
      } else {
        await dispatch(
          createCourseCart({
            params,
            onSuccess: data => {
              navigation.navigate(RouteKeys.CARTSCREEN);
            },
            onError: err => {},
          }),
        ).unwrap();
      }
    }} />;
  };

  return (
    <GradientTemplate style={{paddingHorizontal: 0, paddingBottom: 0,paddingTop:moderateScale(70)}}>
      <ScrollViewAtom nestedScrollEnabled={true}>
        <View style={{marginBottom: mScale.xs}}>
          <ViewAll title="All Categories" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', gap: mScale.md}}>
              {getRandomItem(categories)
                ?.slice(0, 5)
                ?.map((data, index) => (
                  <TagsAtom title={data?.category_name} key={index} />
                ))}
            </View>
          </View>
        </View>
        <View
          style={[
            {
              marginVertical: mScale.xl,
              flex: 1,
              backgroundColor: 'transparent',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colorPresets.GRAY3,
            },
          ]}>
          <View style={{flex: 1, padding: mScale.xl}}>
            <TextAtom
              text={'Don’t know where to start?'}
              preset="heading3"
              style={{textAlign: 'center', marginBottom: mScale.md}}
            />
            <TextAtom
              text={
                'Create screens directly in Method or add your images from Sketch or Figma.'
              }
              preset="medium"
              style={{textAlign: 'center', marginBottom: mScale.lg}}
            />

            <Dropdown
              dropdownItemArr={categories?.length ? categories : []}
              itemLabelField="category_name"
              onSelect={item => {
                console.log(item);
              }}
              placeholder={'Select category'}
              dropdownBg="#121622"
              dropdownTextColor={colorPresets.CTA}
              textColor={colorPresets.CTA}
            />
          </View>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Popular Courses" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={courses?.length ? courses : []}
              renderItem={innerCategoriesCoursesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Previously Viewed Courses" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={courses?.length ? courses : []}
              renderItem={innerCategoriesCoursesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollViewAtom>
    </GradientTemplate>
  );
}

const styles = StyleSheet.create({});
