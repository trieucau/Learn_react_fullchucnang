import instance from "./axios";
const fetchAllUser = (page) => {
  return instance.get(`/api/users?page=${page}`);
};

const postCreateUser = (n, j) => {
  return instance.post("/api/users", { name: n, job: j });
};

const putUpdataUser = (n, j) => {
  return instance.put("/api/users/2", { name: n, job: j });
};

const deleteUser = (id) => {
  return instance.delete(`/api/users/${id}`);
};

const loginAPI = (e, p) => {
  return instance.post("/api/login", { email: e, password: p });
};
export { fetchAllUser, postCreateUser, putUpdataUser, deleteUser, loginAPI };
