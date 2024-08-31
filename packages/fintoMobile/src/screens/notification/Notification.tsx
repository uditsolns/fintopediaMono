import * as React from 'react';
import {Text, View} from 'react-native';

interface NotificationProps {}

export const Notification: React.FC<NotificationProps> = ({}) => {
  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
};
