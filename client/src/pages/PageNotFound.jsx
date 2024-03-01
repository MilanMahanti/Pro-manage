import { Link } from "react-router-dom";
import image from "../assets/notfound.svg";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={styles.fullpage}>
      <div className={styles.container}>
        <img src={image} alt="not found" />
        <div className={styles.details}>
          <p>Sorry the page you are looking for is not found :(</p>
          <Link to="/register" className="btn primary">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
