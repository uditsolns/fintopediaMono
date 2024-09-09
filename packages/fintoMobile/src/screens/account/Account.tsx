import {StyleSheet, View, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import React from 'react';
import {RouteKeys} from '@src/navigation/RouteKeys';
import {useNavigation} from '@react-navigation/native';
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

interface AccountProps {}

interface LoginState {
  user: {
    first_name: string;
    surname_name: string;
    email: string;
    phone: string;
  };
}

export const Account: React.FC<AccountProps> = ({}) => {
  const navigation = useNavigation();
  const logout = () => {};
  const [popupVisible, setPopupVisible] = React.useState(false);

  const navigateTo = (route: any) => {
    navigation.navigate(route);
  };

  return (
    <GradientTemplate style={{paddingBottom: 0, paddingHorizontal: 0}}>
      <ScrollViewAtom>
        <View style={styles.centeredView}>
          <ProfileIcon avatarUrl={avatarUrl} />
          <TextAtom
            text={`Sujeet Chauhan`}
            preset="heading3"
            style={styles.nameText}
          />
          <TextAtom
            text={'sujeet@gmail.com'}
            preset="medium"
            style={styles.emailText}
          />
          <TextAtom
            text={`+919076049013`}
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
              onPress={logout}
            />
          </View>
        </View>
        <Popup
          visible={popupVisible}
          title={'Logout Confirmation'}
          desc={
            'Are you sure you want to log out? Any unsaved changes will be lost.'
          }
          btnTitle1={'Logout'}
          btnTitle2={'Back'}
        />
      </ScrollViewAtom>
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
