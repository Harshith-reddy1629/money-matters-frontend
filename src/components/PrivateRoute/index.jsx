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
        const sortedData = result.sort(
          (a, b) => new Date(a.txnDate) - new Date(b.txnDate)
        );
        setAllTxns(sortedData.reverse());
      } else {
        setTPageStatus("Failed");
      }
    } catch (error) {
      setTPageStatus("Failed");
    }
  };

  const updateTxn = async (txnValues) => {
    const { _id } = txnValues;

    console.log(_id);

    let url = `https://money-matters-99a1.onrender.com/update-txn/${_id}/`;

    const jwtToken = Cookies.get("jwt_token");
    console.log(txnValues);

    let options = {
      method: "PUT",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txnValues),
    };

    try {
      const response = await fetch(url, options);

      const result = await response.json();

      if (response.ok) {
        toast.success("Transaction Added");
        fetchTxns();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("error");
    }
  };
  const addTxn = async (txnValues) => {
    let url = "https://money-matters-99a1.onrender.com/add-txn/";

    const jwtToken = Cookies.get("jwt_token");
    console.log(txnValues);

    let options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txnValues),
    };

    try {
      const response = await fetch(url, options);

      const result = await response.json();

      if (response.ok) {
        toast.success("Transaction Added");
        fetchTxns();
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
        value={{ TpageStatus, addTxn, AllTransactions, updateTxn }}
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
