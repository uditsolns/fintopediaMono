import { Toast } from "react-native-toast-notifications";

export const errorMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    if (action.type.endsWith("/rejected")) {
      console.log("middleware", action);
      if (action?.payload) {
        Toast.show(action.payload.message, {
          type: "error",
        });
      } else {
        Toast.show(action.error.message, {
          type: "error",
        });
      }
    }

    return next(action);
  };
