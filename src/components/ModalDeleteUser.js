import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "./services/UserService";
import { toast, Bounce } from "react-toastify";

export default function ModalDeleteUser({
  handleClose,
  show,
  datauserdelete,
  handleConfirmUserModal,
}) {
  const handleConfrimUser = async () => {
    let res = await deleteUser(datauserdelete.id);
    if (res && +res.StartCode === 204) {
      //thanh cong
      handleConfirmUserModal(datauserdelete);
      handleClose();
      toast.success("Delete user success!", {
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
      toast.error("Delete user error!", {
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
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có muốn xóa tài khoản người dùng, email = {""}
          <strong>{datauserdelete.email} ?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleConfrimUser()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
