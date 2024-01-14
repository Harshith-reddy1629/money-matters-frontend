// import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import TransactionsContext from "../../context/TransactionsContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    console.log("first");
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
        console.log(result);
        toast.success("Transaction Added");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("error");
    }
  };

  useEffect(() => {
    fetchTxns();
  }, []);

  if (!isAuth) {
    return (
      <TransactionsContext.Provider
        value={{ TpageStatus, addTxn, AllTransactions }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Sidebar />
          <ToastContainer />
          <div style={{ flexGrow: 1 }}>
            <Navbar />
            <Outlet />
          </div>
        </div>
      </TransactionsContext.Provider>
    );
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
