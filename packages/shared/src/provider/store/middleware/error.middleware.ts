import { Toast } from "react-native-toast-notifications";
import { isRejectedWithValue } from "@reduxjs/toolkit";

export const errorMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
      if (action?.payload) {
        Toast.show(action.payload.message, {
          type: "error",
        });
      } else if (action?.error) {
          Toast.show(action.error.message, {
            type: "error",
          });
      } else {
        Toast.show("An error occurred!", {
          type: "error",
        });
      }
    

    return next(action);
  };
