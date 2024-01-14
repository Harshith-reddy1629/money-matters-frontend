// import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function PrivateRoute() {
  const isAuth = !Cookies.get("jwt_token");

  const [TpageStatus, setTPageStatus] = useState("Loading");
  const [PpageStatus, setPpageStatus] = useState("Loading");
  const [AllTransactions, setAllTxns] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  // const fetchUserDetails = async ()=>{

  // }

  const fetchTxns = async () => {
    let url = "https://money-matters-99a1.onrender.com/all-transactions/";

    const jwtToken = Cookies.get("jwt_token");

    let options = {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(url, options);

      const result = await response.json();

      if (response.ok) {
        setAllTxns(result);
      } else {
        setTPageStatus("Failed");
      }
    } catch (error) {
      setTPageStatus("Failed");
    }

    fetch(url, options);
  };

  const addTxn = async (txnValues) => {
    let url = "https://money-matters-99a1.onrender.com/add-txn/";

    const jwtToken = Cookies.get("jwt_token");

    let options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txnValues),
    };

    try {
      const response = await fetch(url, options);

      const result = await response.json();

      if (response.ok) {
        NotificationManager.success("Transaction added successfully", "ADDED");
      } else {
        NotificationManager.error("Error");
      }
    } catch (error) {
      NotificationManager.error("Error");
    }
  };

  useEffect(() => {
    fetchTxns();
  }, []);

  if (!isAuth) {
    return (
      <TransactionsContext.Provider value={{}}>
        <div
          style={{
            display: "flex",
          }}
        >
          <Sidebar />
          <div style={{ flexGrow: 1 }}>
            <Navbar />
            <Outlet />
            <NotificationContainer />
          </div>
        </div>
      </TransactionsContext.Provider>
    );
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
