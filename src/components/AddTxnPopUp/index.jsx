// import { Component } from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// import Cookies from "js-cookie";

import { AiOutlinePlus } from "react-icons/ai";

import "./index.css";
import { Formik } from "formik";

// class AddTxnPopUp extends Component {
//   state = { txnDetails: TxnDetails };

//   onTypingName = (event) => {
//     const { txnDetails } = this.state;

//     const newValue = event.target.value;

//     const updatedOb = { ...txnDetails, txnName: newValue };
//     this.setState({ txnDetails: updatedOb });
//   };

//   onTypingAmount = (event) => {
//     const { txnDetails } = this.state;

//     const newValue = event.target.value;

//     const updatedOb = { ...txnDetails, amount: newValue };
//     this.setState({ txnDetails: updatedOb });
//   };

//   onTxnType = (event) => {
//     const { txnDetails } = this.state;

//     const newValue = event.target.value;

//     const updatedOb = { ...txnDetails, txnType: newValue };
//     this.setState({ txnDetails: updatedOb });
//   };

//   onChangingDate = (event) => {
//     const { txnDetails } = this.state;

//     const newValue = event.target.value;

//     const updatedOb = { ...txnDetails, date: newValue };
//     this.setState({ txnDetails: updatedOb });
//   };

//   onCategorySelection = (event) => {
//     const { txnDetails } = this.state;

//     const newValue = event.target.value;

//     const updatedOb = { ...txnDetails, category: newValue };
//     this.setState({ txnDetails: updatedOb });
//   };

//   onAddingTxn = (event) => {
//     event.preventDefault();

//     const { txnDetails } = this.state;

//     const { txnName, amount } = txnDetails;

//     console.log(typeof amount);

//     const amountValidation = !isNaN(amount) && amount.trim() !== "";

//     const txnNameValidation =
//       txnName.length > 30 || txnName === ""
//         ? alert("Name should contain below 30 Charecters and cant be empty")
//         : true;

//     const isEveryFieldOkay = amountValidation && txnNameValidation;

//     if (isEveryFieldOkay === true) {
//       this.AddTxn();
//     } else {
//       NotificationManager.error("Enter valid Input");
//       return;
//     }
//   };

//   AddTxn = async () => {
//     const userCreds = Cookies.get("secret_token");

//     const parsedObject = JSON.parse(userCreds);

//     const { userId } = parsedObject;

//     const { txnDetails } = this.state;

//     const { txnName, txnType, category, amount, date } = txnDetails;

//     const d = date;

//     const reqUrl = `https://bursting-gelding-24.hasura.app/api/rest/add-transaction?name=${txnName}&type=${txnType}&category=${category}&amount=${amount}&date=${d}&user_id=${userId}`;
//     var myHeaders = new Headers();

//     myHeaders.append("content-type", "application/json");

//     myHeaders.append(
//       "x-hasura-admin-secret",
//       "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
//     );

//     myHeaders.append("x-hasura-role", "user");

//     myHeaders.append("x-hasura-user-id", `${userId}`);

//     var requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       redirect: "follow",
//     };
//     fetch(reqUrl, requestOptions)
//       .then(
//         NotificationManager.success(
//           "Page will be reloaded to update in portal",
//           "Added Successfully"
//         )
//       )
//       .then(() => {
//         window.location.reload();
//       })
//       .catch((err) => {
//         alert("Something went Wrong");
//         console.log(err);
//         return;
//       });
//   };

//   render() {
//     const { txnDetails } = this.state;

//     const { txnName, category, amount, txnType, date } = txnDetails;

//     return (
//       <div className="popup-container">
//         <Popup
//           modal
//           trigger={
//             <button className="transaction-btn trigger-button" type="button">
//               <AiOutlinePlus /> Add Transaction
//             </button>
//           }
//         >
//           {(close) => (
//             <div className="add-txn-popup-container">
//               <h1 className="add-txn-heading-text">Add Transaction</h1>
//               <p className="add-txn-para-text">Make a Transaction</p>
//               <form className="add-txn-form" onSubmit={this.onAddingTxn}>
//                 <div className="input-container">
//                   <label htmlFor="txnName" className="add-txn-label">
//                     Transaction Name<span className="span-el">*</span>
//                   </label>
//                   <input
//                     id="txnName"
//                     type="text"
//                     placeholder="Enter Name"
//                     className="add-txn-input"
//                     value={txnName}
//                     onChange={this.onTypingName}
//                   />
//                 </div>
//                 <div className="input-container">
//                   <label htmlFor="txnType" className="add-txn-label">
//                     Transaction Type<span className="span-el">*</span>
//                   </label>
//                   <select
//                     id="txnType"
//                     placeholder="Select Transaction Type"
//                     className="add-txn-input"
//                     value={txnType}
//                     onChange={this.onTxnType}
//                   >
//                     <option value="credit">credit</option>
//                     <option value="debit">debit</option>
//                   </select>
//                 </div>
//                 <div className="input-container">
//                   <label htmlFor="txnCategory" className="add-txn-label">
//                     Category<span className="span-el">*</span>
//                   </label>
//                   <select
//                     id="txnCategory"
//                     placeholder="Select Transaction Type"
//                     className="add-txn-input"
//                     value={category}
//                     onChange={this.onCategorySelection}
//                   >
//                     <option value="Food">Food</option>

//                     <option value="Shopping">Shopping</option>

//                     <option value="Materials">Materials</option>

//                     <option value="Books">Books</option>

//                     <option value="Grocery">Grocery</option>

//                     <option value="Transfer">Transfer</option>
//                   </select>
//                 </div>
//                 <div className="input-container">
//                   <label htmlFor="amount" className="add-txn-label">
//                     Amount<span className="span-el">*</span>
//                   </label>
//                   <input
//                     id="amount"
//                     type="text"
//                     placeholder="Enter Your Amount"
//                     className="add-txn-input"
//                     value={amount}
//                     onChange={this.onTypingAmount}
//                   />
//                 </div>
//                 <div className="input-container">
//                   <label htmlFor="date" className="add-txn-label">
//                     Date<span className="span-el">*</span>
//                   </label>
//                   <input
//                     id="date"
//                     type="date"
//                     value={date}
//                     placeholder="Enter Name"
//                     className="add-txn-input"
//                     onChange={this.onChangingDate}
//                   />
//                 </div>
//                 <div>
//                   <button className="submit-btn" type="submit">
//                     Add Transaction
//                   </button>
//                 </div>
//               </form>
//               <NotificationContainer />
//             </div>
//           )}
//         </Popup>
//       </div>
//     );
//   }
// }

const AddTxnPopUp = () => {
  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button className="transaction-btn trigger-button" type="button">
            <AiOutlinePlus /> Add Transaction
          </button>
        }
      >
        {(close) => (
          <div className="add-txn-popup-container">
            <h1 className="add-txn-heading-text">Add Transaction</h1>
            <p className="add-txn-para-text">Make a Transaction</p>
            <Formik
              initialValues={{
                txnName: "",
                txnType: "credit",
                txnCategory: "Food",
                amount: "",
                date: "2000-02-02",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.txnName) errors.txnName = "Required*";
                if (!values.txnType) errors.txnType = "Required*";
                if (!values.txnCategory) errors.txnCategory = "Required*";
                if (!values.amount) errors.amount = "Required*";
                if (!values.date) errors.date = "Required*";

                return errors;
              }}
              onSubmit={(values) => console.log(values)}
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
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="txnType" className="add-txn-label">
                      Transaction Type<span className="span-el">*</span>
                    </label>
                    <select
                      id="txnType"
                      placeholder="Select Transaction Type"
                      className="add-txn-input"
                    >
                      <option value="credit">credit</option>
                      <option value="debit">debit</option>
                    </select>
                  </div>
                  <div className="input-container">
                    <label htmlFor="txnCategory" className="add-txn-label">
                      Category<span className="span-el">*</span>
                    </label>
                    <select
                      id="txnCategory"
                      placeholder="Select Transaction Type"
                      className="add-txn-input"
                    >
                      <option value="Food">Food</option>

                      <option value="Shopping">Shopping</option>

                      <option value="Materials">Materials</option>

                      <option value="Books">Books</option>

                      <option value="Grocery">Grocery</option>

                      <option value="Transfer">Transfer</option>
                      <option value="Other"> Other</option>
                    </select>
                  </div>
                  <div className="input-container">
                    <label htmlFor="amount" className="add-txn-label">
                      Amount<span className="span-el">*</span>
                    </label>
                    <input
                      id="amount"
                      type="number"
                      placeholder="Enter Your Amount"
                      className="add-txn-input"
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="date" className="add-txn-label">
                      Date<span className="span-el">*</span>
                    </label>
                    <input
                      id="date"
                      type="date"
                      placeholder="Enter Name"
                      className="add-txn-input"
                    />
                  </div>
                  <div>
                    <button className="submit-btn" id="add" type="submit">
                      Add Transaction
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

export default AddTxnPopUp;
