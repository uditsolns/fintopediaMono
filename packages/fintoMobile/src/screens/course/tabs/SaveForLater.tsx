import {useNavigation} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import {createCourseCart} from '@shared/src/provider/store/services/CourseCart.service';
import {getCoursesSaveLater} from '@shared/src/provider/store/services/coursesavelater.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {CoursesSaveLaterResponse} from '@shared/src/utils/types/courses-save-later';
import {isInCart} from '@src/components/Calculate';
import GetStarted from '@src/components/GetStarted';
import LoaderAtom from '@src/components/LoaderAtom';
import CourseMolecule from '@src/components/molecules/CourseMolecule/CourseMolecule';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {FlatList, View} from 'react-native';

interface SaveForLaterInterface {}
const SaveForLater: React.FunctionComponent<SaveForLaterInterface> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {courseCart} = useAppSelector(state => state.courseCart);
  const {courses_save_later, loading} = useAppSelector(
    state => state.coursesSaveLater,
  );
  const [refreshLoading, setRefreshLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    onRefresh();
  }, []);
  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getCoursesSaveLater());
    setRefreshLoading(false);
  };

  const renderItem = ({item}: {item: CoursesSaveLaterResponse}) => {
    return (
      <View style={{paddingRight: mScale.base}}>
        <CourseMolecule
          item={item?.course}
          onPress={async () => {
            let params = {
              user_id: Number(auth?.user?.id),
              course_id: Number(item?.course_id),
              status: '1',
            };
            if (isInCart(courseCart, item?.course_id)) {
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
          }}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1, paddingTop: mScale.base}}>
      {loading?.courses_save_later ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <View style={{alignSelf: 'center', paddingLeft: mScale.base}}>
        <FlatList
          data={courses_save_later?.length ? courses_save_later : []}
          renderItem={renderItem}
          contentContainerStyle={{
            rowGap: mScale.base,
            paddingBottom: mScale.base,
          }}
          ListFooterComponent={
            <View
              style={{
                paddingRight: mScale.base,
              }}>
              <GetStarted
                onPress={() => {
                  navigation.navigate(RouteKeys.COUPONSCREEN);
                }}
                btnTitle={'Redeem now'}
                title={'Fintopedia Credits: 500'}
                titleDesc={'You can use your credits to buy your next course!'}
              />
            </View>
          }
          onRefresh={onRefresh}
          refreshing={refreshLoading}
        />
      </View>
    </View>
  );
};

export default SaveForLater;
