import { createContext } from "react";

const TransactionsContext = createContext({
  TpageStatus: "",
  PpageStatus: "",
  sevenDaysTxnStatus: "",
  AllTransactions: [],
  updateTxn: () => {},
  deleteTxn: () => {},
  sevenDaysTxn: [],
  addTxn: () => {},
  userDetails: [],
});

export default TransactionsContext;
