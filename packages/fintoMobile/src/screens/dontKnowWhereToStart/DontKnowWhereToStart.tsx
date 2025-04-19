import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import Dropdown from '@src/components/Dropdown/Dropdown';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import React from 'react';
import {FlatList, TextStyle, View} from 'react-native';
import {colorPresets} from '@shared/src/theme/color';
import GroupRadioButton from '@src/components/GroupRadioButton';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {NavType} from '@src/navigation/types';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {CategoriesResponse} from '@shared/src/utils/types/categories';
import {isInCart} from '@src/components/Calculate';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {createCourseCart} from '@shared/src/provider/store/services/CourseCart.service';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';
import {isCoursePurchased} from '@shared/src/components/atoms/Calculate';

const options = [
  {label: 'Beginner', value: 'beginner'},
  {label: 'Intermediate', value: 'intermediate'},
  {label: 'Expert', value: 'expert'},
];

interface DontKnowWhereToStartProps extends NavType<'DontKnowWhereToStart'> {}
export const DontKnowWhereToStart: React.FunctionComponent<
  DontKnowWhereToStartProps
> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {categories, loading: categoriesLoading} = useAppSelector(
    state => state.categories,
  );
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  const {courses, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
  const {courseget_purchase} = useAppSelector(
    state => state.coursesgetPurchase,
  );
  const [filterCourses, setFilterCourses] = React.useState<CoursesResponse[]>(
    courses?.length ? courses : [],
  );
  const [dropdownSelected, setDropdownSelected] =
    React.useState<CategoriesResponse | null>(null);
  const [radioSelected, setRadioSelected] = React.useState<string>('beginner');
  const {
    setVideoPlayerBeforePurchaseUrl,
    setPlayVideoStartBeforePurchaseLoading,
  } = useVideoPlayerContext();

  React.useEffect(() => {
    if (courses?.length) {
      setFilterCourses(courses);
    }
  }, [courses]);

  const innerCategoriesCoursesRenderItem = ({
    item,
  }: {
    item: CoursesResponse;
  }) => {
    return (
      <PopularCourseMolecule
        item={item}
        onPress={async () => {
          let params = {
            user_id: Number(auth?.user?.id),
            course_id: Number(item?.id),
            status: '1',
          };
          if (isInCart(courseCart, item?.id)) {
            navigation.navigate(RouteKeys.CARTSCREEN);
          } else if (isCoursePurchased(courseget_purchase, item?.id)) {
            navigation.navigate(RouteKeys.AFTERENROLLINGCOURSEDETAILSSCREEN, {
              id: item?.id,
            });
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
        }}
        onView={() => {
          if (item?.course_video_embed) {
            setVideoPlayerBeforePurchaseUrl(item?.course_video_embed);
            setPlayVideoStartBeforePurchaseLoading(false);
          }
          navigation.navigate(RouteKeys.BEFOREENROLLINGCOURSEDETAILSSCREEN, {
            id: item?.id,
          });
        }}
      />
    );
  };

  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: moderateScale(75),
      }}>
      <ScrollViewAtom>
        <View style={{marginTop: mScale.xxl}}>
          <View style={{paddingHorizontal: mScale.base}}>
            <TextAtom
              text={`Don’t know where\nto start?`}
              preset="heading1"
              style={{textAlign: 'center'}}
            />
            <TextAtom
              text={
                'Create screens directly in Method or add your images from Sketch or Figma. You can even sync designs from your cloud storage!'
              }
              preset="body"
              style={
                {
                  textAlign: 'center',
                  marginTop: mScale.base,
                  marginBottom: mScale.lg2,
                  color: 'D5D5D9',
                  letterSpacing: -0.2,
                  lineHeight: 24,
                } as TextStyle
              }
            />
            <Dropdown
              dropdownItemArr={categories?.length ? categories : []}
              itemLabelField="category_name"
              onSelect={item => {
                setDropdownSelected(item);
              }}
              placeholder={'Select category'}
              dropdownBg="#121622"
              dropdownTextColor={colorPresets.CTA}
              textColor={colorPresets.CTA}
              onClear={() => {
                setFilterCourses(courses);
              }}
            />
            <View style={{marginVertical: mScale.base}}>
              <GroupRadioButton
                options={options}
                onSelect={item => {
                  setRadioSelected(item);
                }}
                selectedValue="beginner"
              />
            </View>
            <ButtonAtom
              title={'Let’s go'}
              onPress={() => {
                let filterCourseRes = courses?.filter(
                  el =>
                    el?.category_id == dropdownSelected?.id &&
                    el?.course_type?.toLowerCase() == radioSelected,
                );
                setFilterCourses(filterCourseRes);
              }}
            />
            <View style={{marginTop: mScale.xxl}}>
              <TextAtom
                text={`Become a Finance Manager\n in 3 months`}
                preset="heading2"
                style={{textAlign: 'center', fontWeight: '700'}}
              />
            </View>
          </View>
          <View
            style={{paddingLeft: mScale.base, paddingVertical: mScale.base}}>
            <FlatList
              data={filterCourses?.length ? filterCourses : []}
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
};
