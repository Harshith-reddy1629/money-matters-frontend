import { useContext } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import TransactionsRouteListItems from "../TransactionsRouteListItems";
import "./index.css";
import LoaderView from "../LoaderView";
import FailedView from "../FailedView";

const TransactionsCard = () => {
  const T = useContext(TransactionsContext);

  const { TpageStatus, AllTransactions } = T;

  const SV = () => (
    <div>
      <table
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "18px",
          padding: "12px",
        }}
      >
        <thead>
          <tr style={{ color: "#252525" }}>
            <th style={{ textAlign: "start", padding: "12px" }}>
              Transaction Name
            </th>
            <th style={{ textAlign: "start" }}>Type</th>
            <th style={{ textAlign: "start" }}>Date</th>
            <th style={{ textAlign: "start" }}> Amount</th>
            <th style={{ textAlign: "start" }}>Update</th>
            <th style={{ textAlign: "start" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {AllTransactions.slice(0, 3).map((each) => (
            <TransactionsRouteListItems item={each} key={each._id} />
          ))}
        </tbody>
      </table>
    </div>
  );

  const displayView = () => {
    switch (TpageStatus) {
      case "Loading":
        return (
          <div style={{ height: "350px", width: "100%" }}>
            <LoaderView />
          </div>
        );
      case "Success":
        return SV();
      case "Failed":
        return FailedView();

      default:
        return null;
    }
  };

  return (
    <div className="last-txn-card">
      <h1 className="last-txn">Last Transactions</h1>
      {displayView()}
    </div>
  );
};

export default TransactionsCard;
