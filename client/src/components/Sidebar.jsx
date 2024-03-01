import styles from "./Sidebar.module.css";
import logo from "../assets/Logo.svg";
import { NavLink } from "react-router-dom";
import { GoTable, GoDatabase, GoGear } from "react-icons/go";
import Logout from "./authentication/Logout";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <img src={logo} alt="logo" />
        <NavLink to="/dashboard" className={styles.link}>
          <GoTable />
          <span>Board</span>
        </NavLink>
        <NavLink to="/analytics" className={styles.link}>
          <GoDatabase />
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/settings" className={styles.link}>
          <GoGear />
          <span>Settings</span>
        </NavLink>
      </div>
      <Logout />
    </div>
  );
}

export default Sidebar;
