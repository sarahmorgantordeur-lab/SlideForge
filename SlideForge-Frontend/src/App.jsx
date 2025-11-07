import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import CreateDecks from "./pages/createDecks";
import CreateSlides from "./pages/createSlides";

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-deck" element={<CreateDecks />} />
        <Route path="/create-slides" element={<CreateSlides />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
