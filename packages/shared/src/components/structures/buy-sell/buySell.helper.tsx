import { useFormik } from "formik";
import { useAppDispatch } from "../../../provider/store/types/storeTypes";
import { InputAtomProps } from "../../atoms/Input/InputAtom";
import { BUY_SELL_VALUES, buySellValidation } from "./buySellModel";
import { TransactionsParams } from "../../../utils/types/transactions";
import { createTransactions } from "../../../provider/store/services/transactions.service";

export const useBuySellHelper = () => {
  type dataType = keyof typeof BUY_SELL_VALUES;

  const dispatch = useAppDispatch();

  const buySellFormik = useFormik({
    initialValues: BUY_SELL_VALUES,
    validationSchema: buySellValidation,
    onSubmit: (values) => {
      let data: TransactionsParams = {
        game_id: +values.game_id,
        user_id: +values.user_id,
        stock_id: +values.stock_id,
        order_type: values.order_type,
        order_qty: +values.order_qty,
        total_price: +values.total_price,
        stock_current_price: +values.stock_current_price,
        round_level: values.round_level,
      };
      dispatch(createTransactions(data));
      buySellFormik.resetForm();
    },
  });

  const { setFieldTouched, values, touched, errors, handleChange } =
    buySellFormik;

  const _onBlur = (key: string) => {
    setFieldTouched(key);
  };
  const _onError = (key: dataType) => {
    return touched[key] && errors[key] ? errors[key] : "";
  };

  const buySellInputProps = (
    key: dataType
  ): Partial<Record<keyof InputAtomProps, any>> => {
    return {
      id: key,
      value: values[key],
      error: _onError(key),
      errorMessage: _onError(key),
      onBlur: () => _onBlur(key as string),
      returnKeyType: "next",
      touched: touched[key] || false,
      onChangeText: handleChange(key),
      onChange: handleChange(key),
    };
  };

  return {
    buySellFormik,
    buySellInputProps,
  };
};
