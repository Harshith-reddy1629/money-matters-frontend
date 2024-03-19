import { useRef, useState } from "react";

import lg from "..//../assets/logo.png";

import verifiedImg from "../../assets/verified.png";

import erImg from "../../assets/errr.webp";

import { Link, useParams } from "react-router-dom";

import { Oval } from "react-loader-spinner";

import Loader from "../Loader";

function ForgotPassword() {
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
      const Url = `https://money-matters-99a1.onrender.com/allow-change-password`;
      const options = {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: mailinputValue }),
      };
      try {
        const response = await fetch(Url, options);

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
            Enter your email to reset your password
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
        {sentStatus.status === "sending" && <Loader />}
        {sentStatus.status === "success" && (
          <div className=" resend-success">
            <img
              src={verifiedImg}
              alt=".."
              height={65}
              style={{ objectFit: "contain" }}
            />
            <h4>reset link sent to your mail, check your mail </h4>
          </div>
        )}
      </div>{" "}
    </div>
  );
}

export default ForgotPassword;
