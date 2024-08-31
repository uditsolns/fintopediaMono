import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {MainRoutes} from './routes/Main.routes';
import {AuthRoutes} from './routes/Auth.routes';

interface AppNavigationProps {}

export const AppNavigation: React.FC<AppNavigationProps> = ({}) => {
  return (
    <NavigationContainer>
      {/* <AuthRoutes /> */}
      <MainRoutes />
    </NavigationContainer>
  );
};
