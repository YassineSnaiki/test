import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login";
import Home from "./assets/pages/Home";
import Header from "./assets/components/Header";
import Register from "./assets/pages/Register";
import Cars from "./assets/pages/Cars";
import Car from "./assets/pages/Car";
import MyTickets from "./assets/pages/MyTickets";
import Ticket from "./assets/pages/Ticket";
import Tickets from "./assets/pages/Tickets";

export default function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/tickets/:id" element={<Ticket/>} />
        <Route path="/tickets" element={<Tickets/>} />
        <Route path="/car/:id" element={<Car />} />
      </Routes>
    </Router>
  );
}


