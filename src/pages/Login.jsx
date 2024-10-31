import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

import loginBg from "../assets/login-bg.jpg";
import { Spinner } from "react-bootstrap";
import Loading from "../components/Loading";

export default function Register() {
  const { user, login, loginLoading, setLoginLoading, fetchWorkouts } =
    useContext(UserContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (credentials.email !== "" && credentials.password !== "") {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [credentials]);

  const handleLogin = (event) => {
    event.preventDefault();

    const toastId = toast.loading("Logging in..");

    login(credentials)
      .then((data) => {
        if (data.error || data.message) {
          toast.error(data.error || data.message, { id: toastId });
        } else if (data.access) {
          localStorage.setItem("token", data.access);
          fetchWorkouts();
          setCredentials({
            email: "",
            password: "",
          });

          toast.success("Welcome back!", { id: toastId });
          navigate("/workouts");
        }
      })
      .catch(() => toast.error("Something went wrong", { id: toastId }))
      .finally(() => setLoginLoading(false));
  };

  if (!user && token) {
    return <Loading />;
  }

  if (user && token) {
    return <Navigate to="/workouts" />;
  }

  return (
    <section
      className="h-100 d-flex justify-content-center align-items-center position-relative"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>

      <div className="row w-100 justify-content-center px-3 px-lg-0">
        <div
          className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 border rounded-3 p-4 bg-light"
          style={{ zIndex: 1 }}
        >
          <h1>Login</h1>
          <form className="pt-3" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
                <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={credentials.email}
                onChange={(event) =>
                  setCredentials({ ...credentials, email: event.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
                <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    password: event.target.value,
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark w-100 mt-3"
              disabled={submitDisabled}
            >
              {loginLoading ? <Spinner size="sm" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
