import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {MainRoutes} from './routes/Main.routes';
import {AuthRoutes} from './routes/Auth.routes';
import {useAppSelector} from '@shared/src/provider/store/types/storeTypes';

interface AppNavigationProps {}

export const AppNavigation: React.FC<AppNavigationProps> = ({}) => {
  const {auth} = useAppSelector(state => state.auth);
  return (
    <NavigationContainer>
      {auth?.token ? <MainRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
