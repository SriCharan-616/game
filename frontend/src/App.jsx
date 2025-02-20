import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProblemList from "./components/ProblemList";
import ProblemDetails from "./components/ProblemDetails";
import RegisterForm from "./components/RegisterForm";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import PSPage from "./components/PSPage";
import GamesPage from "./components/GamesPage";
import LearnPage from "./components/LearnPage";
import "./styles/styles.css"; // ✅ Import styles

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problem/:problemId" element={<ProblemDetails />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ps" element={<PSPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/learn" element={<LearnPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
