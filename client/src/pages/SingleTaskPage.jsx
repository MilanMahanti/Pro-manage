import { useParams } from "react-router-dom";
import { useGetSingleTask } from "../queries/useGetSingleTask";
import logo from "../assets/Logo.svg";
import Loading from "../components/Loading";
import styles from "./SingleTaskPage.module.css";
import { formatDate } from "../utils/helpers";
function SingleTaskPage() {
  const { taskid } = useParams();
  const { isGettingTask, task } = useGetSingleTask(taskid);
  if (isGettingTask)
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  const data = task.task;

  return (
    <div className={styles.page}>
      <img src={logo} alt="logo" />
      <div className={styles.container}>
        <p className={styles.priority}>
          <span
            style={{
              backgroundColor:
                data.priority === "low"
                  ? "#63C05B"
                  : data.priority === "high"
                  ? "#FF2473"
                  : "#18B0FF",
            }}
            className={styles.circle}
          ></span>
          {data.priority} Priority
        </p>
        <h3>{data.title}</h3>

        <p className={styles.checklist}>
          Checklist(
          {data.checklist.filter((task) => task.completed === true).length}/
          {data.checklist.length})
        </p>

        <div className={styles["checklist-container"]}>
          {data.checklist.map((task) => {
            return (
              <div key={task._id} className={styles["checklist-item"]}>
                <label className={styles.check}>
                  <input type="checkbox" checked={task.completed} disabled />
                  <span className={styles.checkmark}></span>
                </label>

                <p className={styles.description}>{task.description}</p>
              </div>
            );
          })}
        </div>
        {data.dueDate && (
          <p className={styles.date}>
            Due Date <span>{formatDate(data.dueDate)}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default SingleTaskPage;
