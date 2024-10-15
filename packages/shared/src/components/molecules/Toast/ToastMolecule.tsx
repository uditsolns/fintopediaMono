import * as React from "react";
import { Text, View } from "react-native";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";

interface ToastMoleculeProps extends ToastProps {}

export const ToastMolecule: React.FC<ToastMoleculeProps> = ({ message }) => {
  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
};
