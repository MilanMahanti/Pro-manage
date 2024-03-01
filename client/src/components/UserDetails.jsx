import styles from "./UserDetails.module.css";
import { useCurrUser } from "../queries/useCurrUser";
import { formatDateTop } from "../utils/helpers";
function UserDetails() {
  const { user } = useCurrUser();

  return (
    <div className={styles.container}>
      <h3>Welcome! {user?.user?.name.split(" ")[0]}</h3>
      <p>{formatDateTop()}</p>
    </div>
  );
}

export default UserDetails;
