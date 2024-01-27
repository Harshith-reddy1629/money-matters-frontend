import { useContext } from "react";

import Popup from "reactjs-popup";

import { LuAlertTriangle } from "react-icons/lu";

import { HiOutlineTrash } from "react-icons/hi";

import "reactjs-popup/dist/index.css";

import TransactionsContext from "../../context/TransactionsContext";

import "./index.css";

const DeletePopup = ({ id }) => {
  const { deleteTxn } = useContext(TransactionsContext);

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="delete-btn">
            <HiOutlineTrash size={25} />
          </button>
        }
      >
        {(close) => (
          <div className="logout-container">
            <div className="logout-logo-container">
              <LuAlertTriangle color="#D97706" className="logout-logo" />
            </div>
            <div className="logout-cont">
              <div className="logout-txt-con">
                <h3 className="sure-text">Are you sure you want to Delete?</h3>
                <p>
                  This transaction will be deleted immediately. You can’t undo
                  this action.
                </p>
              </div>
              <div className="logout-btn-cont">
                <button
                  onClick={() => {
                    deleteTxn(id);
                  }}
                  className="logout-btn"
                >
                  Yes, Delete
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    close();
                  }}
                >
                  No, Leave it
                </button>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default DeletePopup;
