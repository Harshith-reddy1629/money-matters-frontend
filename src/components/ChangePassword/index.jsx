import { useRef, useState } from "react";

import lg from "..//../assets/logo.png";

import verifiedImg from "../../assets/verified.png";

import erImg from "../../assets/errr.webp";

import { Link, useParams } from "react-router-dom";

import { Oval } from "react-loader-spinner";

import "./index.css";
import Loader from "../Loader";

function ChangePasword() {
  const [sentStatus, setSentStatus] = useState({
    status: "initial",
    errmsg: "",
  });

  const [sentEmail, setSent] = useState(false);
  const [err, setErr] = useState("");
  const [errmsg, setErrmsg] = useState("");

  const { id } = useParams();

  const newpasswordform = useRef(0);

  const resendmail = async (e) => {
    e.preventDefault();

    const { password, confirmpassword } = newpasswordform.current;

    if (!password.value || !confirmpassword.value) {
      setErrmsg("Invalid input");
      setSentStatus({ errmsg: "Please enter your password" });
    } else {
      setSentStatus({ status: "sending" });
      const Url = `https://money-matters-99a1.onrender.com/change-password/${id}`;

      const options = {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: password.value }),
      };
      try {
        if (confirmpassword.value === password.value) {
          const response = await fetch(Url, options);

          const result = await response.json();
          if (response.ok) {
            setSent(true);
            setSentStatus({ status: "success" });
          } else {
            setSentStatus({
              status: "initial",
              errmsg: result.errMsg,
            });
            setErr(result.errMsg.toUpperCase());
          }
        } else {
          setErrmsg("Invalid input");
          setSentStatus({ errmsg: "Both inputs should be same" });
        }
      } catch (error) {
        setErr("Something went wrong");
        setSentStatus({
          status: "internetErr",
          errmsg: "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="resend-container">
      <div
        style={{ position: "relative" }}
        className="resend-input-container ric"
      >
        {" "}
        <Link to="/">
          <img
            height="40px"
            style={{ objectFit: "contain" }}
            src={lg}
            alt="..."
          />
        </Link>
        <>
          <h2
            style={{
              fontWeight: "600",
              opacity: "0.8",
              fontFamily: "monospace",
            }}
          >
            Change password
          </h2>
          <form
            ref={newpasswordform}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onFocus={() => setSentStatus({ errmsg: "" })}
            onSubmit={resendmail}
          >
            {" "}
            {sentStatus.errmsg && (
              <p
                className="mail-er-txt"
                style={{
                  backgroundColor: "#ff000020",
                  borderRadius: "4px",
                  padding: "8px 6px",
                  borderLeft: "4px solid #ff0000aa",
                }}
              >
                {sentStatus.errmsg}
              </p>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "13px",
                  marginBottom: "3px",
                  color: "var(--theme-color)",
                  fontWeight: "bold",
                }}
              >
                New password
              </label>
              <input
                id="password"
                placeholder="New password"
                className="resend-input"
                type="password"
                style={{ width: "100%" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "13px",
                  marginBottom: "3px",
                  color: "var(--theme-color)",
                  fontWeight: "bold",
                }}
              >
                Confirm new password
              </label>
              <input
                id="confirmpassword"
                placeholder="Confirm new password"
                className="resend-input"
                type="password"
                style={{ width: "100%" }}
              />
            </div>
            <button type="submit" className="resend-button">
              {" "}
              Update password
            </button>{" "}
          </form>
        </>
        {sentStatus.status === "sending" && <Loader />}
        {sentStatus.status === "success" && (
          <div className=" resend-success">
            <img
              src={verifiedImg}
              alt=".."
              height={65}
              style={{ objectFit: "contain" }}
            />
            <h4>Mail Sent, Please verify and login </h4>
            <Link
              className="link-resend"
              style={{ paddingInline: "50px" }}
              to="/login"
            >
              Login
            </Link>
          </div>
        )}
      </div>{" "}
    </div>
  );
}

export default ChangePasword;
