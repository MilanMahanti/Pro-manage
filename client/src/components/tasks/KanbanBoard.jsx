import { createContext, useContext, useState } from "react";
import { useGetAllTask } from "../../queries/useGetAllTask";
import { useUpdateTask } from "../../queries/useUpdateTask";
import styles from "./KanbanBoard.module.css";
import { VscCollapseAll } from "react-icons/vsc";
import { VscEllipsis } from "react-icons/vsc";
import { GoPlus } from "react-icons/go";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { checkDate, copyLink, formatDate } from "../../utils/helpers";
import { useDeleteTask } from "../../queries/useDeleteTask";
import Modal from "../Modal";
import TaskForm from "./TaskForm";

const TaskContext = createContext();
const TaskProvider = ({ children, tasks }) => {
  const [openChecklists, setOpenChecklists] = useState({});
  const [openPopup, setOpenPopup] = useState(null);

  const toggleChecklist = (taskId) => {
    setOpenChecklists((prevOpenChecklists) => ({
      ...prevOpenChecklists,
      [taskId]: !prevOpenChecklists[taskId],
    }));
  };

  const closeChecklistsInColumn = (columnTitle) => {
    setOpenChecklists((prevOpenChecklists) => {
      const updatedChecklists = { ...prevOpenChecklists };
      tasks.forEach((task) => {
        if (task.status === columnTitle) {
          updatedChecklists[task._id] = false;
        }
      });
      return updatedChecklists;
    });
  };

  const closePopup = () => {
    setOpenPopup(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: tasks || [],
        toggleChecklist,
        openChecklists,
        openPopup,
        closePopup,
        setOpenPopup,
        closeChecklistsInColumn,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const TaskList = ({ columnTitle }) => {
  const { tasks } = useContext(TaskContext);
  return (
    <>
      {tasks.map(
        (task) =>
          task.status === columnTitle && <Task key={task._id} task={task} />
      )}
    </>
  );
};

const Task = ({ task }) => {
  const { setOpenPopup, openPopup, toggleChecklist, openChecklists } =
    useContext(TaskContext);

  const { updateTask } = useUpdateTask();
  const { deleteTask, isDeleting } = useDeleteTask();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [deleteModal, setDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const handleMove = (targetColumn) => {
    updateTask({ params: task._id, tasks: { status: targetColumn } });
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setMenuPosition({
      x: rect.x - 10,
      y: rect.y + rect.height + 6,
    });
    setIsMenuOpen((prevState) => !prevState);
    setOpenPopup((prevState) => (prevState !== task._id ? task._id : null));
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const closePopUp = () => {
    setIsMenuOpen(false);
    setOpenPopup(null);
  };

  const closeEditForm = () => {
    setEditForm(false);
  };

  const handleEdit = () => {
    setEditForm(true);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    setDeleteModal(true);
    setIsMenuOpen(false);
  };

  const handleShare = () => {
    copyLink(`${origin}/task/${task._id}`);
    setIsMenuOpen(false);
  };

  const handleChecklistToggle = () => {
    toggleChecklist(task._id);
  };

  const canMoveTo = (targetColumn) => {
    return task.status.toLowerCase() !== targetColumn.toLowerCase();
  };
  const { ref } = useOutsideClick(closePopUp);

  return (
    <div className={styles.task}>
      <div className={styles["task-top"]}>
        <p>
          <span
            style={{
              backgroundColor:
                task.priority === "low"
                  ? "#63C05B"
                  : task.priority === "high"
                  ? "#FF2473"
                  : "#18B0FF",
            }}
            className={styles.circle}
          ></span>
          <span style={{ textTransform: "capitalize" }}>{task.priority} </span>
          Priority
        </p>

        <div className="menu-container">
          <VscEllipsis onClick={(e) => handleMenuToggle(e)} size={22} />
          {openPopup === task._id && isMenuOpen && (
            <div
              className={styles.popup}
              style={{ top: menuPosition.y, left: menuPosition.x }}
              ref={ref}
            >
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleShare}>Share</button>
              <button onClick={handleDelete} style={{ color: "#CF3636" }}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <h3>
        {task.title.length > 40
          ? `${task.title.substring(0, 30)}...`
          : task.title}
      </h3>
      <div
        className={styles.checklist}
        onClick={handleChecklistToggle}
        style={{ cursor: "pointer" }}
      >
        <p>
          Checklist ({task.checklist.filter((item) => item.completed).length}/
          {task.checklist.length})
        </p>
        <button>
          {openChecklists[task._id] ? <BiChevronUp /> : <BiChevronDown />}
        </button>
      </div>
      {openChecklists[task._id] && (
        <ul>
          {task.checklist.map((item, index) => (
            <li key={index} className={styles.taskitem}>
              <input
                type="checkbox"
                checked={item.completed}
                disabled
                className={styles.checkbox}
              />
              <span
                style={{
                  textTransform: "capitalize",
                }}
              >
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className={styles["task-bottom"]}>
        {task?.dueDate && (
          <p
            className={`${styles.date} ${
              checkDate(task.dueDate) ? styles.expired : ""
            }`}
            style={{
              backgroundColor: task.status === "done" ? "#63C05B" : "",
              color: task.status === "done" ? "#fff" : "",
            }}
          >
            {formatDate(task.dueDate)}
          </p>
        )}
        <div className={styles.buttons}>
          {canMoveTo("todo") && (
            <button onClick={() => handleMove("todo")}> To Do</button>
          )}
          {canMoveTo("in-progress") && (
            <button onClick={() => handleMove("in-progress")}>Progress</button>
          )}
          {canMoveTo("done") && (
            <button onClick={() => handleMove("done")}> Done</button>
          )}
          {canMoveTo("backlog") && (
            <button onClick={() => handleMove("backlog")}>Backlog</button>
          )}
        </div>
      </div>
      {deleteModal && (
        <Modal
          name="delete"
          closeModal={closeDeleteModal}
          callback={() => deleteTask(task._id)}
          loading={isDeleting}
        />
      )}

      {editForm && <TaskForm closeTaskForm={closeEditForm} taskData={task} />}
    </div>
  );
};

const Column = ({ title }) => {
  const { closeChecklistsInColumn } = useContext(TaskContext);

  const handleCloseChecklists = () => {
    closeChecklistsInColumn(title);
  };

  const [taskFormOpen, setTaskFormOpen] = useState(false);

  const openTaskForm = () => {
    setTaskFormOpen(true);
  };
  const closeTaskForm = () => {
    setTaskFormOpen(false);
  };

  return (
    <div className={styles.column}>
      <div className={styles["column-top"]}>
        <h2>{title}</h2>
        <div>
          {title === "todo" && (
            <GoPlus color="#000" size={20} onClick={openTaskForm} />
          )}
          <VscCollapseAll onClick={handleCloseChecklists} size={20} />
        </div>
      </div>
      <div className={styles.tasks}>
        <TaskList columnTitle={title} />
      </div>
      {taskFormOpen && <TaskForm closeTaskForm={closeTaskForm} />}
    </div>
  );
};
const KanbanBoard = () => {
  const [selectedFilter, setSelectedFilter] = useState("week");
  const { tasks } = useGetAllTask(selectedFilter);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Board</h2>
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className={styles.filterDropdown}
        >
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </div>
      <TaskProvider tasks={tasks}>
        <div className={styles.board}>
          <Column title="backlog" />
          <Column title="todo" />
          <Column title="in-progress" />
          <Column title="done" />
        </div>
      </TaskProvider>
    </div>
  );
};
export default KanbanBoard;
