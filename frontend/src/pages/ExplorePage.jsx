import React from "react";
import { Link } from "react-router-dom";
import "./ExplorePage.css";

const ExplorePage = () => {
  return (
    <div className="explore-page">
      <h1>Explore</h1>
      <div className="explore-options">
        <Link to="/games" className="explore-item">
          <h3> Games</h3>
          <p>Play and learn with interactive games.</p>
        </Link>

        <Link to="/learn" className="explore-item">
          <h3> Learn</h3>
          <p>Access knowledge resources.</p>
        </Link>

        <Link to="/problems" className="explore-item">
          <h3>Problems</h3>
          <p>Solve coding challenges.</p>
        </Link>
      </div>
    </div>
  );
};

export default ExplorePage;
