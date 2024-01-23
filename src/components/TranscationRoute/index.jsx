// import TransactionRouteList from "../TransactionRouteList";
// import Cookies from "js-cookie";
// import { Navigate } from "react-router-dom";
// import Sidebar from "../Sidebar";
// import Navbar from "../Navbar";

import { useContext, useState } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import TransactionsRouteListItems from "../TransactionsRouteListItems";
import "./index.css";
import EmptyView from "../EmptyView";
import LoaderView from "../LoaderView";
import FailedView from "../FailedView";

function TransactionRoute() {
  const T = useContext(TransactionsContext);

  const [activeFilter, setActive] = useState("All");

  const { TpageStatus, AllTransactions, fetchTxns } = T;

  const filteredData = AllTransactions.filter((each) => {
    if (activeFilter === "All") {
      return AllTransactions;
    }
    return each.TxnType === activeFilter;
  });
  const SV = () => (
    <div className="txn-route-container">
      <div className="txn-filter">
        <button
          className={`filter ${activeFilter === "All" && "active-filter"}`}
          onClick={() => setActive("All")}
        >
          All Transactions
        </button>
        <button
          className={`filter ${activeFilter === "credit" && "active-filter"}`}
          onClick={() => setActive("credit")}
        >
          Credit
        </button>
        <button
          className={`filter ${activeFilter === "debit" && "active-filter"}`}
          onClick={() => setActive("debit")}
        >
          Debit
        </button>
      </div>
      {filteredData.length !== 0 ? (
        <table className="table">
          <thead style={{}}>
            <tr style={{ color: "#252525" }}>
              <th style={{}}>Transaction Name</th>
              <th style={{}}>Type</th>
              <th style={{}}>Date</th>
              <th style={{}}> Amount</th>
              <th style={{}}>Update</th>
              <th style={{}}>Delete</th>
            </tr>
          </thead>
          <tbody style={{}}>
            {filteredData.map((each) => (
              <TransactionsRouteListItems item={each} key={each._id} />
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyView />
      )}
    </div>
  );

  switch (TpageStatus) {
    case "Loading":
      return (
        <div style={{ padding: "15px" }}>
          <LoaderView height="280px" />
        </div>
      );
    case "Success":
      return SV();
    case "Failed":
      return <FailedView tryAgain={fetchTxns} />;

    default:
      return null;
  }
}

export default TransactionRoute;
