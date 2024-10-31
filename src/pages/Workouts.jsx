import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

import workoutsBg from "../assets/workouts-bg.jpg";
import CreateWorkout from "../components/workouts/CreateWorkout";
import WorkoutCard from "../components/workouts/WorkoutCard";
import Loading from "../components/Loading";

export default function Workouts() {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  if (!user && token) {
    return <Loading />;
  }

  if (!user && !token) {
    return <Navigate to="/login" />;
  }

  return (
    <section
      className="h-100 position-relative"
      style={{
        backgroundImage: `url(${workoutsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>

      <div
        className="container workouts position-relative d-flex flex-column gap-3 overflow-auto"
        style={{ maxHeight: "100vh", zIndex: 1 }}
      >
        <div className="d-flex justify-content-between align-items-center pb-3">
          <h1 className="text-light">Pending</h1>
          <CreateWorkout />
        </div>

        <div className="d-flex flex-column gap-3 pb-3">
          {user.workouts.filter((workout) => workout.status === "pending")
            .length > 0 ? (
            user.workouts
              .filter((workout) => workout.status === "pending")
              .reverse()
              .map((workout) => (
                <WorkoutCard key={workout._id} workout={workout} />
              ))
          ) : (
            <div className="bg-light p-3">
              No pending workout. Let&apos;s get to work!
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center pb-3">
          <h1 className="text-light">Finished</h1>
        </div>

        <div className="d-flex flex-column gap-3 pb-3">
          {user.workouts.filter((workout) => workout.status === "completed")
            .length > 0 ? (
            user.workouts
              .filter((workout) => workout.status === "completed")
              .reverse()
              .map((workout) => (
                <WorkoutCard key={workout._id} workout={workout} />
              ))
          ) : (
            <div className="bg-light p-3">
              No finished workout. Let&apos;s get to work!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
