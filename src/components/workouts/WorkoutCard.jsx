import { useContext, useState } from "react";
import EditWorkout from "./EditWorkout";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { Spinner } from "react-bootstrap";
import DeleteWorkout from "./DeleteWorkout";

export default function WorkoutCard({ workout }) {
  const { fetchWorkouts } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const isDisabled = workout.status !== "pending";

  const finishWorkout = () => {
    if (workout.status !== "pending") return;

    setLoading(true);
    const toastId = toast.loading("Finishing workout..");

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/workouts/completeWorkoutStatus/${workout._id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if ((data.message = "Workout status updated successfully")) {
          fetchWorkouts();
          toast.success(data.message, { id: toastId });
        }
      })
      .catch(() => toast.error("Something went wrong", { id: toastId }))
      .finally(() => setLoading(false));
  };

  return (
    <div
      className={`bg-light p-3 w-100 ${isDisabled ? "opacity-50" : ""}`}
      style={{ pointerEvents: isDisabled ? "none" : "auto" }}
    >
      {loading ? (
        <div className="text-center pt-1">
          <Spinner size="sm" />
        </div>
      ) : (
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-6">
            <div className="d-flex gap-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id={`flexCheckDefault-${workout._id}`}
                  checked={workout.status !== "pending"}
                  onChange={finishWorkout}
                  disabled={isDisabled}
                />
              </div>
              <span className="fw-bold">{workout.name}</span>
            </div>
          </div>

          <div
            className={
              workout.status === "pending"
                ? "col-4"
                : "col-6 d-flex justify-content-end"
            }
          >
            <span>{workout.duration}</span>
          </div>

          {workout.status === "pending" && (
            <div className="col-2 d-flex justify-content-end gap-1">
              <EditWorkout workout={workout} />
              <DeleteWorkout workout={workout} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
