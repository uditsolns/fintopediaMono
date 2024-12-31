import {useNavigation} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import {storeSingleOngoingCourse} from '@shared/src/provider/store/reducers/ongoing.course.reducer';
import {getCompletionPercentage} from '@shared/src/provider/store/services/completion-percentage.service';
import {getOngoingCourse} from '@shared/src/provider/store/services/ongoing-course.service';
import {getOngoingCourseStatus} from '@shared/src/provider/store/services/ongoing-courses-status.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import {OngoingCoursesResponse} from '@shared/src/utils/types/ongoing-course';
import {OngoingCoursesStatusResponse} from '@shared/src/utils/types/ongoing-courses-status';
import GetStarted from '@src/components/GetStarted';
import LoaderAtom from '@src/components/LoaderAtom';
import OngoingMolecule from '@src/components/molecules/OngoingMolecule/OngoingMolecule';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {FlatList, View} from 'react-native';
interface OngoingInterface {}

const Ongoing: React.FunctionComponent<OngoingInterface> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {ongoing_courses_status, loading: ongoingCourseStatusLoading} =
    useAppSelector(state => state.ongoingCourseStatus);
  const {completion_percentage, loading: completion_percentage_loading} =
    useAppSelector(state => state.completionPercentage);
  const [refreshLoading, setRefreshLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    onRefresh();
  }, []);
  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getOngoingCourseStatus());
    dispatch(getCompletionPercentage());
    setRefreshLoading(false);
  };

  const renderItem = ({item}: {item: OngoingCoursesStatusResponse}) => {
    let complete_percentage_data = completion_percentage?.completion_data?.find(
      el => el?.course_id == item?.course?.id,
    );
    let complete_percentage = complete_percentage_data?.completion_percentage;
    return (
      <OngoingMolecule
        item={item?.ongoing}
        completionPercentage={complete_percentage || 0}
        onPress={() => {          
          dispatch(storeSingleOngoingCourse(item?.ongoing));
          navigation.navigate(RouteKeys.AFTERENROLLINGCOURSEDETAILSSCREEN, {
            id: item?.ongoing?.course_id,
          });
        }}
      />
    );
  };
  return (
    <View style={{flex: 1, paddingTop: mScale.base}}>
      {ongoingCourseStatusLoading?.ongoing_courses_status ||
      completion_percentage_loading?.completion_percentage ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <View style={{alignSelf: 'center', paddingLeft: mScale.base}}>
        <FlatList
          data={ongoing_courses_status?.length ? ongoing_courses_status : []}
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
          refreshing={refreshLoading}
          onRefresh={onRefresh}
        />
      </View>
    </View>
  );
};

export default Ongoing;
