import { Link, useLocation } from "react-router-dom";

// import ProfileBox from "../ProfileBox";

import { HiHome } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";

import "./index.css";
import ProfileBox from "../ProfileBox";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  const isDashBoard = pathname === "/" ? "link-item active-item" : "link-item";
  const isTxn =
    pathname === "/transactions" ? "link-item active-item" : "link-item";
  const isProfile =
    pathname === "/profile" ? "link-item active-item" : "link-item";

  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/reddyimgs/image/upload/v1690551063/Frame_507_ogpjs9.png"
            alt="website logo"
            className="logo"
          />
        </Link>
      </div>
      <ul className="link-li-container">
        <Link to="/" className={isDashBoard}>
          <li className="list-item">
            <HiHome className="ic" /> Dashboard
          </li>
        </Link>
        <Link to="/transactions" className={isTxn}>
          <li className="list-item">
            <FaMoneyBillTransfer className="ic" />
            Transactions
          </li>
        </Link>
        <Link to="/profile" className={isProfile}>
          <li className="list-item">
            <FaUser className="ic" />
            Profile
          </li>
        </Link>
      </ul>

      <ProfileBox />
    </div>
  );
};

export default Sidebar;
