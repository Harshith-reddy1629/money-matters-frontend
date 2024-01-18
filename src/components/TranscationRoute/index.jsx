// import TransactionRouteList from "../TransactionRouteList";
// import Cookies from "js-cookie";
// import { Navigate } from "react-router-dom";
// import Sidebar from "../Sidebar";
// import Navbar from "../Navbar";

import { useContext } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import TransactionsRouteListItems from "../TransactionsRouteListItems";
import "./index.css";

function TransactionRoute() {
  const T = useContext(TransactionsContext);

  const { TpageStatus, AllTransactions } = T;

  return (
    <div className="txn-route">
      <table
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "18px",
          padding: "12px",
        }}
      >
        <tbody>
          {AllTransactions.map((each) => (
            <TransactionsRouteListItems item={each} key={each._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionRoute;
