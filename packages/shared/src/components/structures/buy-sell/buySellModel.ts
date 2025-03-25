import * as Yup from "yup";
import { ModelParams } from "../../../utils/types/main";

type BuySellField = Pick<
  ModelParams,
  | "user_id"
  | "game_id"
  | "stock_id"
  | "order_type"
  | "order_qty"
  | "total_price"
  | "stock_current_price"
  | "round_level"
  | "remarks"
>;

export const buySellField: BuySellField = {
  user_id: {
    name: "user_id",
    label: "User id",
    placeHolder: "",
    requiredErr: "User id is required",
  },
  game_id: {
    name: "game_id",
    label: "Game id",
    placeHolder: "",
    requiredErr: "Game id is required",
  },
  stock_id: {
    name: "stock_id",
    label: "Stock id",
    placeHolder: "",
    requiredErr: "Stock id is required",
  },
  order_type: {
    name: "order_type",
    label: "Order Type",
    placeHolder: "Order Type",
    requiredErr: "Order Type is required",
  },
  order_qty: {
    name: "order_qty",
    label: "Quantity",
    placeHolder: "Enter quantity",
    requiredErr: "Quantity is required",
  },

  total_price: {
    name: "total_price",
    label: "Total Price",
    placeHolder: "0",
    requiredErr: "Total Price is required",
  },
  stock_current_price: {
    name: "stock_current_price",
    label: "Stock Current Price",
    placeHolder: "",
    requiredErr: "Stock Current Price is required",
  },

  round_level: {
    name: "round_level",
    label: "Round level",
    placeHolder: "",
    requiredErr: "Round level is required",
  },
  remarks: {
    name: "remarks",
    label: "Remark(optional)",
    placeHolder: "Enter remarks",
    requiredErr: "",
  },
};

export type BuySellValues = {
  [key in keyof typeof buySellField as string]: string;
};

export const BUY_SELL_VALUES = {
  [buySellField.user_id.name]: "",
  [buySellField.game_id.name]: "",
  [buySellField.stock_id.name]: "",
  [buySellField.order_qty.name]: "",
  [buySellField.order_type.name]: "",
  [buySellField.total_price.name]: "",
  [buySellField.stock_current_price.name]: "",
  [buySellField.round_level.name]: "",
  [buySellField.remarks.name]: "",
};

export const buySellValidation = Yup.object().shape({
  [buySellField.order_qty.name]: Yup.number().required(
    `${buySellField.order_qty.requiredErr}`
  ),
});
