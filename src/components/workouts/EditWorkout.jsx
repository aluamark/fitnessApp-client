import { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

export default function EditWorkout({ workout }) {
  const { fetchWorkouts } = useContext(UserContext);
  const [name, setName] = useState();
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const openEdit = () => {
    setShowEdit(true);

    setName(workout.name);
    setDuration(workout.duration);
  };

  const closeEdit = () => {
    setShowEdit(false);

    setName("");
    setDuration("");
  };

  const addWorkout = (event, { name, duration }) => {
    event.preventDefault();
    const toastId = toast.loading("Updating workout..");
    setLoading(true);

    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/workouts/updateWorkout/${workout._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          duration,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.updatedWorkout) {
          fetchWorkouts();
          closeEdit();
          toast.success(data.message, { id: toastId });
        } else {
          toast.error(data.message, { id: toastId });
        }
      })
      .catch(() => toast.error("Something went wrong", { id: toastId }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (name !== "" && duration !== "") {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [name, duration]);

  return (
    <>
      <Button variant="outline-dark" size="sm" onClick={() => openEdit()}>
        <i className="bi bi-pencil-fill" />
      </Button>

      <Modal show={showEdit} onHide={closeEdit} centered>
        <Form onSubmit={(event) => addWorkout(event, { name, duration })}>
          <Modal.Header closeButton className="border border-bottom-0">
            <Modal.Title>Edit Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">
                Duration
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="border border-top-0">
            <Button variant="dark" type="submit" disabled={submitDisabled}>
              {loading ? (
                <Spinner size="sm" className="mx-3" />
              ) : (
                "Save changes"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
