import "./index.css";

import E from "../../assets/txnL.png";

const EmptyView = () => (
  <div className="empty-view">
    <img src={E} alt="empty view" className="empty-view-image" />

    <h1 className="no-txns-text">No Transactions Found</h1>
  </div>
);

export default EmptyView;
