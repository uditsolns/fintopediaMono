import { commonStyle } from '@shared/src/commonStyle';
import { TextAtom } from '@shared/src/components/atoms/Text/TextAtom';
import { colorPresets } from '@shared/src/theme/color';
import { mScale } from '@shared/src/theme/metrics';
import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
interface PortfolioAtomProps {
  timer: string;
  balance: number | string;
  totalAmount: number | string;
}

interface TimerItemProps {
  text: string;
  value: string | number;
  bold?: boolean;
}

const PortfolioAtom: React.FC<PortfolioAtomProps> = ({
  timer,
  balance,
  totalAmount,
}) => {
  return (
    <View style={[commonStyle.flexSpaceBetween, styles.container as StyleProp<ViewStyle>]}>
      <TimerItem text="Timer" value={timer} />
      <TimerItem text="V.Balance" value={`₹ ${balance}`} bold={true} />
      <TimerItem text="Total Portfolio Value (₹)" value={`₹ ${totalAmount}`} bold={true} />
    </View>
  );
};

const TimerItem: React.FC<TimerItemProps> = ({ text, value, bold }) => (
  <View>
    <TextAtom
      text={text}
      preset="small"
      style={{ fontWeight: '400',color:colorPresets.GRAY }}
      numberOfLines={1}
    />
    <TextAtom
      text={`${value}`}
      preset="titleBold"
      style={{ fontWeight: bold ? '600' : '400' }}
      numberOfLines={1}
    />
  </View>
);

const styles = {
  container: {
    backgroundColor: colorPresets.TEXT,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7A7FA2',
    padding: mScale.base,
    marginVertical: mScale.md,
  },
};

export default PortfolioAtom;
