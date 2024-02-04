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
import { useParams, useSearchParams } from "react-router-dom";
import { LuUserSquare } from "react-icons/lu";

function TransactionRoute() {
  const T = useContext(TransactionsContext);
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  const sort = searchParams.get("sort");
  const txnType = searchParams.get("txnType");

  // const { sort } = useParams();
  console.log(txnType);
  const [activeFilter, setActive] = useState("All");

  const { TpageStatus, AllTransactions, fetchTxns } = T;

  const filteredData = AllTransactions.filter((each) => {
    if (txnType === "All") {
      return AllTransactions;
    }
    return each.TxnType === txnType;
  });
  const SV = () => (
    <div className="txn-table-container">
      {filteredData.length !== 0 ? (
        <table className="table">
          <thead style={{}}>
            <tr style={{ color: "#252525" }}>
              <th style={{}}>Transaction Name</th>
              <th style={{}}>Type</th>
              <th style={{}}> Amount</th>
              <th style={{}}>Date</th>
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

  return (
    <div className="txn-route-container">
      <div className="filter-container">
        <div className="txn-filter">
          <button
            className={`filter ${txnType === "All" && "active-filter"}`}
            onClick={() => {
              setActive("All");
              setSearchParams({ txnType: "All" });
            }}
          >
            All Transactions
          </button>
          <button
            className={`filter ${txnType === "credit" && "active-filter"}`}
            onClick={() => {
              setActive("credit");
              setSearchParams({ txnType: "credit" });
            }}
          >
            Credit
          </button>
          <button
            className={`filter ${txnType === "debit" && "active-filter"}`}
            onClick={() => {
              setActive("debit");
              setSearchParams({ txnType: "debit" });
            }}
          >
            Debit
          </button>
        </div>
        {/* <div>
          <div>
            <label>SORT</label>
            <select>
              <option value="Date">Date</option>
              <option value="Amount">Amount</option>
              <option value="Date">Date</option>
            </select>
          </div>
        </div> */}
      </div>
      {TpageStatus === "Loading" && (
        <div style={{ padding: "15px" }}>
          <LoaderView height="280px" />
        </div>
      )}

      {TpageStatus === "Success" && SV()}

      {TpageStatus === "Failed" && <FailedView tryAgain={fetchTxns} />}
    </div>
  );
}

export default TransactionRoute;
