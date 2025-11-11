import { Routes, Route } from "react-router-dom";
import CreateDecks from "./pages/createDecks";
import CreateSlides from "./pages/createSlides";
import Login from "./pages/login";
import Register from "./pages/register";

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/create-deck" element={<CreateDecks />} />
      <Route path="/create-slides" element={<CreateSlides />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default MainRouter;
