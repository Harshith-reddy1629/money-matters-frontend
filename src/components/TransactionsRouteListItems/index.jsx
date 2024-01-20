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
      <td
        style={{
          padding: "1rem",
          width: "35%",
          minWidth: "180px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {TxnType === "credit" ? (
          <BsArrowUpCircle size={25} color="#16dbaa" />
        ) : (
          <BsArrowDownCircle size={25} color="#fe5c73" />
        )}{" "}
        {txnName}
      </td>
      <td>{Category}</td>
      <td>{D}</td>
      <td style={{ color: `${TxnType === "credit" ? "#16dbaa" : "#fe5c73"}` }}>
        <BsCurrencyRupee /> {Amount}
      </td>
      <td>
        <UpdateTxnPopup item={item} />
      </td>
      <td>
        <DeletePopup id={_id} />
      </td>

      <td>{/* <DeletePopup id={id} /> */}</td>
    </tr>
  );
};

export default TransactionsRouteListItems;
