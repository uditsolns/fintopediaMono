/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {colorPresets} from '@shared/src/theme/color';
import {AppNavigation} from './navigation/AppNavigation';
import {AppProvider} from '@shared/src/provider/AppProvider';
import {VideoPlayerContextProvider} from '@src/components/context/VideoPlayerContextApi';
import Orientation from 'react-native-orientation-locker';
import {OtplessContextProvider} from './components/context/OtplessContextApi';
import {CartContextProvider} from './components/context/CartContextApi';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  const backgroundStyle = {
    backgroundColor: colorPresets.TRANSPARENT,
    flex: 1,
  };

  return (
    <AppProvider>
      <OtplessContextProvider>
        <VideoPlayerContextProvider>
          <CartContextProvider>
            <SafeAreaView style={backgroundStyle}>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
              />
              <AppNavigation />
            </SafeAreaView>
          </CartContextProvider>
        </VideoPlayerContextProvider>
      </OtplessContextProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
