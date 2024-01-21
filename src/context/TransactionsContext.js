import { createContext } from "react";

const TransactionsContext = createContext({
  TpageStatus: "",
  PpageStatus: "",
  sevenDaysTxnStatus: "",
  CDStatus: "",
  AllTransactions: [],
  userDetails: [],
  sevenDaysTxn: [],
  CDData: [],
  fetchTxns: () => {},
  fetchSevenDaysTxns: () => {},
  fetchCD: () => {},
  fetchUser: () => {},
  updateTxn: () => {},
  deleteTxn: () => {},
  addTxn: () => {},
});

export default TransactionsContext;
