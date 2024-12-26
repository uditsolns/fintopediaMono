import SellStocks from "./SellStocks";

const PortfolioMolecule = ({ el, gameId, roundId, index }) => {
  let filterOrderQty = el?.user?.user_transactions?.find(
    (el) => el?.stock_id == el?.stock_id
  );
  console.log("filterOrderQty", filterOrderQty);

  let stock_filter_amount = el?.stock?.stock_datas!.find((e3) => {
    return e3?.game_id == gameId && e3?.round_level == roundId;
  });
//   console.log("FIlterorder", filterOrderQty.order_qty);
  return (
    <tr key={index}>
      <td>{el?.stock?.name}</td>
      <td>{filterOrderQty?.order_qty}</td>
      <td>{el?.stock_current_price}</td>
      <td>
        {stock_filter_amount ? stock_filter_amount?.stock_current_price : 0}
      </td>
      <td>
        <SellStocks data={el} />
      </td>
    </tr>
  );
};
export default PortfolioMolecule;
