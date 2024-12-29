import "./App.scss";
import Header from "./components/Header";

import Container from "react-bootstrap/Container";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { UserContext } from "./managecontext/UserContext";
import AppRoutes from "./routers/AppRoutes";
import { useSelector } from "react-redux";
function App() {
  //su dung redux quan li state user trong stote
  const datauserRedux = useSelector((state) => state.user.account);
  console.log(datauserRedux);
  const { user, login } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      login(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
