import { Component } from "react";

import Cookies from "js-cookie";

import DebitBox from "../DebitBox";
import CreditBox from "../CreditBox";

import "./index.css";
import FailedView from "../FailedView";
import LoaderView from "../LoaderView";

const creditDebitStatus = {
  Loading: "LOADING",
  Succcess: "SUCCESS",
  Failed: "FAILED",
};

class CreditDebit extends Component {
  state = {
    status: "LOADING",
    CreditAmountData: [],
    DebitAmountData: [],
    userCreds: {},
  };

  componentDidMount() {
    this.fetchCDData();
  }

  tryAgain = () => {
    this.fetchCDData();
  };

  fetchCDData = async () => {
    this.setState({ status: creditDebitStatus.Loading });

    let url =
      "https://money-matters-99a1.onrender.com/credit-debit-transactions/";

    let options = {
      method: "GET",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZGR5MTIzIiwiaWQiOiI2NTlhZDY1OWQ5OWU1MzRmZDJhYzBlMjYiLCJuYW1lIjoiSGFyc2hpdGgiLCJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWF0IjoxNzA0ODIwNjM3fQ.QkSTFKtacd4vM4H-2ERGSRJ95j2Y6hMUiU7BRne4JZo",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      console.log(response.ok);

      const result = await response.json();
      console.log(result);

      const data = result;

      console.log(data);

      const creditAmount = data.find((each) => each._id === "credit");
      const debitAmount = data.find((each) => each._id === "debit");

      this.setState({
        status: creditDebitStatus.Succcess,
        CreditAmountData:
          creditAmount !== undefined ? creditAmount : { sum: 0 },
        DebitAmountData: debitAmount !== undefined ? debitAmount : { sum: 0 },
      });
    } catch (error) {
      this.setState({ status: creditDebitStatus.Failed });
    }
  };

  successView = () => {
    const { DebitAmountData, CreditAmountData } = this.state;

    return (
      <div className="creditdebit-container">
        <CreditBox Creditdata={CreditAmountData} />
        <DebitBox Debitdata={DebitAmountData} />
      </div>
    );
  };

  failedView = () => (
    <div>
      <FailedView tryAgain={this.tryAgain} />
    </div>
  );

  render() {
    const { status } = this.state;

    switch (status) {
      case creditDebitStatus.Loading:
        return (
          <div className="loader">
            <LoaderView />
          </div>
        );
      case creditDebitStatus.Succcess:
        return this.successView();

      case creditDebitStatus.Failed:
        return this.failedView();

      default:
        return null;
    }
  }
}

export default CreditDebit;
