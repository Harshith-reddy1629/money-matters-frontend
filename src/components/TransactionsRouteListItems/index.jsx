import {
  BsCurrencyDollar,
  BsArrowUpCircle,
  BsArrowDownCircle,
  BsCurrencyRupee,
} from "react-icons/bs";

import DateConverter from "../DateConverter";
import UpdateTxnPopup from "../UpdateTxnPopup";
import "./index.css";
import DeletePopup from "../DeletePopUp";

const TransactionsRouteListItems = (props) => {
  const { item } = props;

  const { _id, txnName, Category, txnDate, Amount, TxnType } = item;

  const D = DateConverter(txnDate);

  return (
    <tr style={{ color: "#505887" }}>
      <td style={{ display: "flex", alignItems: "center" }}>
        {TxnType === "credit" ? (
          <BsArrowUpCircle size={25} color="#16dbaa" />
        ) : (
          <BsArrowDownCircle size={25} color="#fe5c73" />
        )}{" "}
        {txnName}
      </td>
      <td>{Category}</td>
      <td>{D}</td>
      <td
        style={{
          color: `${TxnType === "credit" ? "#16dbaa" : "#fe5c73"}`,
        }}
      >
        <BsCurrencyRupee /> {Amount}
      </td>
      <td style={{}}>
        <UpdateTxnPopup item={item} />
      </td>
      <td style={{}}>
        <DeletePopup id={_id} />
      </td>
    </tr>
  );
};

export default TransactionsRouteListItems;
