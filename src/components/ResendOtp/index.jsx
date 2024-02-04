import { useRef, useState } from "react";
import lg from "..//../assets/logo.png";
import verifiedImg from "../../assets/verified.png";

import erImg from "../../assets/errr.webp";

import "./index.css";
import { Link, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function ResendOtp() {
  const [sentStatus, setSentStatus] = useState({
    status: "initial",
    errmsg: "",
  });

  const [sentEmail, setSent] = useState(false);
  const [err, setErr] = useState("");
  const [errmsg, setErrmsg] = useState("");

  const mailValue = useRef(0);

  const resendmail = async (e) => {
    e.preventDefault();

    const mailinputValue = mailValue.current.value;

    if (!mailinputValue) {
      setErrmsg("Invalid input");
      setSentStatus({ errmsg: "Please enter your mail" });
    } else {
      setSentStatus({ status: "sending" });
      const Url = `https://money-matters-99a1.onrender.com/resend-mail/${mailinputValue}`;

      try {
        const response = await fetch(Url);

        const result = await response.json();
        if (response.ok) {
          setSent(true);
          setSentStatus({ status: "success" });
        } else {
          setSentStatus({ status: "initial", errmsg: "Invalid mail address" });
          setErr(result.errMsg.toUpperCase());
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
          <p style={{ fontWeight: "600" }}>
            Enter your email to resend verification link to your mail
          </p>
          <form
            onFocus={() => setSentStatus({ errmsg: "" })}
            onSubmit={resendmail}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input
              ref={mailValue}
              id="mailinput"
              placeholder="Confirm your mail"
              className="resend-input"
              type="email"
            />
            <p className="mail-er-txt">{sentStatus.errmsg}</p>
            <button type="submit" className="resend-button">
              {" "}
              Resend mail
            </button>
          </form>
        </>
        {sentStatus.status === "sending" && (
          <div className="loader-class">
            <Oval
              color=" #505887"
              secondaryColor=" #50588730"
              strokeWidth={4}
              height={40}
            />
          </div>
        )}
        {sentStatus.status === "success" && (
          <div className="loader-class resend-success">
            <img
              src={verifiedImg}
              alt=".."
              height={65}
              style={{ objectFit: "contain" }}
            />
            <p>Mail Sent, Please verify and login </p>
            <Link
              className="link-resend"
              style={{ paddingInline: "50px" }}
              to="/login"
            >
              Login
            </Link>
          </div>
        )}
        {/* {!err && !sentEmail && (
          <>
            <p style={{ fontWeight: "600" }}>
              Enter your email to resend verification link to your mail
            </p>
            <form
              onSubmit={resendmail}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <input
                ref={mailValue}
                id="mailinput"
                placeholder="Confirm your mail"
                className="resend-input"
                type="email"
              />
              <p className="mail-er-txt">{errmsg}</p>
              <button type="submit" className="resend-button">
                {" "}
                Resend mail
              </button>
            </form>
          </>
        )} */}
        {/* {!err && sentEmail && (
          <div className="resend-input-container">
            <img
              className="v-image"
              style={{ objectFit: "contain" }}
              src={verifiedImg}
              alt=".."
            />
            <h2 style={{ fontFamily: "revert", letterSpacing: "1px" }}>
              MAIL SENT{" "}
            </h2>
          </div>
        )} */}
        {/* {err && !sentEmail && (
          <div className="resend-input-container">
            <img
              style={{ objectFit: "contain" }}
              className="v-image"
              src={erImg}
              alt=".."
            />
            <h2>{err}</h2>
          </div>
        )} */}
      </div>{" "}
    </div>
  );
}

export default ResendOtp;
