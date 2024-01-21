import LogoutBtn from "../LogoutBtn";

import "./index.css";
import { useContext } from "react";
import TransactionsContext from "../../context/TransactionsContext";

const ProfileBox = () => {
  const { userDetails } = useContext(TransactionsContext);
  const { name, email } = userDetails;

  return (
    <div className="user-profile">
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

      <LogoutBtn className="logout" />
    </div>
  );
};

export default ProfileBox;
