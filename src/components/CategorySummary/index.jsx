import { useContext } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import CategoryTiles from "../CategoryTiles";

import "./index.css";
import LoaderView from "../LoaderView";

const CategoryTypes = [
  "Salary",
  "Food",
  "Books",
  "Bills",
  "Travel",
  "Shopping",
  "Materials",
  "Medical",
  "Grocery",
  "Transfer",
  "Fee",
  "Rent",
  "Other",
].sort();

function CategorySummary() {
  const { TpageStatus, AllTransactions } = useContext(TransactionsContext);
  const T = {};
  const K = CategoryTypes.map(
    (e) => (T[e] = AllTransactions.filter((each) => each.Category === e))
  );

  return (
    <div className="category-container">
      {TpageStatus === "Success" &&
        Object.entries(T).map((e) => <CategoryTiles items={e} key={e[0]} />)}
      {TpageStatus === "Loading" &&
        CategoryTypes.map((e) => (
          <LoaderView key={e} height="100px"></LoaderView>
        ))}
    </div>
  );
}

export default CategorySummary;
