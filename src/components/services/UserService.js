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

const deleteUser = (n, j) => {
  return instance.delete("/api/users/2", { name: n, job: j });
};
export { fetchAllUser, postCreateUser, putUpdataUser, deleteUser };
