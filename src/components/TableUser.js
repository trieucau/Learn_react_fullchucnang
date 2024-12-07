import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "./services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import { deleteUser } from "./services/UserService";

export default function TableUser({
  setAddNew,
  isAddNew,
  isEditNew,
  setEditNew,
}) {
  const [listuser, setListuser] = useState([]);
  const [totalpage, setTotalpage] = useState(0);
  const [datauser, setDatauser] = useState({});
  useEffect(() => {
    getUser(1);
  }, []);
  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListuser(res.data);
      setTotalpage(res.total_pages);
    }
  };
  const handlePageClick = (event) => {
    getUser(event.selected + 1);
  };
  const handleUpdateUser = (user) => {
    setListuser([...listuser, user]);
  };
  const handleEditUser = (user) => {
    setDatauser(user);
    setEditNew(true);
  };
  const handleDeleteUser = (item) => {
    let newlistuser = listuser.filter((user) => user.id !== item.id);
    setListuser(newlistuser);
  };

  const handleEditUserFromModal = (user) => {
    let clonelistuser = [...listuser];
    let index = listuser.findIndex((item) => item.id === user.id);
    clonelistuser[index].first_name = user.first_name;
    setListuser(clonelistuser);
  };
  return (
    <>
      <div>
        <ModalAddNew
          handleClose={() => setAddNew(false)}
          show={isAddNew}
          handleUpdateUser={handleUpdateUser}
        />
        <ModalEditUser
          handleClose={() => setEditNew(false)}
          show={isEditNew}
          datauser={datauser}
          setDatauser={setDatauser}
          handleEditUserFromModal={handleEditUserFromModal}
        />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>First_name</th>
              <th>Last_name</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {listuser &&
              listuser.length > 0 &&
              listuser.map((item, index) => {
                return (
                  <tr key={`user - ${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <th>
                      <button
                        type="button"
                        className="btn btn-warning mx-2"
                        onClick={() => handleEditUser(item)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(item)}
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageCount={totalpage}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </>
  );
}
