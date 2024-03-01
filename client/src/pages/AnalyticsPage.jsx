import Error from "../components/Error";
import Loading from "../components/Loading";
import { useGetStats } from "../queries/useGetStats";
import styles from "./AnalyticsPage.module.css";
function AnalyticsPage() {
  const { isGettingStats, stats, error } = useGetStats();
  if (isGettingStats) return <Loading />;
  if (error) return <Error error={error} />;
  const {
    taskCounts: { byStatus, byPriority },
    totalDueTasks,
  } = stats;
  return (
    <div className={styles.page}>
      <h2>Analytics</h2>
      <div className={styles["list-container"]}>
        <div className={styles.container}>
          <div className={styles.listitem}>
            <p>
              <span className={styles.circle}></span>
              Backlog Tasks
            </p>
            <p className={styles.count}>{byStatus?.backlog || 0}</p>
          </div>
          <div className={styles.listitem}>
            <p>
              <span className={styles.circle}></span>
              To-do Tasks
            </p>
            <p className={styles.count}>{byStatus?.todo || 0}</p>
          </div>
          <div className={styles.listitem}>
            <p>
              <span className={styles.circle}></span>
              In-Progress Tasks
            </p>
            <p className={styles.count}>
              {" "}
              {(byStatus && byStatus["in-progress"]) || 0}
            </p>
          </div>
          <div className={styles.listitem}>
            <p>
              <span className={styles.circle}></span>
              Completed Tasks
            </p>
            <p className={styles.count}>{byStatus?.done || 0}</p>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.listitem}>
            <p>
              <span className={styles.circle}></span>
              Low Priority
            </p>
            <p className={styles.count}>{byPriority?.low || 0}</p>
          </div>
          <div className={styles.listitem}>
            <p>
              <span className={styles.circle}></span>
              Moderate Priority
            </p>
            <p className={styles.count}>{byPriority?.moderate || 0}</p>
          </div>
          <div className={styles.listitem}>
            <p>
              <span className={styles.circle}></span>
              High Priority
            </p>
            <p className={styles.count}>{byPriority?.high || 0}</p>
          </div>
          <div className={styles.listitem}>
            <p>
              <span className={styles.circle}></span>
              Due Tasks
            </p>
            <p className={styles.count}>{totalDueTasks ? totalDueTasks : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
