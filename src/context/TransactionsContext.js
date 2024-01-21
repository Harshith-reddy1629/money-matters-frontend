import { createContext } from "react";

const TransactionsContext = createContext({
  TpageStatus: "",
  PpageStatus: "",
  sevenDaysTxnStatus: "",
  AllTransactions: [],
  userDetails: [],
  sevenDaysTxn: [],
  fetchTxns: () => {},
  fetchSevenDaysTxns: () => {},
  fetchUser: () => {},
  updateTxn: () => {},
  deleteTxn: () => {},
  addTxn: () => {},
});

export default TransactionsContext;
