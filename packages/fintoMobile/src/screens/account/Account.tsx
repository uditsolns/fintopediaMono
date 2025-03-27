import {StyleSheet, View, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import React from 'react';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import ProfileIcon from '@src/components/Profile/ProfileIcon';
import {TextAtom} from '@shared/src/components/atoms/Text/TextAtom';
import SeparatorAtom from '@src/components/SeperatorAtom';
import ProfileItemAtom from '@src/components/Profile/ProfileItemAtom';
import {moderateScale, mScale, WINDOW_WIDTH} from '@shared/src/theme/metrics';
import {colorPresets} from '@shared/src/theme/color';
import {Images} from '@shared/src/assets';
import Popup from '@src/components/Popup/Popup';
import {
  useAppDispatch,
  useAppSelector,
} from '@shared/src/provider/store/types/storeTypes';
import {NavType} from '@src/navigation/types';
import {logout} from '@shared/src/provider/store/reducers/auth.reducer';
import {PopupUpload} from '@src/components/Popup/PopupUpload';
import {ImageType} from '@shared/src/utils/types/main';
import {updateUser} from '@shared/src/provider/store/services/user.service';
import {imageUrl} from '@shared/src/config/imageUrl';
import {ScrollViewAtom} from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
import {clearContact} from '@shared/src/provider/store/reducers/contact.reducer';
import BorderWithThickness from '@src/components/Border';

export const avatarUrl =
  'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg';

const profileItems = [
  {
    component: <Images.SVG.ProfileDetailsIcon />,
    name: 'Profile details',
    route: RouteKeys.PROFILEDETAILSSCREEN,
  },
  {
    component: <Images.SVG.Certificate />,
    name: 'Certifications',
    route: RouteKeys.CERTIFICATIONSSCREEN,
  },
  {
    component: <Images.SVG.ReferIcon />,
    name: 'Refer and Earn',
    route: RouteKeys.REFERANDEARNSCREEN,
  },
  {
    component: <Images.SVG.MembershipIcon />,
    name: 'Membership type',
    route: RouteKeys.MEMBERSHIPTYPESCREEN,
  },
  {
    component: <Images.SVG.ChangePasswordIcon />,
    name: 'Change password',
    route: RouteKeys.CHANGEPASSWORDSCREEN,
  },
  {
    component: <Images.SVG.PurchaseHistoryIcon />,
    name: 'Purchase history',
    route: RouteKeys.PURCHASEHISTORYSCREEN,
  },
  {
    component: <Images.SVG.ContactIcon />,
    name: 'Contact us',
    route: RouteKeys.CONTACTUSSCREEN,
  },
];

interface AccountProps extends NavType<'Account'> {}

export const Account: React.FC<AccountProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {current_user} = useAppSelector(state => state.auth);
  const logoutUser = () => {
    setPopupVisible(true);
  };
  const [popupVisible, setPopupVisible] = React.useState(false);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [photo, setPhoto] = React.useState<ImageType | null | undefined>(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const navigateTo = (route: any) => {
    navigation.navigate(route);
    dispatch(clearContact());
  };

  return (
    <GradientTemplate
      style={{paddingBottom: 0, paddingHorizontal: 0, paddingTop: 0}}>
      <ScrollViewAtom contentContainerStyle={{paddingTop: mScale.xxl1}}>
        <View style={styles.centeredView}>
          <ProfileIcon
            avatarUrl={
              photo
                ? photo?.uri
                : current_user?.photo
                ? `${imageUrl}/uploads/user_photo/${current_user?.photo}`
                : avatarUrl
            }
            onPress={() => setModalVisible(true)}
          />
          <TextAtom
            text={`${current_user?.first_name} ${current_user?.surname_name}`}
            preset="heading3"
            style={styles.nameText}
          />
          <TextAtom
            text={current_user?.email}
            preset="medium"
            style={styles.emailText}
          />
          <TextAtom
            text={`+91${current_user?.phone}`}
            preset="small"
            style={[styles.phoneText, {color: '#C8C8CC', marginTop: mScale.xs}]}
          />
        </View>
        <BorderWithThickness />
        <View>
          <View style={styles.profileItemsContainer}>
            {profileItems.map((item, index) => (
              <ProfileItemAtom
                key={index}
                component={item?.component}
                name={item?.name}
                onPress={() => navigateTo(item.route)}
              />
            ))}
          </View>
          <BorderWithThickness mv={0} />
          <View style={styles.logoutContainer}>
            <ProfileItemAtom
              component={<Images.SVG.LogoutIcon />}
              name="Logout"
              onPress={logoutUser}
            />
          </View>
        </View>
      </ScrollViewAtom>
      <Popup
        visible={popupVisible}
        title={'Logout Confirmation'}
        desc={
          'Are you sure you want to log out? Any unsaved changes will be lost.'
        }
        btnTitle1={'Logout'}
        btnTitle2={'Back'}
        onClose={() => {
          setPopupVisible(false);
        }}
        onRetry={() => {
          dispatch(logout());
          // navigation.navigate('AuthRoutes', { screen: RouteKeys.LOGINSCREEN });
          // navigation.navigate(RouteKeys.LOGINSCREEN);
        }}
      />
      <PopupUpload
        isVisible={modalVisible}
        toggleModal={toggleModal}
        onImagePick={(data: ImageType[]) => {
          let res = data?.pop();
          let formData = new FormData();
          setPhoto(res);
          formData.append('photo', res ? res : '');
          let id = '' + current_user?.id;
          dispatch(updateUser({formData, id}));
        }}
      />
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignSelf: 'center',
    marginTop: mScale.lg1,
    marginBottom: moderateScale(32),
  } as ViewStyle,
  iconButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: colorPresets.CTA,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -mScale.lg2,
  } as ViewStyle,
  nameText: {
    fontWeight: '600',
    marginTop: mScale.base,
    textAlign: 'center',
  } as TextStyle,
  emailText: {
    fontWeight: '400',
    marginTop: mScale.sm,
    textAlign: 'center',
  } as TextStyle,
  phoneText: {
    fontWeight: '400',
    textAlign: 'center',
  } as TextStyle,
  separator: {
    width: WINDOW_WIDTH,
    marginHorizontal: 0,
    marginVertical: mScale.lg,
  } as ViewStyle,
  profileItemsContainer: {
    paddingHorizontal: moderateScale(22),
    paddingVertical: mScale.lg,
  } as ViewStyle,
  logoutContainer: {
    paddingHorizontal: moderateScale(22),
    paddingVertical: mScale.lg,
  } as ViewStyle,
});
