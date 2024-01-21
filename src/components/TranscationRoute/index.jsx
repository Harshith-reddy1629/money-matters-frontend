// import TransactionRouteList from "../TransactionRouteList";
// import Cookies from "js-cookie";
// import { Navigate } from "react-router-dom";
// import Sidebar from "../Sidebar";
// import Navbar from "../Navbar";

import { useContext } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import TransactionsRouteListItems from "../TransactionsRouteListItems";
import "./index.css";
import EmptyView from "../EmptyView";

function TransactionRoute() {
  const T = useContext(TransactionsContext);

  const { TpageStatus, AllTransactions } = T;

  return (
    <div className="txn-route-container">
      {AllTransactions.length !== 0 ? (
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
            {AllTransactions.map((each) => (
              <TransactionsRouteListItems item={each} key={each._id} />
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyView />
      )}
    </div>
  );
}

export default TransactionRoute;
