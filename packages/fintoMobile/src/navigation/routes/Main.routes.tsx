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
import { PaymentSuccess } from '@src/screens/cart/checkout/payment/PaymentSuccess';
import { DontKnowWhereToStart } from '@src/screens/dontKnowWhereToStart/DontKnowWhereToStart';
import { BeforeEnrollingCourseDetails } from '@src/screens/course-details/BeforeEnrollingCourseDetails';
import { AfterEnrollingCourseDetails } from '@src/screens/course-details/AfterEnrollingCourseDetails';

interface MainRoutesProps {}

const Stack = createNativeStackNavigator();

export const MainRoutes: React.FC<MainRoutesProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.HOMESCREEN}
        component={TabsRoutes}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.SEARCHSCREEN}
        component={Search as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.NOTIFICATIONSCREEN}
        component={Notification as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.CARTSCREEN}
        component={Cart as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.FILTERBYCOURSESCREEN}
        component={FilterByCourse as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.COURSECATEGORYSCREEN}
        component={CourseCategory as React.FC}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.COUPONSCREEN}
        component={Coupon as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.CHECKOUTSCREEN}
        component={Checkout as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.BILLINGSCREEN}
        component={Billing as React.FC}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.PAYMENTSUCCESSSCREEN}
        component={PaymentSuccess as React.FC}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.DONTKNOWWHERETOSTARTSCREEN}
        component={DontKnowWhereToStart as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.BEFOREENROLLINGCOURSEDETAILSSCREEN}
        component={BeforeEnrollingCourseDetails as React.FC}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={RouteKeys.AFTERENROLLINGCOURSEDETAILSSCREEN}
        component={AfterEnrollingCourseDetails as React.FC}
      />
    </Stack.Navigator>
  );
};
