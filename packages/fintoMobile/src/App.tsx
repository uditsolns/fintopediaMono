/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {Images} from '@shared/src/assets/index';
import {moderateScale, mScale} from '@shared/src/theme/metrics';
import {colorPresets} from '@shared/src/theme/color';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Images.SVG.Home
        width={moderateScale(100)}
        color={colorPresets.SECONDARY}
      />
      <Images.SVG.Courses
        width={moderateScale(100)}
        color={colorPresets.SECONDARY}
      />
      <Images.SVG.Mock
        width={moderateScale(100)}
        color={colorPresets.SECONDARY}
      />
      <Images.SVG.Event
        width={moderateScale(100)}
        color={colorPresets.SECONDARY}
      />
      <Images.SVG.User
        width={moderateScale(100)}
        color={colorPresets.SECONDARY}
      />
    </SafeAreaView>
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
