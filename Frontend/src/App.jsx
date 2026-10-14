import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Requests from "./pages/Requests";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* DASHBOARD */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PAGES */}
        <Route path="/requests" element={<Requests />} />
        <Route path="/analytics" element={<Analytics />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;