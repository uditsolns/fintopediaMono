import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {MainRoutes} from './routes/Main.routes';
import {AuthRoutes} from './routes/Auth.routes';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';
import {
  LogLevel,
  NotificationClickEvent,
  OneSignal,
} from 'react-native-onesignal';
import {ONESIGNAL_APP_ID} from '@shared/src/config/apiUrl';

interface AppNavigationProps {}

export const AppNavigation: React.FC<AppNavigationProps> = ({}) => {
  const {auth} = useAppSelector(state => state.auth);
  let navigationRef = createNavigationContainerRef()
  const linking = {
    prefixes: ['fintoMobile://', 'https://fintopedia.com/'],
  };
  React.useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(ONESIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(true);

    const handleNotificationOpened = async (
      openedEvent: NotificationClickEvent,
    ) => {
      const notification = openedEvent.notification;
      const data = notification.additionalData;
      console.log('notification', notification);
      const res = notification?.launchURL?.split('/') || [];
      if (res.length > 2 && res[2]) {
        const screenName = res[2]?.charAt(0)?.toUpperCase() + res[2].slice(1);
        console.log('ScreenName', screenName);
        if (data?.course_id) {
          navigationRef.navigate(screenName, {
            id: +data?.course_id,
          });
        }
      }
    };
    OneSignal.Notifications.addEventListener('click', handleNotificationOpened);

    return () => {
      OneSignal.Notifications.removeEventListener(
        'click',
        handleNotificationOpened,
      );
    };
  }, []);
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      {auth?.token ? <MainRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
