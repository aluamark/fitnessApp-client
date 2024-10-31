import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Logout() {
  const { unsetUser } = useContext(UserContext);

  useEffect(() => {
    unsetUser();
  }, [unsetUser]);

  return <Navigate to="/login" />;
}
