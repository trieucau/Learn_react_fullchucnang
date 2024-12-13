import { CSVLink } from "react-csv";
import Papa from "papaparse";
import "./Addusers.scss";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
export default function Addusers({ setAddNew, listuser, setListuser }) {
  const [dataExport, setDataExport] = useState([]);

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

  //lay ra data export
  const getUsersExport = (event, done) => {
    let result = [];
    if (listuser && listuser.length > 0) {
      result.push(["Id", "email", "first name", "last name"]);
      listuser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };
  //import file
  const importCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        err("khong dung dinh dang");
        return;
      }
      Papa.parse(file, {
        header: false,
        complete: function (result) {
          let dataCSV = result.data;
          // arr[ arr[], arr[]];
          if (dataCSV.length > 0) {
            if (dataCSV[0] && dataCSV[0].length === 4) {
              if (
                dataCSV[0][0] !== "Id" ||
                dataCSV[0][1] !== "email" ||
                dataCSV[0][2] !== "first_name" ||
                dataCSV[0][3] !== "last_name"
              ) {
                let kq = [];
                dataCSV.map((item, index) => {
                  if (index > 0 && item.length === 4) {
                    let obj = {};
                    obj.id = item[0];
                    obj.email = item[1];
                    obj.first_name = item[2];
                    obj.last_name = item[3];
                    kq.push(obj);
                  }
                });
                setListuser(kq);
                success("import file thanh cong!");
              } else {
                err("khong dung dinh dang header!");
              }
            } else {
              err("khong dung dinh dang du lieu!");
            }
          } else {
            err("file khong ton tai du lieu!");
          }
        },
      });
    }
  };

  return (
    <>
      <div className=" my-3 d-flex justify-content-between  align-items-center">
        <span>ListUser:</span>
        <div className="group-btns">
          <label htmlFor="test" className="btn btn-warning  p-2">
            <i className="fa-solid fa-file-import"></i> Import
          </label>
          <input
            id="test"
            type="file"
            onChange={(event) => importCSV(event)}
            hidden
          />
          <CSVLink
            data={dataExport}
            filename={"Data_listuser.csv"}
            className="btn btn-primary  p-2"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-download"></i> Export
          </CSVLink>
          <button
            onClick={() => setAddNew(true)}
            type="button"
            className="btn btn-success p-2  "
          >
            <i className="fa-solid fa-circle-plus"></i> Add New
          </button>
        </div>
      </div>
    </>
  );
}
