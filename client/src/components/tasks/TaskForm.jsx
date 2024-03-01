import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoPlus } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import styles from "./TaskForm.module.css";
import { useCreateTask } from "../../queries/useCreateTask";
import { useUpdateTask } from "../../queries/useUpdateTask";
import { createPortal } from "react-dom";
import SpinnerMini from "../SpinnerMini";

const TaskForm = ({ closeTaskForm, taskData = {} }) => {
  const isEditMode = Boolean(taskData._id);
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "checklist",
  });
  const { ref } = useOutsideClick(closeTaskForm);
  const { createTask, isCreating } = useCreateTask();
  const { updateTask, isUpdating } = useUpdateTask();
  useEffect(() => {
    if (isEditMode) {
      reset(taskData);
      const trimmedDueDate = taskData?.dueDate?.trim() || null;
      const parsedDate = trimmedDueDate ? new Date(trimmedDueDate) : null;
      setSelectedDate(parsedDate);
    } else {
      reset({
        title: "",
        priority: "moderate",
        checklist: [{ description: "", completed: false }],
        date: null,
      });
      setSelectedDate(null);
    }

    // eslint-disable-next-line
  }, [isEditMode, taskData.dueDate]);
  const isWorking = isCreating || isUpdating;
  const onSubmit = (data) => {
    data.dueDate = selectedDate ? selectedDate.toISOString() : null;
    if (isEditMode) {
      updateTask(
        { params: taskData._id, tasks: data },
        { onSuccess: closeTaskForm }
      );
    } else {
      createTask(data, { onSuccess: closeTaskForm });
    }
  };
  const totalCount = fields.length;
  const checkedCount = fields.filter((field) => field.completed).length;
  return createPortal(
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit(onSubmit)} ref={ref} className={styles.form}>
        <div>
          <div className={styles.title}>
            <label htmlFor="title">
              Title <sup className={styles.sup}>*</sup>
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              id="title"
              placeholder="Enter Task Title"
            />
            {errors.title && (
              <p className={styles.error}>{errors.title.message}</p>
            )}
          </div>
          <div className={styles.priority}>
            <label style={{ fontWeight: 500 }}>
              Select Priority <sup className={styles.sup}>*</sup>
            </label>
            <div className={styles.radiobottons}>
              <input
                type="radio"
                {...register("priority")}
                value="high"
                id="priority-high"
              />
              <label htmlFor="priority-high">
                <span
                  className={styles.circle}
                  style={{ backgroundColor: "#FF2473" }}
                ></span>
                High Priority
              </label>
              <input
                type="radio"
                {...register("priority")}
                value="moderate"
                id="priority-moderate"
              />
              <label htmlFor="priority-moderate">
                <span
                  className={styles.circle}
                  style={{ backgroundColor: "#18B0FF" }}
                ></span>
                Moderate Priority
              </label>
              <input
                type="radio"
                {...register("priority")}
                value="low"
                id="priority-low"
              />
              <label htmlFor="priority-low">
                <span
                  className={styles.circle}
                  style={{ backgroundColor: "#63C05B" }}
                ></span>
                Low Priority
              </label>
            </div>
          </div>

          <div className={styles.checklistcontainer}>
            <p>
              Checklist({checkedCount}/{totalCount}){" "}
              <sup className={styles.sup}>*</sup>
            </p>
            <div className={styles["taskitem-container"]}>
              {fields.map((field, index) => (
                <div key={field.id} className={styles.taskitem}>
                  <input
                    type="checkbox"
                    {...register(`checklist[${index}].completed`)}
                    defaultChecked={field.completed}
                    className={styles.checkbox}
                  />
                  <input
                    {...register(`checklist[${index}].description`, {
                      required: "Checklist item description is required",
                    })}
                    className={styles["task-description"]}
                    defaultValue={field.description}
                  />
                  {errors.checklist && errors.checklist[index] && (
                    <p style={{ margin: "2rem" }} className={styles.error}>
                      {errors.checklist[index].description.message}
                    </p>
                  )}
                  <MdDelete
                    onClick={() => remove(index)}
                    className={styles.delete}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append({})}
              className={styles.add}
            >
              <GoPlus size={16} strokeWidth={0.8} /> Add New
            </button>
          </div>
        </div>
        <div className={styles.formbottom}>
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MM/dd/yyyy"
              id="date"
              placeholderText="Select Due Date"
              className={styles.date}
            />
          </div>
          <div className={styles.bottoncontainer}>
            <button
              onClick={closeTaskForm}
              className={`${styles.btn} ${styles.cancel}`}
              disabled={isWorking}
            >
              Cancel
            </button>
            <button type="submit" className={`${styles.btn} ${styles.save}`}>
              {isWorking ? <SpinnerMini /> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.body
  );
};

export default TaskForm;
