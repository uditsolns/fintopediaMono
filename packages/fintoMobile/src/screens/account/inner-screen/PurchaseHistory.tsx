import {commonStyle} from '@shared/src/commonStyle';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {getPurchaseHistory} from '@shared/src/provider/store/services/PurchaseHistory.service';
import {getUserCourseHistory} from '@shared/src/provider/store/services/UserCourseHistory.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {UserCourseHistoryResponse} from '@shared/src/utils/types/UserCourseHistory';
import {pdfPermission} from '@src/components/DownloadPdf/DownloadPdf';
import LoaderAtom from '@src/components/LoaderAtom';
import PurchaseHistoryMolecule from '@src/components/molecules/PurchaseHistoryMolecule/PurchaseHistoryMolecule';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {FlatList, View} from 'react-native';

interface PurchaseHistoryProps extends NavType<'PurchaseHistory'> {}

export const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({
  navigation,
}) => {
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
    let mime = 'application/pdf';
    let url =
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    let title = item?.course?.name;
    let extensionType = url?.split('.')?.pop();

    const download = async () => {
      await pdfPermission({mime, url, title, extensionType});
    };
    return <PurchaseHistoryMolecule item={item} onPress={download} />;
  };
  return (
    <GradientTemplate style={{paddingBottom: 0, paddingTop: moderateScale(70)}}>
      {loading?.user_course_history ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <View style={{marginTop:mScale.lg}}>

      <FlatList
        data={
          user_course_history?.length
            ? user_course_history?.filter(el => el?.user_id == auth?.user?.id)
            : []
        }
        renderItem={renderItem}
        contentContainerStyle={{
          gap: mScale.lg1,
        }}
        refreshing={refreshLoading}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </GradientTemplate>
  );
};
