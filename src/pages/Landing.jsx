import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function Landing() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <section className="h-100 d-flex justify-content-center align-items-center bg-black text-light">
        Loading...
      </section>
    );
  }

  if (user) {
    return <Navigate to="/workouts" />;
  }

  return <Navigate to="/register" />;
}
