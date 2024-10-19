import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {RouteKeys} from '../RouteKeys';
import {TabsRoutes} from './Tabs.routes';
import {Search} from '@src/screens/search/Search';
import {Notification} from '@src/screens/notification/Notification';
import {Cart} from '@src/screens/cart/Cart';
import {FilterByCourse} from '@src/screens/search/filterByCourse/FilterByCourse';
import CourseCategory from '@src/screens/search/courseCategory/CourseCategory';
import {Coupon} from '@src/screens/cart/coupon/Coupon';
import {Checkout} from '@src/screens/cart/checkout/Checkout';
import {Billing} from '@src/screens/cart/checkout/Billing';
import {PaymentSuccess} from '@src/screens/cart/checkout/payment/PaymentSuccess';
import {DontKnowWhereToStart} from '@src/screens/dontKnowWhereToStart/DontKnowWhereToStart';
import {BeforeEnrollingCourseDetails} from '@src/screens/course-details/BeforeEnrollingCourseDetails';
import {AfterEnrollingCourseDetails} from '@src/screens/course-details/AfterEnrollingCourseDetails';
import {ProfileDetails} from '@src/screens/account/inner-screen/ProfileDetails';
import {Certifications} from '@src/screens/account/inner-screen/Certifications';
import {ReferFriends} from '@src/screens/account/inner-screen/ReferFriends';
import {MembershipType} from '@src/screens/account/inner-screen/MembershipType';
import {ChangePassword} from '@src/screens/account/inner-screen/ChangePassword';
import {PurchaseHistory} from '@src/screens/account/inner-screen/PurchaseHistory';
import {Contactus} from '@src/screens/account/inner-screen/Contactus';
import {BuyStocks} from '@src/screens/event/BuyStocks';
import {SellStocks} from '@src/screens/event/SellStocks';
import {GameWinnerLoading} from '@src/screens/event/GameWinnerLoading';
import {GameWinner} from '@src/screens/event/GameWinner';
import {GameWaiting} from '@src/screens/event/GameWaiting';
import {GameHome} from '@src/screens/event/GameHome';
import {MockBuyStocks} from '@src/screens/trade/MockBuyStocks';
import {MockSellStocks} from '@src/screens/trade/MockSellStocks';
import {HeaderBar} from '../components/Header/HeaderBar';
import {colorPresets} from '@shared/src/theme/color';
import {mScale} from '@shared/src/theme/metrics';
import {Images} from '@shared/src/assets';
import {PressableAtom} from '@shared/src/components/atoms/Button/PressableAtom';
import Header from '@src/components/Header/Header';
import { ViewPdf } from '@src/screens/view-pdf/ViewPdf';

interface MainRoutesProps {}

const Stack = createNativeStackNavigator();
const headerBack = (onBackPress: () => void, color?: string) => (
  <PressableAtom hitSlop={mScale.md} onPress={onBackPress}>
    <Images.SVG.ChevronLeft width={mScale.lg3} color={colorPresets.CTA} />
  </PressableAtom>
);

export const MainRoutes: React.FC<MainRoutesProps> = ({}) => {
  const [scrollY, setScrollY] = React.useState(0);

  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTransparent: true,
        headerStyle: {backgroundColor: colorPresets.TRANSPARENT},
        headerBackVisible: false,
        headerTintColor: colorPresets.CTA,
        header: props => {
          navigation.addListener('blur', () => {
            setScrollY(0);
          });
          return <HeaderBar {...props} scrollY={scrollY} />;
        },
        animation: 'slide_from_right',
        headerLeft: () => headerBack(() => navigation.goBack()),
      })}>
      <Stack.Screen
        name={RouteKeys.HOMESCREEN}
        component={TabsRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack())
        })}
        name={RouteKeys.SEARCHSCREEN}
        component={Search as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.NOTIFICATIONSCREEN}
        component={Notification as React.FC}
      />
      <Stack.Screen
         options={({navigation}) => ({
          headerShown: true,
          headerTitle:'My Cart',
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.CARTSCREEN}
        component={Cart as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.FILTERBYCOURSESCREEN}
        component={FilterByCourse as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerShown: true,
          headerTitle:'',
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.COURSECATEGORYSCREEN}
        component={CourseCategory as React.FC}
      />

      <Stack.Screen
         options={({navigation}) => ({
          headerShown: true,
          headerTitle:'Coupon codes',
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.COUPONSCREEN}
        component={Coupon as React.FC}
      />
      <Stack.Screen
       options={({navigation}) => ({
        headerShown: true,
        headerTitle:'Order details',
        headerLeft: () => headerBack(() => navigation.goBack()),
      })}
        name={RouteKeys.CHECKOUTSCREEN}
        component={Checkout as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerShown: true,
          headerTitle:'Billing',
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.BILLINGSCREEN}
        component={Billing as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.PAYMENTSUCCESSSCREEN}
        component={PaymentSuccess as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.DONTKNOWWHERETOSTARTSCREEN}
        component={DontKnowWhereToStart as React.FC}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return <Header cartVisible={false} />
          },
        }}
        name={RouteKeys.BEFOREENROLLINGCOURSEDETAILSSCREEN}
        component={BeforeEnrollingCourseDetails as React.FC}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => {
            return <Header />
          },
        }}
        name={RouteKeys.AFTERENROLLINGCOURSEDETAILSSCREEN}
        component={AfterEnrollingCourseDetails as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: 'Profile details',
          headerShown: true,
          headerLeft: () =>
            headerBack(() => navigation.navigate(RouteKeys.HOMESCREEN)),
        })}
        name={RouteKeys.PROFILEDETAILSSCREEN}
        component={ProfileDetails as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: 'Certifications',
          headerShown: true,
          headerLeft: () =>
            headerBack(() => navigation.navigate(RouteKeys.HOMESCREEN)),
        })}
        name={RouteKeys.CERTIFICATIONSSCREEN}
        component={Certifications as React.FC}
      />
      <Stack.Screen
         options={({navigation}) => ({
          headerTitle: 'Refer and earn',
          headerShown: true,
          headerLeft: () =>
            headerBack(() => navigation.navigate(RouteKeys.HOMESCREEN)),
        })}
        name={RouteKeys.REFERANDEARNSCREEN}
        component={ReferFriends as React.FC}
      />
      <Stack.Screen
         options={({navigation}) => ({
          headerTitle: 'Membership Type',
          headerShown: true,
          headerLeft: () =>
            headerBack(() => navigation.navigate(RouteKeys.HOMESCREEN)),
        })}
        name={RouteKeys.MEMBERSHIPTYPESCREEN}
        component={MembershipType as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: 'Change password',
          headerShown: true,
          headerLeft: () =>
            headerBack(() => navigation.navigate(RouteKeys.HOMESCREEN)),
        })}
        name={RouteKeys.CHANGEPASSWORDSCREEN}
        component={ChangePassword as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: 'Purchase history',
          headerShown: true,
          headerLeft: () =>
            headerBack(() => navigation.navigate(RouteKeys.HOMESCREEN)),
        })}
        name={RouteKeys.PURCHASEHISTORYSCREEN}
        component={PurchaseHistory as React.FC}
      />
      <Stack.Screen
       options={({navigation}) => ({
        headerTitle: 'Contact Support',
        headerShown: true,
        headerLeft: () =>
          headerBack(() => navigation.navigate(RouteKeys.HOMESCREEN)),
      })}
        name={RouteKeys.CONTACTUSSCREEN}
        component={Contactus as React.FC}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name={RouteKeys.BUYSTOCKSSCREEN}
        component={BuyStocks as React.FC}
      />
      <Stack.Screen
        options={{headerShown: true}}
        name={RouteKeys.SELLSTOCKSSCREEN}
        component={SellStocks as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.GAMEWINNERLOADINGSCREEN}
        component={GameWinnerLoading as React.FC}
      />
      <Stack.Screen
        options={({navigation}) => ({
          headerTitle: 'Leaderboard',
          headerShown: true,
          headerLeft: () =>
            headerBack(() => navigation.navigate(RouteKeys.HOMESCREEN)),
        })}
        name={RouteKeys.GAMEWINNERSCREEN}
        component={GameWinner as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.GAMEWAITINGSCREEN}
        component={GameWaiting as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.GAMEHOMESCREEN}
        component={GameHome as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.MOCKTRADEBUYSTOCKSSCREEN}
        component={MockBuyStocks as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.MOCKTRADESELLSTOCKSSCREEN}
        component={MockSellStocks as React.FC}
      />
      <Stack.Screen
         options={({navigation}) => ({
          headerShown: true,
          headerTitle:'',
          headerLeft: () => headerBack(() => navigation.goBack()),
        })}
        name={RouteKeys.VIEWPDFSCREEN}
        component={ViewPdf as React.FC}
      />
      
    </Stack.Navigator>
  );
};
