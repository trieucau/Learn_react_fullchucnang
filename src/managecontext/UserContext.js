import { createContext, useState } from "react";

const UserContext = createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "", auth: false });

  const login = (e, token) => {
    setUser((user) => ({
      email: e,
      auth: true,
    }));
    localStorage.setItem("token", token);
    localStorage.setItem("email", e);
  };

  const logout = () => {
    setUser((user) => ({
      email: "",
      auth: false,
    }));
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
