// import { useContext } from "react";
// import TransactionsContext from "../../context/TransactionsContext";
import "./index.css";

const TransactionsCard = () => {
  // const T = useContext(TransactionsContext);

  // const { addTxn } = T;

  // const Ad = () => {
  //   const V = {
  //     txnName: "f",
  //     TxnType: "credit",
  //     Amount: 1200,
  //     Category: "food",
  //   };
  //   addTxn(V);
  // };
  return (
    <div className="last-txn-card">
      <h1 className="last-txn">Last Transactions</h1>
      {/* <button onClick={Ad}>ADD</button> */}
    </div>
  );
};

export default TransactionsCard;
