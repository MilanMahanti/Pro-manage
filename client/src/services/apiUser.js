import customFetch from "../utils/customFetch";

export async function getCurrUser() {
  const { data } = await customFetch("/user/current-user", {
    withCredentials: true,
  });
  return data;
}

export async function updateUser(userData) {
  const data = await customFetch.patch("/user/update-me", userData, {
    withCredentials: true,
  });
  return data;
}

export async function login({ email, password }) {
  const data = await customFetch.post("/user/login", { email, password });
  return data;
}

export async function register(user) {
  const data = await customFetch.post("/user/signup", user);
  return data;
}

export async function logout() {
  const data = await customFetch.get("/user/logout");
  return data;
}
