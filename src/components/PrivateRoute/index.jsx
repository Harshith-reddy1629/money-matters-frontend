// import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import store from "../../store/store";

import Sidebar from "../Sidebar";

import Navbar from "../Navbar";

import Cookies from "js-cookie";

import { useEffect, useState } from "react";

import TransactionsContext from "../../context/TransactionsContext";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import { fetchData } from "../../Slice/slice";
import { useDispatch } from "react-redux";

function PrivateRoute() {
  const isAuth = !Cookies.get("jwt_token");

  // const [userTransactions, setUserTransactions] = useState({
  //   status: "Loading",
  //   AllTransactions: [],
  // });

  // const [sevenDaysTransactions, setSevenDaysTransactions] = useState({
  //   status: "Loading",
  //   sevenDaysTxn: [],
  // });

  // const [userdetails, setUserdetails] = useState({
  //   status: "Loading",
  //   CDData: [],
  // });

  // const [creditDebitData, setCreditDebitData] = useState({
  //   status: "Loading",
  //   userDetails: [],
  // });

  const dispatch = useDispatch();

  const [TpageStatus, setTPageStatus] = useState("Loading");

  const [sevenDaysTxnStatus, setSevenDaysTxnStatus] = useState("Loading");

  const [PpageStatus, setPpageStatus] = useState("Loading");

  const [CDStatus, setCdStatus] = useState("Loading");

  const [AllTransactions, setAllTxns] = useState([]);

  const [userDetails, setUserDetails] = useState([]);

  const [sevenDaysTxn, setSevenDaysTxn] = useState([]);

  const [CDData, setCDData] = useState([]);

  const baseUrl = import.meta.env.VITE_MY_API;

  const fetchSevenDaysTxns = async () => {
    let url = baseUrl + "/seven-days-txns/";

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
    let url = baseUrl + "/all-transactions/";

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
    let url = `${baseUrl}/delete-txn/${uid}/`;

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
        fetchTxns();
        fetchCDData();
        fetchSevenDaysTxns();
        toast.success("Deleted ");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("error");
    }
  };

  const fetchUser = async () => {
    setPpageStatus("Loading");
    let url = baseUrl + `/get-user-details`;

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

    let url = baseUrl + `/update-txn/${_id}/`;

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
        fetchTxns();
        fetchSevenDaysTxns();
        fetchCDData();
        toast.success("Transaction Updated");
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("error");
    }
  };

  const fetchCDData = async () => {
    const jwtToken = Cookies.get("jwt_token");

    let url = baseUrl + "/credit-debit-transactions/";

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
    let url = baseUrl + "/add-txn/";

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

      // const result = await response.json();

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
    dispatch(fetchData());
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
          fetchCDData,
          fetchTxns,
          fetchUser,
          fetchSevenDaysTxns,
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
