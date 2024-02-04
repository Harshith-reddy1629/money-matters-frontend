import { BsCurrencyRupee } from "react-icons/bs";

import "./index.css";
import { useNavigate } from "react-router-dom";

const DebitBox = (props) => {
  const navigate = useNavigate();
  const { Debitdata } = props;

  const { sum } = Debitdata;

  return (
    <div
      className="credit-container"
      onClick={() => navigate("/transactions?txnType=debit")}
    >
      <div className="credit-amount-container">
        <h1 className="debit-amount-text">
          <BsCurrencyRupee />
          {sum}
        </h1>
        <p className="debit-text">Debit</p>
      </div>
      <div className="credit-image-container">
        <img
          src="https://res.cloudinary.com/reddyimgs/image/upload/v1690551063/Group_1_duvjof.svg"
          alt="debit"
          className="credit-image"
        />
      </div>
    </div>
  );
};

export default DebitBox;
