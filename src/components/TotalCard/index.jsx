import React from "react";

import "./index.css";
import { BsCurrencyRupee } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function TotalCard({ data }) {
  const { CreditAmount, debitAmount } = data;
  const navigate = useNavigate();

  const Total = CreditAmount.sum - debitAmount.sum;
  return (
    <div
      className="total"
      style={{ alignItems: "center" }}
      onClick={() =>
        navigate(
          "/transactions?txnType=All&sort_by=Date&sort_wise=asc&category=All&filter=All"
        )
      }
    >
      <div className="total-amount-container">
        {" "}
        <p className="credit-text">Total</p>
        <h1
          style={{
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            color: `${Total > 0 ? "#16dbaa" : "#fe5c73"}`,
            // padding: "3px 8px",
            // border: `2px solid ${Total > 0 ? "#16dbaa" : "#fe5c73"}`,
            width: "fit-content",
            borderRadius: "6px",
          }}
        >
          <BsCurrencyRupee />
          {Total}
        </h1>
      </div>
      <p style={{ display: "block", color: "#718ebf", fontSize: "13px" }}>
        {" "}
        {Total < 0 ? "Expenses Exceeded" : "You're on right track"}
      </p>
    </div>
  );
}

export default TotalCard;
