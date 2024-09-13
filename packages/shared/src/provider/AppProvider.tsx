"use client";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import { ToastProvider } from "react-native-toast-notifications";
import { ToastMolecule } from "../components/molecules/Toast/ToastMolecule";
interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ToastProvider
          placement="bottom"
          offsetTop={80}
          offsetBottom={40}
          renderToast={(toast: any) => <ToastMolecule {...toast} />}
        >
          {children}
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};
