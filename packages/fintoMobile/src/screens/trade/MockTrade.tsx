import * as React from 'react';
import {Text, View} from 'react-native';

interface MockTradeProps {}

export const MockTrade: React.FC<MockTradeProps> = ({}) => {
  return (
    <View>
      <Text>MockTrade</Text>
    </View>
  );
};
