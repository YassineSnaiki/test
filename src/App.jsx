import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login";
import Home from "./assets/pages/Home";
import Header from "./assets/components/Header";
import Register from "./assets/pages/Register";
import Cars from "./assets/pages/Cars";
import Car from "./assets/pages/Car";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car/:id" element={<Car />} />
      </Routes>
    </Router>
  );
}

export default App;
