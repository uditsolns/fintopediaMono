import React from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
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
  isInCart,
  subtractTwoNumber,
  sumCalculate,
} from '@src/components/Calculate';
import {
  createCourseCart,
  deleteCourseCart,
  getCourseCart,
} from '@shared/src/provider/store/services/CourseCart.service';
import {
  createCoursesSaveLater,
  getCoursesSaveLater,
} from '@shared/src/provider/store/services/coursesavelater.service';
import {CourseCartResponse} from '@shared/src/utils/types/CourseCart';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {Toast} from 'react-native-toast-notifications';
import {fontPresets} from '@shared/src/theme/typography';
import GradientBorderBox from '@src/components/Border/GradientBorderBox';
import BorderWithThickness from '@src/components/Border';
import {useVideoPlayerContext} from '@src/components/context/VideoPlayerContextApi';

interface CartProps extends NavType<'Cart'> {}

export const Cart: React.FC<CartProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {courses, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );
  const {
    courseCart,
    delete: deleteCart,
    loading: courseCartLoading,
    create,
  } = useAppSelector(state => state.courseCart);
  const {courses_save_later, loading: courses_save_later_loading} =
    useAppSelector(state => state.coursesSaveLater);

  const {
    setVideoPlayerBeforePurchaseUrl,
    setPlayVideoStartBeforePurchaseLoading,
  } = useVideoPlayerContext();
  const [refreshLoading, setRefreshLoading] = React.useState(false);
  const [subtotal, setSubtotal] = React.useState<number>(0);
  const [actualPricetotal, setActualPricetotal] = React.useState<number>(0);
  const [totalDiscount, setTotalDiscount] = React.useState<number>(0);
  const [totalPay, setTotalPay] = React.useState<number>(0);
  const [gst, setGst] = React.useState<number>(0);

  React.useEffect(() => {
    if (courseCart) {
      let sale_price = sumCalculate(courseCart, 'sale_price');
      let actual_price = sumCalculate(courseCart, 'actual_price');
      let totalDiscountAmount = subtractTwoNumber(sale_price, actual_price);
      let gstTotal = (sale_price * 18) / 100;
      let totalPayAmount = addTwoNumber(sale_price, gstTotal);
      setGst(gstTotal);
      setSubtotal(sale_price);
      setActualPricetotal(actual_price);
      setTotalDiscount(totalDiscountAmount);
      setTotalPay(totalPayAmount);
    }
  }, [courseCart, create, deleteCart]);

  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getCourses());
    dispatch(getCourseCart());
    dispatch(getCoursesSaveLater());
    setRefreshLoading(false);
  };

  const renderItem = ({item}: {item: CourseCartResponse}) => {
    const onRemove = () => {
      let id = Number(item?.id);
      dispatch(
        deleteCourseCart({
          id,
          onSuccess: data => {
            dispatch(getCourseCart());
          },
          onError: err => {},
        }),
      );
    };
    return (
      <CartMolecule
        item={item?.course}
        onPress={() => {
          if (item?.course?.course_video_embed) {
            setVideoPlayerBeforePurchaseUrl(item?.course?.course_video_embed);
            setPlayVideoStartBeforePurchaseLoading(false);
          }
          navigation.navigate(RouteKeys.BEFOREENROLLINGCOURSEDETAILSSCREEN, {
            id: item?.course_id,
          });
        }}
        onSaveLater={() => {
          if (
            courses_save_later?.some(el => el?.course_id == item?.course_id)
          ) {
            Toast.show('You have already added to save for later.', {
              type: 'success',
            });
          }
          let params = {
            user_id: Number(auth?.user?.id),
            course_id: Number(item?.course_id),
            status: '1',
          };
          dispatch(
            createCoursesSaveLater({
              params,
              onSuccess(data) {
                console.log('on save for later');
                Toast.show('Your course added to save for later.', {
                  type: 'success',
                });
                onRemove();
              },
              onError(error) {},
            }),
          );
        }}
        onRemove={() => {
          onRemove();
        }}
        saveForLaterBoolean={true}
      />
    );
  };

  const innerCategoriesCoursesRenderItem = ({
    item,
  }: {
    item: CoursesResponse;
  }) => {
    return (
      <PopularCourseMolecule
        item={item}
        onView={() => {
          if (item?.course_video_embed) {
            setVideoPlayerBeforePurchaseUrl(item?.course_video_embed);
            setPlayVideoStartBeforePurchaseLoading(false);
          }
          navigation.navigate(RouteKeys.BEFOREENROLLINGCOURSEDETAILSSCREEN, {
            id: item?.id,
          });
        }}
        onPress={async () => {
          let params = {
            user_id: Number(auth?.user?.id),
            course_id: Number(item?.id),
            status: '1',
          };
          if (isInCart(courseCart, item?.id)) {
          } else {
            await dispatch(
              createCourseCart({
                params,
                onSuccess: data => {},
                onError: err => {},
              }),
            ).unwrap();
          }
        }}
      />
    );
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
      courseCartLoading?.delete ||
      courses_save_later_loading?.create ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size="large" />
        </View>
      ) : null}
      <ScrollViewAtom
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
        }>
        <View style={{paddingHorizontal: mScale.base, marginTop: mScale.base}}>
          <FlatList
            data={courseCart?.length ? courseCart : []}
            renderItem={renderItem}
            contentContainerStyle={{
              gap: mScale.xl,
              paddingBottom: mScale.lg,
            }}
            nestedScrollEnabled={true}
          />
          {courseCart?.length > 0 ? (
            <>
              <View>
                <Text
                  style={{
                    ...fontPresets.body,
                    marginBottom: mScale.md2,
                    fontWeight: '300',
                    color: colorPresets.GRAY,
                  }}>
                  You have{' '}
                  <Text
                    style={{
                      ...fontPresets.heading4,
                      fontWeight: '700',
                      color: colorPresets.CTA,
                    }}>
                    {courseCart?.length} items
                  </Text>{' '}
                  in your cart
                </Text>
                <GradientBorderBox linearColor={['#121622', '#121622']}>
                  <View
                    style={[
                      commonStyle.flexSpaceBetween,
                      {
                        padding: mScale.lg1,
                        borderRadius: 12,
                        backgroundColor: '#121622',
                      },
                    ]}>
                    <View style={[commonStyle.flexStart]}>
                      <Images.SVG.DiscountIcon />
                      <TextAtom
                        text={'Coupons and Bank offers'}
                        preset="large"
                        style={{marginStart: mScale.base, fontWeight: '500'}}
                      />
                    </View>
                    <Pressable
                      onPress={() => {
                        navigation.navigate(RouteKeys.COUPONSCREEN);
                      }}>
                      <Images.SVG.ChevronRight />
                    </Pressable>
                  </View>
                </GradientBorderBox>
              </View>
              <View style={{marginTop: mScale.lg}}>
                <GradientBorderBox linearColor={['#121622', '#121622']}>
                  <View
                    style={[
                      {
                        paddingHorizontal: mScale.lg1,
                        paddingVertical: mScale.lg2,
                        borderRadius: 12,
                        backgroundColor: '#121622',
                      },
                    ]}>
                    <View
                      style={[
                        commonStyle.flexSpaceBetween,
                        {marginBottom: mScale.md},
                      ]}>
                      <TextAtom text={'Actual price'} preset="large" />
                      <TextAtom
                        text={`₹ ${actualPricetotal}`}
                        preset="heading3"
                      />
                    </View>
                    <View
                      style={[
                        commonStyle.flexSpaceBetween,
                        {marginBottom: mScale.md},
                      ]}>
                      <TextAtom text={'Sale price'} preset="large" />
                      <TextAtom text={`₹ ${subtotal}`} preset="heading3" />
                    </View>
                    <View style={[commonStyle.flexSpaceBetween, {}]}>
                      <TextAtom
                        text={'GST'}
                        preset="body"
                        style={{color: '#B5B5B5'}}
                      />
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
                      style={[
                        commonStyle.flexSpaceBetween,
                        {marginBottom: mScale.md},
                      ]}>
                      <TextAtom text={'Grand total'} preset="heading3" />
                      <TextAtom text={`₹ ${totalPay}`} preset="heading3" />
                    </View>
                  </View>
                </GradientBorderBox>
              </View>
            </>
          ) : null}
        </View>
        <BorderWithThickness style={{marginTop: mScale.xxl}} />
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll title="Wishlist" visible={false} preset="heading2" />
          <View style={{paddingLeft: mScale.base}}>
            <FlatList
              data={courses?.length ? filteredCourses(courses, courseCart) : []}
              renderItem={innerCategoriesCoursesRenderItem}
              horizontal={true}
              contentContainerStyle={{
                columnGap: mScale.lg1,
                paddingEnd: mScale.lg,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
        <View style={{marginVertical: mScale.xl}}>
          <ViewAll
            title="Your might also like"
            visible={false}
            preset="heading2"
          />
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
            commonStyle.flexCenter,
            {
              backgroundColor: '#222431',
              padding: mScale.md2,
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
      {/* <BorderWithThickness mv={0} height={1.5} /> */}
      <GradientBorderBox />
      <View
        style={[
          commonStyle.flexSpaceBetween,
          {
            paddingHorizontal: mScale.base,
            paddingVertical: mScale.lg,
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
        <View style={{width: moderateScale(228), borderRadius: 4}}>
          <ButtonAtom
            title={'Proceed to checkout'}
            onPress={() => {
              if (courseCart?.length > 0) {
                let cartData = {
                  totalItem: courses?.length,
                  totalPay: totalPay,
                  totalDiscount: totalDiscount,
                };
                navigation.navigate(RouteKeys.CHECKOUTSCREEN, {
                  cartData: cartData,
                });
              }
            }}
          />
        </View>
      </View>
    </GradientTemplate>
  );
};
