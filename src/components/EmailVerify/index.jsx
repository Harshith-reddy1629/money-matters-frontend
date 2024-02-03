import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import verifiedImg from "../../assets/verified.png";
import vrfying from "../../assets/ver.png";
import verificationerror from "../../assets/Error.webp";

import "./index.css";

function EmailVerify() {
  const { id } = useParams();
  console.log(id);

  const [verified, setVerified] = useState(false);
  const [err, setErr] = useState("");

  const verifyemail = async () => {
    const Url = `https://money-matters-99a1.onrender.com/verify-email/${id}`;

    try {
      const response = await fetch(Url);

      const result = await response.json();

      if (response.ok) {
        setVerified(true);
      } else {
        setErr("Invalid ");
      }
    } catch (error) {
      setErr("Invalid ");
    }
  };

  useEffect(() => {
    verifyemail();
  });

  return (
    <div className="verifying-container">
      {!verified && !err && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img className="v-image" src={vrfying} alt=".." />
          <h1>Verifying...</h1>
        </div>
      )}

      {verified && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img className="v-image" src={verifiedImg} alt=".." />
          <h1>email is verified </h1>
          <Link to="/" className="link-home">
            Home
          </Link>
        </div>
      )}

      {err && !verified && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img className="v-image" src={verificationerror} alt=".." />
          <h1>Invalid link address </h1>
        </div>
      )}
    </div>
  );
}

export default EmailVerify;
