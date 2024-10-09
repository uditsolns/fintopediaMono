import {StyleSheet, View, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import React from 'react';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {GradientTemplate} from '@shared/src/components/templates/GradientTemplate';
import ScrollViewAtom from '@shared/src/components/atoms/ScrollView/ScrollViewAtom';
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

const avatarUrl =
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
  const {auth} = useAppSelector(state => state.auth);
  const logoutUser = () => {
    setPopupVisible(true);
  };
  const [popupVisible, setPopupVisible] = React.useState(false);

  const navigateTo = (route: any) => {
    navigation.navigate(route);
  };

  return (
    <GradientTemplate
      style={{paddingBottom: 0, paddingHorizontal: 0, paddingTop: 0}}>
      <ScrollViewAtom contentContainerStyle={{paddingTop: mScale.xxl1}}>
        <View style={styles.centeredView}>
          <ProfileIcon avatarUrl={avatarUrl} />
          <TextAtom
            text={`${auth?.user?.first_name} ${auth?.user?.surname_name}`}
            preset="heading3"
            style={styles.nameText}
          />
          <TextAtom
            text={auth?.user?.email}
            preset="medium"
            style={styles.emailText}
          />
          <TextAtom
            text={`+91${auth?.user?.phone}`}
            preset="small"
            style={[styles.phoneText, {color: '#C8C8CC', marginTop: mScale.xs}]}
          />
        </View>
        <SeparatorAtom style={styles.separator} />
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
          <SeparatorAtom style={styles.separator} />
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
    </GradientTemplate>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignSelf: 'center',
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
    marginTop: mScale.xs,
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
    paddingHorizontal: mScale.base,
  } as ViewStyle,
  logoutContainer: {
    paddingHorizontal: mScale.base,
    paddingBottom: mScale.base,
  } as ViewStyle,
});
