import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Identity from "./pages/Identity";
import DemoExam from "./pages/DemoExam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Identity" element={<Identity />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Exam" element={<DemoExam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
