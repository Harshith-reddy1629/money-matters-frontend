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
  fetchCDData: () => {},
  fetchUser: () => {},
  updateTxn: () => {},
  deleteTxn: () => {},
  addTxn: () => {},
});

export default TransactionsContext;
