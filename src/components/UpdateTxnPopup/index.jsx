import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";

// import Cookies from "js-cookie";

import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";

import { Formik } from "formik";

import { useContext } from "react";

import TransactionsContext from "../../context/TransactionsContext";

import "./index.css";

const UpdateTxnPopup = (props) => {
  const cntxt = useContext(TransactionsContext);

  const { updateTxn } = cntxt;

  const { item } = props;

  const { txnName, TxnType, Category, Amount, txnDate, _id } = item;

  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="edit-btn">
            <MdOutlineModeEditOutline size={25} />
          </button>
        }
      >
        {(close) => (
          <div className="add-txn-popup-container">
            <h1 className="add-txn-heading-text">Update Transaction</h1>
            <p className="add-txn-para-text">Update Your Transaction</p>
            <Formik
              initialValues={{
                txnName,
                TxnType,
                Category,
                Amount,
                txnDate: "",

                //                 {
                //   "txnName": "2",
                //   "TxnType": "credit",
                //   "Category": "Food",
                //   "Amount": 123,
                //   "txnDate": "2024-01-08T09:55"
                // }
              }}
              validate={(values) => {
                const errors = {};
                if (!values.txnName) errors.txnName = "Required*";
                if (!values.TxnType) errors.TxnType = "Required*";
                if (!values.Category) errors.Category = "Required*";
                if (!values.Amount) errors.Amount = "Required*";
                if (!values.txnDate) errors.txnDate = "Required*";

                return errors;
              }}
              onSubmit={(values) => {
                updateTxn({ _id, ...values });
                close();
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                /* and other goodies */
              }) => (
                <form
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="add-txn-form"
                >
                  <div className="input-container">
                    <label htmlFor="txnName" className="add-txn-label">
                      Transaction Name<span className="span-el">*</span>
                    </label>
                    <input
                      id="txnName"
                      type="text"
                      placeholder="Enter Name"
                      className="add-txn-input"
                      defaultValue={txnName}
                    />
                    <p className="error-text">
                      {errors.txnName && touched.txnName && errors.txnName}
                    </p>
                  </div>
                  <div className="input-container">
                    <label htmlFor="TxnType" className="add-txn-label">
                      Transaction Type<span className="span-el">*</span>
                    </label>
                    <select
                      id="TxnType"
                      placeholder="Select Transaction Type"
                      className="add-txn-input"
                      defaultValue={TxnType}
                    >
                      <option value="credit">credit</option>
                      <option value="debit">debit</option>
                    </select>
                    <p className="error-text">
                      {errors.TxnType && touched.TxnType && errors.TxnType}
                    </p>
                  </div>
                  <div className="input-container">
                    <label htmlFor="Category" className="add-txn-label">
                      Category<span className="span-el">*</span>
                    </label>
                    <select
                      id="Category"
                      placeholder="Select Transaction Type"
                      className="add-txn-input"
                      defaultValue={Category}
                    >
                      <option value="Food">Food</option>

                      <option value="Shopping">Shopping</option>

                      <option value="Materials">Materials</option>

                      <option value="Books">Books</option>

                      <option value="Grocery">Grocery</option>

                      <option value="Transfer">Transfer</option>
                      <option value="Other"> Other</option>
                    </select>
                    <p className="error-text">
                      {errors.Category && touched.Category && errors.Category}
                    </p>
                  </div>
                  <div className="input-container">
                    <label htmlFor="Amount" className="add-txn-label">
                      Amount<span className="span-el">*</span>
                    </label>
                    <input
                      id="Amount"
                      type="number"
                      placeholder="Enter Your Amount"
                      className="add-txn-input am"
                      defaultValue={Amount}
                    />
                    <p className="error-text">
                      {errors.Amount && touched.Amount && errors.Amount}
                    </p>
                  </div>
                  <div className="input-container">
                    <label htmlFor="txnDate" className="add-txn-label">
                      Date<span className="span-el">*</span>
                    </label>
                    <input
                      id="txnDate"
                      type="datetime-local"
                      placeholder="Enter Name"
                      className="add-txn-input"
                    />
                    <p className="error-text">
                      {errors.txnDate && touched.txnDate && errors.txnDate}
                    </p>
                  </div>
                  <div>
                    <button className="submit-btn" id="add" type="submit">
                      Update Transaction
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default UpdateTxnPopup;
