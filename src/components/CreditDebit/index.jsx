import DebitBox from "../DebitBox";

import CreditBox from "../CreditBox";

import FailedView from "../FailedView";

import LoaderView from "../LoaderView";

import { useContext } from "react";

import TransactionsContext from "../../context/TransactionsContext";

import "./index.css";
import TotalCard from "../TotalCard";

const CreditDebit = () => {
  const { CDData, CDStatus, fetchCDData } = useContext(TransactionsContext);

  const { CreditAmount, debitAmount } = CDData;

  const successView = () => {
    return (
      <div>
        <TotalCard data={CDData} />
        <div className="creditdebit-container">
          <CreditBox Creditdata={CreditAmount} />
          <DebitBox Debitdata={debitAmount} />
        </div>
      </div>
    );
  };

  switch (CDStatus) {
    case "Loading":
      return (
        <div className="loader">
          <LoaderView height="160px" />
          <LoaderView height="160px" />
        </div>
      );
    case "Success":
      return successView();

    case "Failed":
      return <FailedView tryAgain={fetchCDData} />;

    default:
      return null;
  }
};

export default CreditDebit;
