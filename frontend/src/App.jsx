import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Background from "./components/common/Background"; 
import ProblemList from "./components/ProblemList";
import ProblemDetails from "./components/ProblemDetails";
import RegisterForm from "./components/RegisterForm";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import PSPage from "./components/PSPage";
import GamesPage from "./components/GamesPage";
import LearnPage from "./components/LearnPage";
import "./components/styles/styles.css"; 
import Gamesolver from "./components/Gamesolver";

const App = () => {
  return (
    <Router>
      <Background /> 
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problem/:problemId" element={<PSPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ps" element={<Gamesolver />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/learn" element={<LearnPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
