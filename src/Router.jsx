import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/navbar/AppNavbar";

import Landing from "./pages/Landing";
import Workouts from "./pages/Workouts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

export default function Router() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}
