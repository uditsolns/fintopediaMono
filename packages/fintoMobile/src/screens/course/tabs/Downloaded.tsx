import {useNavigation} from '@react-navigation/native';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {mScale} from '@shared/src/theme/metrics';
import {CoursesResponse} from '@shared/src/utils/types/courses';
import GetStarted from '@src/components/GetStarted';
import DownloadedMolecule from '@src/components/molecules/DownloadedMolecule/DownloadedMolecule';
import { RouteKeys } from '@src/navigation/RouteKeys';
import React from 'react';
import {FlatList, View} from 'react-native';

interface DownloadedInterface {}
const Downloaded: React.FunctionComponent<DownloadedInterface> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {courses, loading: coursesLoading} = useAppSelector(
    state => state.courses,
  );

  React.useEffect(() => {}, []);

  const renderItem = ({item}: {item: CoursesResponse}) => {
    return <DownloadedMolecule item={item} />;
  };
  return (
    <View style={{flex: 1, paddingTop: mScale.base}}>
      <View style={{alignSelf: 'center', paddingLeft: mScale.base}}>
        <FlatList
          data={courses?.length ? courses : []}
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
                  navigation.navigate(RouteKeys.COUPONSCREEN)
                }}
                btnTitle={'Redeem now'}
                title={'Fintopedia Credits: 500'}
                titleDesc={'You can use your credits to buy your next course!'}
              />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default Downloaded;
