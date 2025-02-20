import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles/HomePage.css"; // Ensure this file contains the animations
import RippleButton from "./RippleButton"; // Import the ripple effect button

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <header className="hero-section">
        <h1>
          Welcome to <span>Gamified Learning</span>
        </h1>
        <p>Level up your skills through interactive games and challenges.</p>
      </header>

      {/* LOGIN SECTION */}
      <section className="login-section">
        {/* Use the RippleButton component with navigation */}
        <RippleButton onClick={handleLoginClick} />
      </section>

      {/* EXPLORE SECTION */}
      <section className="explore-section">
        <h2>Discover Your Path</h2>
        <div className="explore-options">
          <Link to="/games" className="explore-item">
            <h3>Games</h3>
            <p>Play interactive educational games and have fun while learning.</p>
          </Link>

          <Link to="/learn" className="explore-item">
            <h3>Learn</h3>
            <p>Dive into knowledge with curated learning resources.</p>
          </Link>

          <Link to="/problems" className="explore-item">
            <h3>Problems</h3>
            <p>Challenge yourself with coding problems and puzzles.</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
