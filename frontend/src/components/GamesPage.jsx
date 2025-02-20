import React from "react";
import AstarVisualizer from "./AstarVisualizer"; // Import the A* Visualizer

const GamesPage = () => {
  return (
    <div>
      <h2>Games</h2>
      <p>Play interactive learning games.</p>
      
      {/* Add the A* Visualizer below */}
      <AstarVisualizer />
    </div>
  );
};

export default GamesPage;
