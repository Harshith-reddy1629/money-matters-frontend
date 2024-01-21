// import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import AddTxnPopUp from "../AddTxnPopUp";
import "./index.css";

const Navbar = () => {
  const location = useLocation();

  const { pathname } = location;

  return (
    <nav className="nav-container">
      <h1 className="nav-text">
        {pathname === "/" && "Dashboard"}
        {pathname === "/transactions" && "Transactions"}
        {pathname === "/profile" && "Profile"}
      </h1>
      <AddTxnPopUp />
    </nav>
  );
};

export default Navbar;
