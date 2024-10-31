import { useContext, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

export default function DeleteWorkout({ workout }) {
  const { fetchWorkouts } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const deleteWorkout = () => {
    setLoading(true);
    const toastId = toast.loading("Removing workout..");

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/workouts/deleteWorkout/${workout._id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          fetchWorkouts();
          toast.success(data.message, { id: toastId });
        }
      })
      .catch(() => toast.error("Something went wrong", { id: toastId }))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Button
        variant={
          workout.status === "pending" ? `outline-danger` : "outline-dark"
        }
        size="sm"
        onClick={() => openEdit()}
      >
        <i className="bi bi-x-lg" />
      </Button>

      <Modal show={showEdit} onHide={closeEdit} centered>
        <Modal.Header closeButton className="border border-bottom-0">
          <Modal.Title>Delete Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <span className="text-danger">{workout.name}</span> for{" "}
          {workout.duration}?
        </Modal.Body>
        <Modal.Footer className="border border-top-0">
          <Button variant="dark" onClick={deleteWorkout}>
            {loading ? <Spinner size="sm" className="mx-3" /> : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
