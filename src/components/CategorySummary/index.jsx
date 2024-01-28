import { useContext } from "react";
import TransactionsContext from "../../context/TransactionsContext";

function CategorySummary() {
  const { AllTransactions } = useContext(TransactionsContext);

  return <div>1</div>;
}

export default CategorySummary;
