import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Images} from '@shared/src/assets';
import * as React from 'react';
import {TabKeys} from '../RouteKeys';
import {Home} from '@src/screens/home/Home';
import {MyCourses} from '@src/screens/course/MyCourses';
import {MockTrade} from '@src/screens/trade/MockTrade';
import {Events} from '@src/screens/event/Events';
import {Account} from '@src/screens/account/Account';
import {fontPresets} from '@shared/src/theme/typography';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {NavTabBar} from '../components/Navbar/NavTabBar';
import {HeaderBar} from '../components/Header/HeaderBar';
import Header from '@src/components/Header/Header';
import {colorPresets} from '@shared/src/theme/color';
import {getCurrentGreeting} from '@src/components/Calculate';

interface TabsRoutesProps {}

const Tabs = createBottomTabNavigator();

export const TabsRoutes: React.FC<TabsRoutesProps> = ({}) => {
  return (
    <Tabs.Navigator
      tabBar={(props: BottomTabBarProps) => <NavTabBar {...props} />}
      screenOptions={{
        tabBarLabelStyle: {
          ...fontPresets.xSmall,
          padding: mScale.xs,
        },
        tabBarStyle: {
          paddingVertical: mScale.base,
          height: moderateScale(70),
        },
        tabBarIconStyle: {
          padding: mScale.xxs,
        },
        headerTransparent: true,
        headerStyle: {
          backgroundColor: colorPresets.TRANSPARENT,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      backBehavior="history">
      <Tabs.Screen
        options={{
          headerShown: true,
          tabBarIcon: props => (
            <Images.SVG.Home width={props.size} color={props.color} />
          ),
          tabBarLabel: 'Home',
          header: () => {
            return <Header text={getCurrentGreeting()} visible={false} />;
          },
          
        }}
        name={TabKeys.HOMETABSCREEN}
        component={Home as React.FC}
      />
      <Tabs.Screen
        options={{
          headerShown: true,
          tabBarIcon: props => (
            <Images.SVG.Courses width={props.size} color={props.color} />
          ),
          tabBarLabel: 'My Courses',
          header: () => {
            return <Header text={'My Courses'} visible={false} />;
          },
        }}
        name={TabKeys.MYCOURSESSCREEN}
        component={MyCourses as React.FC}
      />
      {/* <Tabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Images.SVG.Mock width={props.size} color={props.color} />
          ),
          tabBarLabel: 'Mock Trade',
        }}
        name={TabKeys.MOCKTRADESCREEN}
        component={MockTrade as React.FC}
      /> */}
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Images.SVG.Event width={props.size} color={props.color} />
          ),
          tabBarLabel: 'Events',
          header: () => {
            return <Header text={'My Courses'} visible={false} />;
          },
        }}
        name={TabKeys.EVENTSCREEN}
        component={Events as React.FC}
      />
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Images.SVG.User width={props.size} color={props.color} />
          ),
          tabBarLabel: 'Account',
        }}
        name={TabKeys.ACCOUNTSCREEN}
        component={Account as React.FC}
      />
    </Tabs.Navigator>
  );
};
