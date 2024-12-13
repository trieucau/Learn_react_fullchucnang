import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../managecontext/UserContext";

export default function Header() {
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();
  const handlLogout = () => {
    logout();
    navigate("/");
    toast.success("Đăng xuất thành công!", {
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
  return (
    <>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={NavLink} to="/">
              <img src={logo} height="50" width="50" />
              <span>Learn_React</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              {((user && user.email) ||
                window.location.pathname === "/" ||
                window.location.pathname === "/users") && (
                <>
                  <Nav className="me-auto">
                    <NavLink to="/" className="nav-link">
                      Home
                    </NavLink>
                    <NavLink to="/users" className="nav-link">
                      Manager Users
                    </NavLink>
                  </Nav>
                  <Nav>
                    {user && user.email && (
                      <span className="nav-link">
                        <strong>Welcome {user.email}! </strong>
                      </span>
                    )}
                    <NavDropdown title="Setting">
                      {user && user.auth === true ? (
                        <NavDropdown.Item
                          as={NavLink}
                          to="/"
                          onClick={() => handlLogout()}
                        >
                          Log out
                        </NavDropdown.Item>
                      ) : (
                        <NavDropdown.Item as={NavLink} to="/login">
                          Log in
                        </NavDropdown.Item>
                      )}
                    </NavDropdown>
                  </Nav>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}
