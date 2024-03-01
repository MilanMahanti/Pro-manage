import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div className={styles.main}>
      <Sidebar />
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
