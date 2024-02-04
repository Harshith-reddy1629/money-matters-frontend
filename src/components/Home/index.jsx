import CategorySummary from "../CategorySummary";
import ChartCard from "../ChartCard";
import CreditDebit from "../CreditDebit";
import TransactionsCard from "../TranscationsCard";

import "./index.css";

const Home = () => {
  return (
    <div className="home-container">
      <CreditDebit />

      <CategorySummary />

      <TransactionsCard />

      <ChartCard />
    </div>
  );
};

export default Home;
