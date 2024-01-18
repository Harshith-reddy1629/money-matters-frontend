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

    const jwtToken = Cookies.get("jwt_token");

    let url =
      "https://money-matters-99a1.onrender.com/credit-debit-transactions/";

    let options = {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);

      const result = await response.json();

      const data = result;

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
