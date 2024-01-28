import LogoutBtn from "../LogoutBtn";

import "./index.css";
import { useContext } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import LoaderView from "../LoaderView";

const ProfileBox = () => {
  const { userDetails, PpageStatus, fetchUser } =
    useContext(TransactionsContext);
  const { name, email } = userDetails;

  return (
    <div className="user-profile">
      {PpageStatus === "Success" && (
        <div className="profile-box">
          <img
            src="https://res.cloudinary.com/reddyimgs/image/upload/v1687011162/Avatar_zhzj4v.png"
            alt="profile"
            className="ig"
          />

          <div className="user-info">
            <h1 className="user-text">{name}</h1>

            <p className="email-text">{email}</p>
          </div>
        </div>
      )}
      {PpageStatus === "Loading" && (
        <div className="profile-box">
          <LoaderView height="50px" />
        </div>
      )}
      {PpageStatus === "Failed" && (
        <button
          onClick={fetchUser}
          style={{
            padding: "10px",
            width: "100%",
            border: "1px solid  rgb(233, 18, 18)",
            color: " rgb(233, 18, 18)",
            borderRadius: "5px",
            fontWeight: "600",
          }}
        >
          Try Again
        </button>
      )}
      <LogoutBtn className="logout" />
    </div>
  );
};

export default ProfileBox;
