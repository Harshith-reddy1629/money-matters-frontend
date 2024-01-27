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
          <BsArrowUpCircle className="circle-sty" color="#16dbaa" />
        ) : (
          <BsArrowDownCircle className="circle-sty" color="#fe5c73" />
        )}{" "}
        {txnName}
      </td>
      <td>{Category}</td>
      <td
        style={{
          color: `${TxnType === "credit" ? "#16dbaa" : "#fe5c73"}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <BsCurrencyRupee /> {Amount}
        </div>
      </td>
      <td>{D}</td>
      <td style={{}}>
        <UpdateTxnPopup className="circle-sty" item={item} />
      </td>
      <td style={{}}>
        <DeletePopup className="circle-sty" id={_id} />
      </td>
    </tr>
  );
};

export default TransactionsRouteListItems;
