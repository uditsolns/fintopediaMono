import { colorPresets } from '@shared/src/theme/color';
import { fontPresets } from '@shared/src/theme/typography';
import * as React from 'react';
import {TabBar} from 'react-native-tab-view';

export const MyCourseTabMolecule = props => {
  return (
    <TabBar
      {...props}
      labelStyle={{
        ...fontPresets.medium,
        textTransform: 'capitalize',
        fontWeight: '100',
        marginBottom:-6
      }}
      style={{backgroundColor: 'transparent',borderLeftWidth:0,borderRightWidth:0,borderTopWidth:0,borderBottomWidth:0.25,borderColor:colorPresets.GRAY,elevation:0}}
      indicatorStyle={{backgroundColor: colorPresets.CTA, height: 2}}
      activeColor={colorPresets.CTA}
      inactiveColor={colorPresets.GRAY}
      scrollEnabled={true}

    />
  );
};
