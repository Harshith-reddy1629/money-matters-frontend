import { useContext } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import TransactionsRouteListItems from "../TransactionsRouteListItems";
import "./index.css";

const TransactionsCard = () => {
  const T = useContext(TransactionsContext);

  const { TpageStatus, AllTransactions } = T;

  return (
    <div className="last-txn-card">
      <h1 className="last-txn">Last Transactions</h1>
      <div>
        <table
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "18px",
            padding: "12px",
          }}
        >
          <tbody>
            {AllTransactions.slice(0, 3).map((each) => (
              <TransactionsRouteListItems item={each} key={each._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsCard;
