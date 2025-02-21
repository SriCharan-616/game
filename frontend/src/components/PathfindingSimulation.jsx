import React, { useState } from "react";
import "./styles/simulate.css";  // Import the CSS file

const PathfindingSimulation = () => {
  const [visitedNodes, setVisitedNodes] = useState([]);

  const startAlgorithm = () => {
    let steps = [];
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        steps.push(i);
        setVisitedNodes([...steps]);
      }, i * 500);
    }
  };

  return (
    <div className="simulation">
      <h3>Pathfinding Simulation</h3>
      <button onClick={startAlgorithm}>Start A*</button>
      <div className="grid">
        {[...Array(5)].map((_, index) => (
          <div key={index} className={visitedNodes.includes(index) ? "visited node" : "node"}>
            {visitedNodes.includes(index) ? "✓" : "•"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathfindingSimulation;
