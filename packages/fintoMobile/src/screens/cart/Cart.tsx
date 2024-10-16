import React from 'react';
import {FlatList, Pressable, RefreshControl, View} from 'react-native';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import {commonStyle} from '@shared/src/commonStyle';
import {colorPresets} from '@shared/src/theme/color';
import {ViewAll} from '@src/components/ViewAll/ViewAll';
import ImageAtom from '@src/components/Image/ImageAtom';
import CartMolecule from '@src/components/molecules/CartMolecule/CartMolecule';
import PopularCourseMolecule from '@src/components/molecules/PopularCourseMolecule/PopularCourseMolecule';
import {Images} from '@shared/src/assets';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {ButtonAtom} from '@shared/src/components/atoms/Button/ButtonAtom';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {NavType} from '@src/navigation/types';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {getCourses} from '@shared/src/provider/store/services/courses.service';
import LoaderAtom from '@src/components/LoaderAtom';
import {
  addTwoNumber,
  filteredCourses,
  subtractTwoNumber,
  sumCalculate,
} from '@src/components/Calculate';
import {
  deleteCourseCart,
  getCourseCart,
} from '@shared/src/provider/store/services/CourseCart.service';
import {createCoursesSaveLater} from '@shared/src/provider/store/services/coursesavelater.service';
import {CourseCartResponse} from '@shared/src/utils/types/CourseCart';

interface CartProps extends NavType<'Cart'> {}

export const Cart: React.FC<CartProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {courses, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
  const {courseCart, loading: courseCartLoading} = useAppSelector(
    state => state.courseCart,
  );
  const {auth} = useAppSelector(state => state.auth);

  const [refreshLoading, setRefreshLoading] = React.useState(false);
  const [subtotal, setSubtotal] = React.useState<number>(0);
  const [totalDiscount, setTotalDiscount] = React.useState<number>(0);
  const [totalPay, setTotalPay] = React.useState<number>(0);
  const [gst, setGst] = React.useState<number>(100);

  React.useEffect(() => {
    if (courseCart?.length) {
      let sale_price = sumCalculate(courseCart, 'sale_price');
      let actual_price = sumCalculate(courseCart, 'actual_price');
      let totalDiscountAmount = subtractTwoNumber(sale_price, actual_price);
      let totalPayAmount = addTwoNumber(sale_price, gst);
      setSubtotal(sale_price);
      setTotalDiscount(totalDiscountAmount);
      setTotalPay(totalPayAmount);
    }
  }, [courseCart]);

  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getCourses());
    dispatch(getCourseCart());
    setRefreshLoading(false);
  };

  const renderItem = ({item}: {item: CourseCartResponse}) => {
    return (
      <CartMolecule
        item={item?.course}
        onPress={() => {}}
        onSaveLater={() => {
          let params = {
            user_id: Number(auth?.user?.id),
            course_id: Number(item?.id),
            status: '1',
          };
          console.log(params)
          dispatch(
            createCoursesSaveLater({
              params,
              onSuccess(data) {
                console.log('createCoursesSaveLater');
              },
              onError(error) {},
            }),
          );
        }}
        onRemove={() => {
          let id = Number(item?.id);
          dispatch(
            deleteCourseCart({
              id,
              onSuccess: data => {
                console.log('delete cart');
              },
              onError: err => {},
            }),
          );
        }}
      />
    );
  };

  const innerCategoriesCoursesRenderItem = ({
    item,
  }: {
    item: CoursesResponse;
  }) => {
    return <PopularCourseMolecule item={item} />;
  };
  return (
    <GradientTemplate
      style={{
        paddingBottom: 0,
        paddingHorizontal: 0,
        paddingTop: moderateScale(70),
      }}>
      {coursesLoading?.courses ||
      courseCartLoading?.courseCart ||
      courseCartLoading?.create ||
      courseCartLoading?.delete ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null}
      <ScrollViewAtom
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
        }>
        <View style={{paddingHorizontal: mScale.base}}>
          <FlatList
            data={courseCart?.length ? courseCart : []}
            renderItem={renderItem}
            contentContainerStyle={{
              rowGap: mScale.base,
              paddingBottom: mScale.lg,
            }}
            nestedScrollEnabled={true}
          />
          <View>
            <TextAtom
              text={`You have ${courseCart?.length} items in your cart`}
              preset="body"
              style={{marginBottom: mScale.md}}
            />
            <View
              style={[
                commonStyle.flexSpaceBetween,
                {
                  padding: mScale.base,
                  borderWidth: 1,
                  borderColor: colorPresets.GRAY3,
                  borderRadius: 12,
                  backgroundColor: '#121622',
                },
              ]}>
              <View style={[commonStyle.flexStart]}>
                <Images.SVG.DiscountIcon />
                <TextAtom
                  text={'Coupons and Bank offers'}
                  preset="body"
                  style={{marginStart: mScale.base}}
                />
              </View>
              <Pressable
                onPress={() => {
                  navigation.navigate(RouteKeys.COUPONSCREEN);
                }}>
                <Images.SVG.ChevronRight />
              </Pressable>
            </View>
          </View>
          <View
            style={[
              {
                padding: mScale.lg,
                borderWidth: 1,
                borderColor: colorPresets.GRAY3,
                borderRadius: 12,
                backgroundColor: '#121622',
                marginVertical: mScale.base,
              },
            ]}>
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom text={'Subtotal'} preset="large" />
              <TextAtom text={`₹ ${subtotal}`} preset="heading3" />
            </View>
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom
                text={'Discount'}
                preset="body"
                style={{color: '#B5B5B5'}}
              />
              <TextAtom
                text={`-₹ ${totalDiscount}`}
                preset="heading4"
                style={{color: colorPresets.PRIMARY}}
              />
            </View>
            <View style={[commonStyle.flexSpaceBetween, {}]}>
              <TextAtom text={'GST'} preset="body" style={{color: '#B5B5B5'}} />
              <TextAtom
                text={`+ ₹ ${gst}`}
                preset="body"
                style={{color: '#B5B5B5'}}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dotted',
                borderColor: '#282A37',
                marginVertical: mScale.lg,
              }}
            />
            <View
              style={[commonStyle.flexSpaceBetween, {marginBottom: mScale.md}]}>
              <TextAtom text={'You pay'} preset="heading3" />
              <TextAtom text={`₹ ${totalPay}`} preset="heading3" />
            </View>
          </View>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={courses?.length ? filteredCourses(courses, courseCart) : []}
              renderItem={innerCategoriesCoursesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: 20,
                // flexGrow: 1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Your might also like" visible={false} />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={courses?.length ? filteredCourses(courses, courseCart) : []}
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
      {totalDiscount ? (
        <View
          style={[
            commonStyle.flexStart,
            {
              backgroundColor: '#222431',
              padding: mScale.base,
            },
          ]}>
          <ImageAtom
            sourceRequire={require('@shared/src/assets/img/congrats.png')}
          />
          <View style={[commonStyle.flexStart, {marginStart: mScale.md}]}>
            <TextAtom
              text={'Wohoo! You’re saving'}
              preset="titleBold"
              style={{marginRight: mScale.sm}}
            />
            <TextAtom
              text={`₹ ${totalDiscount}`}
              preset="titleBold"
              style={{marginRight: mScale.sm, color: colorPresets.SECONDARY}}
            />
            <TextAtom text={'on this order'} preset="titleBold" />
          </View>
        </View>
      ) : null}
      <View
        style={[
          commonStyle.flexSpaceBetween,
          {
            paddingHorizontal: mScale.base,
            paddingVertical: mScale.lg,
            borderTopWidth: 1,
            borderColor: colorPresets.GRAY3,
          },
        ]}>
        <View>
          <TextAtom
            text={'Grand total'}
            preset="medium"
            style={{marginBottom: mScale.xxs, color: '#B5B5B5'}}
          />
          <TextAtom text={`₹ ${totalPay}`} preset="heading3" />
        </View>
        <View>
          <ButtonAtom
            title={'Proceed to checkout'}
            onPress={() => {
              let cartData = {
                totalItem: courses?.length,
                totalPay: totalPay,
                totalDiscount: totalDiscount,
              };
              navigation.navigate(RouteKeys.CHECKOUTSCREEN, {
                cartData: cartData,
              });
            }}
          />
        </View>
      </View>
    </GradientTemplate>
  );
};
