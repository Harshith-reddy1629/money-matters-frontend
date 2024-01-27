import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import Popup from "reactjs-popup";

import { LuLogOut } from "react-icons/lu";

import "reactjs-popup/dist/index.css";

import "./index.css";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const onLogOut = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="edit-btn lg-btn">
            LOGOUT <LuLogOut size={15} />
          </button>
        }
      >
        {(close) => (
          <div className="logout-container">
            <div className="logout-logo-container">
              <LuLogOut color="#D97706" className="logout-logo" />
            </div>
            <div className="logout-cont">
              <div className="logout-txt-con">
                <h3 className="sure-text">Are you sure you want to Logout?</h3>
                <p>If you click on Yes , you'll be logged out</p>
              </div>
              <div className="logout-btn-cont">
                <button className="logout-btn " onClick={onLogOut}>
                  Yes, Logout
                </button>
                <button className="cancel-btn " onClick={() => close()}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default LogoutBtn;
