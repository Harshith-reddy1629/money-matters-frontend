import { useRef, useState } from "react";
import lg from "..//../assets/logo.png";
import verifiedImg from "../../assets/verified.png";

import erImg from "../../assets/errr.webp";

import "./index.css";
import { useParams } from "react-router-dom";

function ResendOtp() {
  const [sentEmail, setSent] = useState(false);
  const [err, setErr] = useState("");
  const [errmsg, setErrmsg] = useState("");

  const { mail } = useParams();

  const mailValue = useRef(0);

  const resendmail = async (e) => {
    e.preventDefault();

    const mailinputValue = mailValue.current.value;

    if (!mailinputValue || mail !== mailinputValue) {
      setErrmsg("Invalid input");
    } else {
      const Url = `https://money-matters-99a1.onrender.com/resend-mail/:${mailinputValue}`;

      try {
        const response = await fetch(Url);

        if (response.ok) {
          const result = response.json();

          setSent(true);
        } else {
          setErr(result.errMsg);
        }
      } catch (error) {
        setErr("Something went wrong");
      }
    }
  };

  return (
    <div className="resend-container">
      {!err && !sentEmail && (
        <div className="resend-input-container ric">
          <img
            height="40px"
            style={{ objectFit: "contain" }}
            src={lg}
            alt="..."
          />
          <p style={{ fontWeight: "600" }}>
            Email is not verified. <br /> Resend verification mail to{" "}
            <span className="mail-t">{mail}</span>{" "}
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
        </div>
      )}
      {!err && sentEmail && (
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
      )}
      {err && !sentEmail && (
        <div className="resend-input-container">
          <img
            style={{ objectFit: "contain" }}
            className="v-image"
            src={erImg}
            alt=".."
          />
          <h2>{err}</h2>
        </div>
      )}
    </div>
  );
}

export default ResendOtp;
