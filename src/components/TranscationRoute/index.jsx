// import TransactionRouteList from "../TransactionRouteList";
// import Cookies from "js-cookie";
// import { Navigate } from "react-router-dom";
// import Sidebar from "../Sidebar";
// import Navbar from "../Navbar";

import { useContext, useState } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import TransactionsRouteListItems from "../TransactionsRouteListItems";
import "./index.css";
import EmptyView from "../EmptyView";
import LoaderView from "../LoaderView";
import FailedView from "../FailedView";
import { useParams, useSearchParams } from "react-router-dom";
import { LuUserSquare } from "react-icons/lu";

function TransactionRoute() {
  const T = useContext(TransactionsContext);
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  const sort_by = searchParams.get("sort_by") ?? "Date";
  const sort_wise = searchParams.get("sort_wise") ?? "asc";
  const txnType = searchParams.get("txnType") ?? "All";
  const category = searchParams.get("category") ?? "All";
  const filter = searchParams.get("filter") ?? "All";

  // const { sort } = useParams();
  console.log(txnType);
  // const [activeFilter, setActive] = useState("All");

  const { TpageStatus, AllTransactions, fetchTxns } = T;

  const filteredData = AllTransactions.filter((each) => {
    if (txnType === "All") {
      return true;
    }
    return each.TxnType === txnType;
  })
    .filter((eachT) => {
      if (category === "All") {
        return true;
      } else {
        return eachT.Category === category;
      }
    })
    .sort((a, b) => {
      if (sort_by === "Amount") {
        if (sort_wise === "asc") {
          return a.Amount - b.Amount;
        }
        return b.Amount - a.Amount;
      } else {
        if (sort_wise === "dsc") {
          return new Date(a.txnDate) - new Date(b.txnDate);
        }
        return 0;
      }
    });
  const SV = () => (
    <div className="txn-table-container">
      {filteredData.length !== 0 ? (
        <table className="table">
          <thead style={{}}>
            <tr style={{ color: "#252525" }}>
              <th style={{}}>Transaction Name</th>
              <th style={{}}>Type</th>
              <th style={{}}> Amount</th>
              <th style={{}}>Date</th>
              <th style={{}}>Update</th>
              <th style={{}}>Delete</th>
            </tr>
          </thead>
          <tbody style={{}}>
            {filteredData.map((each) => (
              <TransactionsRouteListItems item={each} key={each._id} />
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyView />
      )}
    </div>
  );

  return (
    <div className="txn-route-container">
      <div className="filter-container">
        <div className="txn-filter">
          <button
            className={`filter ${txnType === "All" && "active-filter"}`}
            onClick={() => {
              setSearchParams({
                sort_wise,
                sort_by,
                filter,
                category,
                txnType: "All",
              });
            }}
          >
            All Transactions
          </button>
          <button
            className={`filter ${txnType === "credit" && "active-filter"}`}
            onClick={() => {
              setSearchParams({
                sort_wise,
                filter,
                sort_by,
                category,
                txnType: "credit",
              });
            }}
          >
            Credit
          </button>
          <button
            className={`filter ${txnType === "debit" && "active-filter"}`}
            onClick={() => {
              setSearchParams({
                sort_wise,
                filter,
                sort_by,
                category,
                txnType: "debit",
              });
            }}
          >
            Debit
          </button>
        </div>
        <div className="filter-sector">
          <div>
            <label className="sort-label">Filter </label>
            <select
              id="Category"
              placeholder="Select Transaction Type"
              className="add-txn-input"
              defaultValue={category}
              // value={category}
              onChange={(e) =>
                setSearchParams({
                  sort_by,
                  filter,
                  sort_wise,
                  txnType,
                  category: e.target.value,
                })
              }
            >
              <option value="All">All</option>
              <option value="Bills">Bills</option>
              <option value="Books">Books</option>
              <option value="Fee">Fee</option>
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>

              <option value="Shopping">Shopping</option>

              <option value="Materials">Materials</option>

              <option value="Medical">Medical</option>

              <option value="Transfer">Transfer</option>

              <option value="Travel">Travel</option>

              <option value="Rent">Rent</option>

              <option value="Salary">Salary</option>

              <option value="Other"> Other</option>
            </select>
          </div>
          <div>
            <label className="sort-label">Sort </label>
            <select
              defaultValue={sort_by}
              // value={sort_by}
              onChange={(e) =>
                setSearchParams({
                  filter,
                  txnType,
                  category,
                  sort_wise,
                  sort_by: e.target.value,
                })
              }
              className="add-txn-input"
            >
              <option value="Date">Date</option>
              <option value="Amount">Amount</option>
            </select>
          </div>
          <div>
            <label className="sort-label">By </label>
            {sort_by === "Amount" && (
              <select
                defaultValue={sort_wise}
                // value={sort_wise}
                onChange={(e) =>
                  setSearchParams({
                    filter,
                    txnType,
                    category,
                    sort_wise: e.target.value,
                    sort_by,
                  })
                }
                className="add-txn-input"
              >
                <option value="asc">Low-High</option>
                <option value="dsc">High-Low</option>
              </select>
            )}
            {sort_by === "Date" && (
              <select
                defaultValue={sort_wise}
                // value={sort_wise}
                onChange={(e) =>
                  setSearchParams({
                    filter,
                    txnType,
                    category,
                    sort_wise: e.target.value,
                    sort_by,
                  })
                }
                className="add-txn-input"
              >
                <option value="asc">Recent</option>
                <option value="dsc">Oldest</option>
              </select>
            )}
          </div>
        </div>
      </div>
      {TpageStatus === "Loading" && (
        <div style={{ padding: "15px" }}>
          <LoaderView height="280px" />
        </div>
      )}

      {TpageStatus === "Success" && SV()}

      {TpageStatus === "Failed" && <FailedView tryAgain={fetchTxns} />}
    </div>
  );
}

export default TransactionRoute;
