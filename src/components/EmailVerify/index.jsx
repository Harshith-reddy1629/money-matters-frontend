import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EmailVerify() {
  const { id } = useParams();

  const [verified, setVerified] = useState(false);
  const [err, setErr] = useState("");

  const verifyemail = async () => {
    const Url = `https://money-matters-99a1.onrender.com//verify-email/${id}`;

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
    <div>
      {!verified && !err && <h1>verifying</h1>}

      {verified && <h1>email is verified </h1>}

      {err && <h1>Invalid link address </h1>}
    </div>
  );
}

export default EmailVerify;
