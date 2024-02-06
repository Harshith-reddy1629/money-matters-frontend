import { BsCurrencyRupee } from "react-icons/bs";

import "./index.css";
import { useNavigate } from "react-router-dom";

const CreditBox = (props) => {
  const { Creditdata } = props;

  const { sum } = Creditdata;

  const navigate = useNavigate();

  return (
    <div
      className="credit-container"
      onClick={() =>
        navigate(
          "/transactions?txnType=credit&sort_by=Date&sort_wise=asc&category=All&filter=All"
        )
      }
    >
      <div className="credit-amount-container">
        <h1 className="credit-amount-text">
          <BsCurrencyRupee />
          {sum}
        </h1>
        <p className="credit-text">Credit</p>
      </div>
      <div className="credit-image-container">
        <img
          src="https://res.cloudinary.com/reddyimgs/image/upload/v1690551063/Group_fnu7wc.png"
          alt="credit"
          className="credit-image"
        />
      </div>
    </div>
  );
};
export default CreditBox;
