import LogoutBtn from "../LogoutBtn";

import "./index.css";
import { useContext } from "react";
import TransactionsContext from "../../context/TransactionsContext";
import LoaderView from "../LoaderView";

const ProfileBox = () => {
  const { userDetails, PpageStatus } = useContext(TransactionsContext);
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
          <LoaderView height="30px" />
        </div>
      )}
      <LogoutBtn className="logout" />
    </div>
  );
};

export default ProfileBox;
