export default function Addusers({ setAddNew }) {
  return (
    <>
      <div className=" my-3 d-flex justify-content-between  align-items-center">
        <span>ListUser:</span>
        <button
          onClick={() => setAddNew(true)}
          type="button"
          className="btn btn-success p-2  "
        >
          Add New User
        </button>
      </div>
    </>
  );
}
