import { useState } from "react";
import "./Login.scss";
import { loginAPI } from "./services/UserService";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../managecontext/UserContext";

export default function Login() {
  const { login, user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isshoweyspass, setisShoweyspass] = useState(false);
  const [loadloginAPI, setLoadloginAPI] = useState(false);
  const navigate = useNavigate();

  const err = (text) => {
    toast.error(`${text}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const success = (text) => {
    toast.success(`${text}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleLogintoAPI = async () => {
    if (!email || !pass) {
      err("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    setLoadloginAPI(true);
    let res = await loginAPI(email, pass);
    if (res && res.token) {
      login(email, res.token);
      success("Đăng nhập thành công!");
      navigate("/");
    } else {
      if (res && res.status === 400) {
        err(res.data.error, "!");
      }
    }
    setLoadloginAPI(false);
  };

  return (
    <>
      <div className="login-container col-12 col-sm-6 col-md-4  ">
        <div className="title">Log in</div>
        <div className="text">Email or username</div>
        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="input-2">
          <input
            type={isshoweyspass === true ? "text" : "password"}
            placeholder="Password"
            value={pass}
            onChange={(event) => setPass(event.target.value)}
          />
          <i
            className={
              isshoweyspass === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => setisShoweyspass(!isshoweyspass)}
          ></i>
        </div>

        <button
          className={email && pass ? "active" : ""}
          onClick={() => handleLogintoAPI()}
        >
          <i class={loadloginAPI && "fas fa-sync fa-spin px-1"}></i>Log in
        </button>
        <div
          className="back-home"
          onClick={() => {
            console.log("back");
          }}
        >
          <span onClick={() => navigate("/")}>
            <i className="fa-solid fa-chevron-left"> </i> Go Back
          </span>
        </div>
      </div>
    </>
  );
}
