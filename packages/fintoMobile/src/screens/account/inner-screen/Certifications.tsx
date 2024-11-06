import {commonStyle} from '@shared/src/commonStyle';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import {getUserCertificate} from '@shared/src/provider/store/services/UserCertificate.service';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {UserCertificateResponse} from '@shared/src/utils/types/UserCertificate';
import LoaderAtom from '@src/components/LoaderAtom';
import CertificationsMolecule from '@src/components/molecules/CertificationsMolecule/CertificationsMolecule';
import {NavType} from '@src/navigation/types';
import React from 'react';
import {FlatList, View} from 'react-native';

interface CertificationsProps extends NavType<'Certifications'> {}

export const Certifications: React.FC<CertificationsProps> = ({navigation}) => {
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
    return <CertificationsMolecule item={item} />;
  };

  return (
    <GradientTemplate style={{paddingBottom: 0, paddingTop: moderateScale(70)}}>
      {loading.userCertificate ? (
        <View style={commonStyle.fullPageLoading}>
          <LoaderAtom size={'large'} />
        </View>
      ) : null}
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
      />
    </GradientTemplate>
  );
};
