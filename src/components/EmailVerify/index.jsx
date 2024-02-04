import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import verifiedImg from "../../assets/verified.png";
import vrfying from "../../assets/ver.png";
import verificationerror from "../../assets/Error.webp";
import logo from "../../assets/logo.png";

import "./index.css";
import { MagnifyingGlass } from "react-loader-spinner";

function EmailVerify() {
  const { id } = useParams();

  const [verifyingStatus, setVerifyingStatus] = useState({
    status: "initial",
    errMsg: "",
  });

  const verifyemail = async () => {
    setVerifyingStatus({ status: "verifying" });

    const Url = `https://money-matters-99a1.onrender.com/verify-email/${id}`;

    try {
      const response = await fetch(Url);

      const result = await response.json();

      if (response.ok) {
        setVerifyingStatus({ status: "success" });
      } else {
        setVerifyingStatus({ status: "failed", errMsg: result.errMsg });
      }
    } catch (error) {
      setVerifyingStatus({
        status: "failed",
        errMsg: "Something went wrong",
      });
    }
  };

  return (
    <div className="verifying-container">
      <div className="verifying-container-card">
        <Link to="/">
          <img src={logo} alt="." height={35} />
        </Link>
        {verifyingStatus.status === "initial" && (
          <>
            <h4>Click here to verify Your email</h4>
            <button onClick={verifyemail} type="button" className="verify-btn">
              VERIFY
            </button>
          </>
        )}
        {verifyingStatus.status === "verifying" && (
          <>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
            <h4>Verifying...</h4>
          </>
        )}{" "}
        {verifyingStatus.status === "success" && (
          <>
            <img
              height={65}
              style={{ objectFit: "contain" }}
              src={verifiedImg}
              alt=".."
            />
            <h4>Your email is verified</h4>
            <Link
              to="/login"
              style={{ paddingInline: "30px" }}
              className="link-home"
            >
              Login
            </Link>
          </>
        )}
        {verifyingStatus.status === "failed" && (
          <>
            <img height={60} src={verificationerror} alt=".." />
            {/* <h4>Invalid link address </h4> */}
            <h4>{verifyingStatus.errMsg}</h4>
            <button
              className="verify-retry-btn"
              onClick={() =>
                setVerifyingStatus({ status: "initial", errMsg: "" })
              }
            >
              Retry
            </button>
          </>
        )}{" "}
      </div>
    </div>
  );
}

export default EmailVerify;
