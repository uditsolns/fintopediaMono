import { Platform } from "react-native";
import { Toast } from "react-native-toast-notifications";
import { toast } from "react-toastify";

export const errorMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    if (action.type.endsWith("/rejected")) {
      console.log("middleware", action);
      if (action?.payload) {
        if (Platform.OS === "web") {
          toast.error(action.payload.message, {
            position: "top-center",
          });
        } else {
          Toast.show(action.payload.message, {
            type: "error",
          });
        }
      } else {
        if (Platform.OS === "web") {
          toast.error(action.error.message, {
            position: "top-center",
          });
        } else {
          Toast.show(action.error.message, {
            type: "error",
          });
        }
      }
    }

    return next(action);
  };
