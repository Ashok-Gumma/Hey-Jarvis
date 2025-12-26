import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
