import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Room from "./components/Room/Room";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/chat" element={<Room />} />
    </Routes>
  </BrowserRouter>
);

export default App;
