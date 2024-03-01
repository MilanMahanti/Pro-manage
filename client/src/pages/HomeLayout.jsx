import { Outlet } from "react-router-dom";
import Hero from "../assets/hero.png";
import styles from "./HomeLayout.module.css";

function HomeLayout() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.herocontainer}>
          <img src={Hero} alt="hero" className={styles.heroimg} />
          <h1>Welcome aboard my friend</h1>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.main}>
        <Outlet />
      </div>
    </main>
  );
}

export default HomeLayout;
