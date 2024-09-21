// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Pagamento from "./pages/Pagamento";
import Success from "./pages/Success";
import Cadastro from "./pages/Cadastro";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/" element={<Pagamento />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  </Router>
);

export default App;
