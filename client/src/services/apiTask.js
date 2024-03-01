import customFetch from "../utils/customFetch";

export async function getAllTask(filter) {
  const { data } = await customFetch.get(`/task?filter=${filter}`, {
    withCredentials: true,
  });
  return data?.tasks;
}

export async function createTask(taskdata) {
  const data = await customFetch.post("/task", taskdata, {
    withCredentials: true,
  });
  return data;
}

export async function updateTask(taskData) {
  const { params, tasks } = taskData;
  const data = await customFetch.patch(`/task/${params}`, tasks, {
    withCredentials: true,
  });
  return data;
}

export async function deleteTask(params) {
  const data = await customFetch.delete(`/task/${params}`, {
    withCredentials: true,
  });
  return data;
}

export async function getStats() {
  const { data } = await customFetch.get("task/stats", {
    withCredentials: true,
  });
  return data;
}
export async function getSingleTask(param) {
  const { data } = await customFetch.get(`task/${param}`);
  return data;
}
