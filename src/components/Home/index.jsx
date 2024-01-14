import CreditDebit from "../CreditDebit";
import TransactionsCard from "../TranscationsCard";

import "./index.css";

const Home = () => {
  return (
    <div className="home-container">
      <CreditDebit />

      <TransactionsCard />
    </div>
  );
};

export default Home;
