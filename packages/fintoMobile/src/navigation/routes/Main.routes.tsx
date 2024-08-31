import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {RouteKeys} from '../RouteKeys';
import {TabsRoutes} from './Tabs.routes';
import { Search } from '@src/screens/search/Search';
import { Notification } from '@src/screens/notification/Notification';
import { Cart } from '@src/screens/cart/Cart';
import { FilterByCourse } from '@src/screens/search/filterByCourse/FilterByCourse';
import CourseCategory from '@src/screens/search/courseCategory/CourseCategory';

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
    </Stack.Navigator>
  );
};
