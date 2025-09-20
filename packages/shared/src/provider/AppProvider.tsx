"use client";

import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import { Platform } from "react-native";
import { ToastContainer } from "react-toastify";
interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  if (Platform.OS === "web") {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          {children}
        </PersistGate>
        <ToastContainer />
      </Provider>
    );
    // } else {
    //   return (
    //     <Provider store={store}>
    //       <PersistGate persistor={persistor} loading={null}>
    //         <ToastProvider
    //           placement="bottom"
    //           offsetTop={80}
    //           offsetBottom={40}
    //           renderToast={(toast: ToastProps) => <ToastMolecule {...toast} />}
    //         >
    //           {children}
    //         </ToastProvider>
    //       </PersistGate>
    //     </Provider>
    //   );
  }
};
