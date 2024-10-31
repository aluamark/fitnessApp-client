import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <section className="h-100 d-flex justify-content-center align-items-center bg-black text-light">
      <Spinner />
    </section>
  );
}
