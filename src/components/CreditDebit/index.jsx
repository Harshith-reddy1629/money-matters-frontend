import DebitBox from "../DebitBox";

import CreditBox from "../CreditBox";

import FailedView from "../FailedView";

import LoaderView from "../LoaderView";

import { useContext } from "react";

import TransactionsContext from "../../context/TransactionsContext";

import "./index.css";

const CreditDebit = () => {
  const { CDData, CDStatus, fetchCD } = useContext(TransactionsContext);

  const { CreditAmount, debitAmount } = CDData;

  console.log(CDData, CDStatus);

  const successView = () => {
    return (
      <div className="creditdebit-container">
        <CreditBox Creditdata={CreditAmount} />
        <DebitBox Debitdata={debitAmount} />
      </div>
    );
  };

  switch (CDStatus) {
    case "Loading":
      return (
        <div className="loader">
          <LoaderView />
        </div>
      );
    case "Success":
      return successView();

    case "Failed":
      return <FailedView tryAgain={fetchCD} />;

    default:
      return null;
  }
};

export default CreditDebit;
