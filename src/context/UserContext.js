import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const token = localStorage.getItem("token");

  const register = async (credentials) => {
    setRegisterLoading(true);
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }).then((response) => response.json());
  };

  const login = async (credentials) => {
    setLoginLoading(true);
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }).then((response) => response.json());
  };

  const fetchWorkouts = () => {
    if (token) {
      return fetch(
        `${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "No Workouts found.") {
            setUser({ workouts: [] });
          } else {
            setUser(data);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    }
  };

  const unsetUser = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    fetchWorkouts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        unsetUser,
        register,
        registerLoading,
        setRegisterLoading,
        login,
        loginLoading,
        setLoginLoading,
        fetchWorkouts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
