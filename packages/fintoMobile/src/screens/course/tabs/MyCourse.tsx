import {useNavigation} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import {storeVideoUrl} from '@shared/src/provider/store/reducers/courses.reducer';
import {getUserCourseHistory} from '@shared/src/provider/store/services/UserCourseHistory.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {mScale} from '@shared/src/theme/metrics';
import {UserCourseHistoryResponse} from '@shared/src/utils/types/UserCourseHistory';
import GetStarted from '@src/components/GetStarted';
import LoaderAtom from '@src/components/LoaderAtom';
import MyCourseMolecule from '@src/components/molecules/MyCourseMolecule/MyCourseMolecule';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {FlatList, View} from 'react-native';

interface MyCourseInterface {}
const MyCourse: React.FunctionComponent<MyCourseInterface> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {user_course_history, loading} = useAppSelector(
    state => state.userCourseHistory,
  );
  const [refreshLoading, setRefreshLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    onRefresh();
  }, []);
  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getUserCourseHistory());
    setRefreshLoading(false);
  };

  const renderItem = ({item}: {item: UserCourseHistoryResponse}) => {
    return (
      <View style={{paddingRight: mScale.base}}>
        <MyCourseMolecule
          item={item?.course}
          onPress={() => {
            if (item?.course?.course_video_embed) {
              dispatch(storeVideoUrl(item?.course?.course_video_embed));
            }
            navigation.navigate(RouteKeys.AFTERENROLLINGCOURSEDETAILSSCREEN, {
              id: item?.course_id,
            });
          }}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1, paddingTop: mScale.base}}>
      {loading?.user_course_history ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <View style={{alignSelf: 'center', paddingLeft: mScale.base}}>
        <FlatList
          data={
            user_course_history?.length
              ? user_course_history?.filter(el => el?.user_id == auth?.user?.id)
              : []
          }
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

export default MyCourse;
