import Error from "../components/Error";
import Loading from "../components/Loading";
import UserDetails from "../components/UserDetails";
import KanbanBoard from "../components/tasks/KanbanBoard";
import { useGetAllTask } from "../queries/useGetAllTask";
import styles from "./DashboardPage.module.css";
function DashboardPage() {
  const { isGettingTasks, error } = useGetAllTask();

  if (isGettingTasks)
    return (
      <div className={styles.loadingcontainer}>
        <Loading />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UserDetails />
      </div>
      {error ? (
        <Error error={error} />
      ) : (
        <div className={styles.board}>
          <KanbanBoard />
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
