import { LuAlertTriangle } from "react-icons/lu";

import "./index.css";

const FailedView = (props) => {
  const { tryAgain } = props;
  const onTryAgain = () => {
    tryAgain();
  };

  return (
    <div className="failed-container">
      <LuAlertTriangle size={35} />
      <button className="failed-btn" onClick={onTryAgain}>
        Try Again
      </button>
    </div>
  );
};

export default FailedView;
