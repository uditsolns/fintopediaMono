import { colorPresets } from '@shared/src/theme/color';
import { fontPresets } from '@shared/src/theme/typography';
import * as React from 'react';
import {TabBar} from 'react-native-tab-view';

export const TabMolecule = props => {
  return (
    <TabBar
      {...props}
      labelStyle={{
        ...fontPresets.medium,
        textTransform: 'capitalize',
        fontWeight: '100',
        marginBottom:-6
      }}
      style={{backgroundColor: 'transparent'}}
      indicatorStyle={{backgroundColor: colorPresets.PRIMARY, height: 2}}
      activeColor={colorPresets.PRIMARY}
      inactiveColor={colorPresets.GRAY}
      scrollEnabled={true}
    />
  );
};
