import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import flexWhite from "../../assets/flex-white.png";
import { UserContext } from "../../context/UserContext";

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar className="bg-black" fixed="top">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/workouts"
          className="text-light fw-semibold"
        >
          <img
            src={flexWhite}
            alt="website-logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top me-2"
          />
          BuiltDiff
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-3">
          {user ? (
            <NavLink to="/logout" className="btn btn-outline-danger">
              <i className="bi bi-box-arrow-right pe-1" />
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/register"
                className="text-light link-underline link-underline-opacity-0"
              >
                <i className="bi bi-person-add pe-1" />
                Register
              </NavLink>
              <NavLink to="/login" className="btn btn-outline-light">
                <i className="bi bi-box-arrow-in-left pe-1" />
                Login
              </NavLink>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
