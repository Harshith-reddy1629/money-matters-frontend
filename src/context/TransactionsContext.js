import { createContext } from "react";

const TransactionsContext = createContext({
  TpageStatus: "",
  PpageStatus: "",
  AllTransactions: [],
  updateTxn: () => {},
  deleteTxn: () => {},
  addTxn: () => {},
  userDetails: [],
});

export default TransactionsContext;
