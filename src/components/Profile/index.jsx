import { useContext } from "react";

import TransactionsContext from "../../context/TransactionsContext";

import "./index.css";

function Profile() {
  const { userDetails, PpageStatus } = useContext(TransactionsContext);
  return (
    <div className="profile-container">
      {PpageStatus === "Success" && (
        <div className="profile-card">
          <img
            src="https://p.kindpng.com/picc/s/24-248325_profile-picture-circle-png-transparent-png.png"
            alt="profile"
            className="profile-image"
          />

          <ul className="bio-container">
            <li className="user-bio-li-items">
              <label htmlFor="name" className="bio-labels">
                Your Name
              </label>
              <input
                value={userDetails.name}
                className="input-element"
                id="name"
                type="text"
                onChange={() => {}}
              />
            </li>
            <li className="user-bio-li-items">
              <label htmlFor="UserName" className="bio-labels">
                User Name
              </label>
              <input
                className="input-element"
                id="UserName"
                type="text"
                //   placeholder="user name"
                value={userDetails.username}
                onChange={() => {}}
              />
            </li>
            <li className="user-bio-li-items">
              <label htmlFor="Email" className="bio-labels">
                Email
              </label>
              <input
                className="input-element"
                id="Email"
                type="email"
                //   placeholder="email"
                value={userDetails.email}
                onChange={() => {}}
              />
            </li>
            <li className="user-bio-li-items">
              <label htmlFor="password" className="bio-labels">
                Password
              </label>
              <input
                className="input-element"
                id="password"
                type="password"
                //   placeholder="**********"
                value="**********"
                onChange={() => {}}
              />
            </li>
            <li className="user-bio-li-items">
              <label htmlFor="DOB" className="bio-labels">
                Date of Birth
              </label>
              <div className="input-element" id="DOB" name="dob">
                {userDetails.dateOfBirth.slice(0, -1)}
              </div>
            </li>
            <li className="user-bio-li-items">
              <label htmlFor="presentAddress" className="bio-labels">
                Present Address
              </label>
              <input
                className="input-element"
                id="presentAddress"
                type="text"
                placeholder="Present Address"
                value={userDetails.presentAddress}
                onChange={() => {}}
              />
            </li>
            <li className="user-bio-li-items">
              <label htmlFor="permanentAddress" className="bio-labels">
                Permanent Address
              </label>
              <input
                className="input-element"
                id="permanentAddress"
                type="text"
                placeholder="Permanent Address"
                value={userDetails.permanentAddress}
                onChange={() => {}}
              />
            </li>
            <li className="user-bio-li-items">
              <label htmlFor="city" className="bio-labels">
                City
              </label>
              <input
                className="input-element"
                id="city"
                type="text"
                placeholder="City"
                value={userDetails.city}
                onChange={() => {}}
              />
            </li>
            <li className="user-bio-li-items">
              <label htmlFor="postalCode" className="bio-labels">
                Postal Code
              </label>
              <input
                className="input-element"
                id="postal Code"
                type="text"
                placeholder="Postal Code"
                value={userDetails.postalCode}
                onChange={() => {}}
              />
            </li>
            <li className="user-bio-li-items">
              <label htmlFor="country" className="bio-labels">
                Country
              </label>
              <input
                className="input-element"
                id="country"
                type="text"
                placeholder="Country"
                value="Country"
                onChange={() => {}}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Profile;
