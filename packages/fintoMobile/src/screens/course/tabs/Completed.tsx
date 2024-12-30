import {useNavigation} from '@react-navigation/native';
import {commonStyle} from '@shared/src/commonStyle';
import {getUserCertificate} from '@shared/src/provider/store/services/UserCertificate.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {mScale} from '@shared/src/theme/metrics';
import {UserCertificateResponse} from '@shared/src/utils/types/UserCertificate';
import {pdfPermission} from '@src/components/DownloadPdf/DownloadPdf';
import GetStarted from '@src/components/GetStarted';
import LoaderAtom from '@src/components/LoaderAtom';
import CertificationsMolecule from '@src/components/molecules/CertificationsMolecule/CertificationsMolecule';
import {RouteKeys} from '@src/navigation/RouteKeys';
import React from 'react';
import {FlatList, View} from 'react-native';

interface CompletedInterface {}
const Completed: React.FunctionComponent<CompletedInterface> = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector(state => state.auth);
  const {userCertificate, loading} = useAppSelector(
    state => state.userCertificate,
  );
  const [refreshLoading, setRefreshLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    onRefresh();
  }, []);
  const onRefresh = () => {
    setRefreshLoading(true);
    dispatch(getUserCertificate());
    setRefreshLoading(false);
  };
  const renderItem = ({item}: {item: UserCertificateResponse}) => {
    let mime = 'application/pdf';
    let url =
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    let title = 'Demo';
    let extensionType = url?.split('.')?.pop();
    
    const download = async () => {
      await pdfPermission({mime, url, title, extensionType});
    };
    return <CertificationsMolecule item={item} onPress={download} />;
  };
  return (
    <View style={{flex: 1, paddingTop: mScale.base}}>
      {loading.userCertificate ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
      <View style={{alignSelf: 'center', paddingLeft: mScale.base}}>
        <FlatList
          data={
            userCertificate?.length
              ? userCertificate?.filter(el => el?.user_id == auth?.user?.id)
              : []
          }
          renderItem={renderItem}
          contentContainerStyle={{
            rowGap: mScale.base,
            paddingBottom: mScale.base,
          }}
          refreshing={refreshLoading}
          onRefresh={onRefresh}
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
        />
      </View>
    </View>
  );
};

export default Completed;
