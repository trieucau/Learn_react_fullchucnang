import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { putUpdataUser } from "./services/UserService";
import { toast, Bounce } from "react-toastify";

export default function ModalEditUser({
  handleClose,
  show,
  datauser,
  handleEditUserFromModal,
}) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (show) {
      setName(datauser.first_name);
    }
  }, [datauser]);

  const handleEditUser = async () => {
    let res = await putUpdataUser(name, job);
    if (res && res.name !== "" && res.job !== "") {
      //succes
      handleEditUserFromModal({
        first_name: name,
        id: datauser.id,
      });

      handleClose();
      toast.success("Update user success!", {
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
    } else {
      setName("");
      setJob("");
      toast.error("Update user error!", {
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
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-user">
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input
                type="text"
                className="form-control"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
