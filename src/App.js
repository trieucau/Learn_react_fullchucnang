import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Addusers from "./components/Addusers";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAddNew, setAddNew] = useState(false);
  const [isEditNew, setEditNew] = useState(false);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Addusers setAddNew={setAddNew} />
          <TableUser
            setAddNew={setAddNew}
            isAddNew={isAddNew}
            isEditNew={isEditNew}
            setEditNew={setEditNew}
          />
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
