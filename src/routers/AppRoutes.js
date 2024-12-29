import TableUser from "../components/TableUser";
import Home from "../components/Home";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "./NotFound";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUser />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
