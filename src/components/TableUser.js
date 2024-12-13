import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "./services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import Addusers from "./Addusers";
import "./TableUser.scss";
const _ = require("lodash");

export default function TableUser() {
  const [isEditNew, setEditNew] = useState(false);
  const [isDeleteNew, setsDeleteNew] = useState(false);
  const [isAddNew, setAddNew] = useState(false);
  const [listuser, setListuser] = useState([]);
  const [totalpage, setTotalpage] = useState(0);
  const [datauser, setDatauser] = useState({});
  const [datauserdelete, setDatauserdelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setField] = useState("id");
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
    setsDeleteNew(true);
    setDatauserdelete(item);
  };
  //chinh sua nguoi dung
  const handleEditUserFromModal = (user) => {
    let newlistuser = _.cloneDeep(listuser);
    let index = listuser.findIndex((item) => item.id === user.id);
    newlistuser[index].first_name = user.first_name;
    setListuser(newlistuser);
  };
  //xoa nguoi dung
  const handleConfirmUserModal = (user) => {
    let newlistuser = _.cloneDeep(listuser);
    newlistuser = listuser.filter((item) => item.id !== user.id);
    setListuser(newlistuser);
  };
  //sap xep listuser
  const handleSort = (sortby, sortfield) => {
    setSortBy(sortby);
    setField(sortfield);
    let newlistuser = _.cloneDeep(listuser);
    newlistuser = _.orderBy(newlistuser, [sortfield], [sortby]);
    setListuser(newlistuser);
  };

  //su dung ham debounce de tri hoan viec thuc thi ham khoang 1s trach duoc viec goi api qua nhieu lan
  // moi khi nguoi dung chua dien du thong tin tim kiem vao o input
  const handleSearch = _.debounce((event) => {
    let term = event.target.value;
    // console.log(term);
    if (term) {
      let newlistuser = _.cloneDeep(listuser);
      //loc các phần tử của trường email bằng giá trị trong ô input
      newlistuser = newlistuser.filter((item) => item.email.includes(term));
      setListuser(newlistuser);
    } else {
      getUser(1);
    }
  }, 500);
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
        <ModalDeleteUser
          handleClose={() => setsDeleteNew(false)}
          show={isDeleteNew}
          datauserdelete={datauserdelete}
          handleConfirmUserModal={handleConfirmUserModal}
        />

        <Addusers
          setAddNew={setAddNew}
          listuser={listuser}
          setListuser={setListuser}
        />
        <div className="col-4 my-3">
          <input
            className="form-control"
            placeholder="Search by email..."
            onChange={(event) => handleSearch(event)}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="td-sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </th>

              <th>Email</th>
              <th className="td-sort-header">
                <span>First_name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </th>
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
