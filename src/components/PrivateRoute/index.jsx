// import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import TransactionsContext from "../../context/TransactionsContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

function PrivateRoute() {
  const isAuth = !Cookies.get("jwt_token");

  const [TpageStatus, setTPageStatus] = useState("Loading");
  const [sevenDaysTxnStatus, setSevenDaysTxnStatus] = useState("Loading");
  const [PpageStatus, setPpageStatus] = useState("Loading");
  const [CDStatus, setCdStatus] = useState("Loading");
  const [AllTransactions, setAllTxns] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [sevenDaysTxn, setSevenDaysTxn] = useState([]);
  const [CDData, setCDData] = useState([]);

  // const fetchUserDetails = async ()=>{

  // }

  const fetchSevenDaysTxns = async () => {
    let url = "https://money-matters-99a1.onrender.com/seven-days-txns/";

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
        setSevenDaysTxn(result);
        setSevenDaysTxnStatus("Success");
      } else {
        setSevenDaysTxnStatus("Failed");
      }
    } catch (error) {
      setSevenDaysTxnStatus("Failed");
    }
  };

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
        setTPageStatus("Success");
      } else {
        setTPageStatus("Failed");
      }
    } catch (error) {
      setTPageStatus("Failed");
    }
  };

  const deleteTxn = async (uid) => {
    let url = `https://money-matters-99a1.onrender.com/delete-txn/${uid}/`;

    const jwtToken = Cookies.get("jwt_token");

    let options = {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);

      const result = await response.json();

      if (response.ok) {
        toast.success("Deleted ");
        fetchTxns();
        fetchCDData();
        fetchSevenDaysTxns();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("error");
    }
  };

  const fetchUser = async () => {
    let url = `https://money-matters-99a1.onrender.com/get-user-details`;

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
        setUserDetails(result);
        setPpageStatus("Success");
      } else {
        setPpageStatus("Failed");
      }
    } catch (error) {
      setPpageStatus("Failed");
    }
  };

  const updateTxn = async (txnValues) => {
    const { _id } = txnValues;

    let url = `https://money-matters-99a1.onrender.com/update-txn/${_id}/`;

    const jwtToken = Cookies.get("jwt_token");

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
        fetchCDData();
        fetchSevenDaysTxns();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("error");
    }
  };

  const fetchCDData = async () => {
    const jwtToken = Cookies.get("jwt_token");

    let url =
      "https://money-matters-99a1.onrender.com/credit-debit-transactions/";

    let options = {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);

      const result = await response.json();

      if (response.ok) {
        const CreditAmount = result.find((each) => each._id === "credit") ?? {
          sum: 0,
        };
        const debitAmount = result.find((each) => each._id === "debit") ?? {
          sum: 0,
        };

        setCDData({ CreditAmount, debitAmount });
        setCdStatus("Success");
      } else {
        setCdStatus("Failed");
      }
    } catch (error) {
      setCdStatus("Failed");
    }
  };

  const addTxn = async (txnValues) => {
    let url = "https://money-matters-99a1.onrender.com/add-txn/";

    const jwtToken = Cookies.get("jwt_token");

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
        fetchCDData();
        fetchSevenDaysTxns();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("error");
    }
  };

  useEffect(() => {
    fetchTxns();
    fetchSevenDaysTxns();
    fetchUser();
    fetchCDData();
  }, []);

  if (!isAuth) {
    return (
      <TransactionsContext.Provider
        value={{
          TpageStatus,
          PpageStatus,
          addTxn,
          AllTransactions,
          updateTxn,
          sevenDaysTxn,
          sevenDaysTxnStatus,
          deleteTxn,
          userDetails,
          CDData,
          CDStatus,
        }}
      >
        <div className="container">
          <ToastContainer />
          <Sidebar />
          <div className="Route-con">
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
