import "./App.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import { useSelector, useDispatch } from "react-redux";
import { clearLoginStatus } from "./Slice/userSlice";
function App() {
  let { isSuccess } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let logout = () => {
    localStorage.clear();
    dispatch(clearLoginStatus());
  };
  return (
    <>
      <Navbar className="bg-dark navbar-dark" expand="sm">
        <Container>
          <Navbar.Brand href="#home">Just-A-Page</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isSuccess == false ? (
                <>
                  <NavLink className="links" to="/">
                    Home
                  </NavLink>
                  <NavLink className="links" to="/register">
                    Register
                  </NavLink>
                  <NavLink className="links" to="/login">
                    Login
                  </NavLink>
                </>
              ) : (
                <NavLink className="links" to="/login" onClick={logout}>
                  Logout
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard/:username" element={<UserDashboard />} />
      </Routes>
    </>
  );
}

export default App;
