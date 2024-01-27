import { useContext } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import TransactionsRouteListItems from "../TransactionsRouteListItems";
import LoaderView from "../LoaderView";
import FailedView from "../FailedView";
import EmptyView from "../EmptyView";
import "./index.css";

const TransactionsCard = () => {
  const T = useContext(TransactionsContext);

  const { TpageStatus, AllTransactions, fetchTxns } = T;

  const SV = () => (
    <div className="txns-list-container-div">
      {AllTransactions.length !== 0 ? (
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
          <tbody>
            {AllTransactions.slice(0, 3).map((each) => (
              <TransactionsRouteListItems item={each} key={each._id} />
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyView />
      )}
    </div>
  );

  const displayView = () => {
    switch (TpageStatus) {
      case "Loading":
        return <LoaderView height="200px" />;
      case "Success":
        return SV();
      case "Failed":
        return <FailedView tryAgain={fetchTxns} />;

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
