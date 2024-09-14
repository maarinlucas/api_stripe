import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Pagamento from "./pages/Pagamento";
import Success from "./pages/Success";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/" element={<Pagamento />} />
    </Routes>
  </Router>
);

export default App;
