import React from "react";
import GraphVisualizer from "./GraphVisualizer";
import HeuristicDemo from "./HeuristicDemo";
import PathfindingSimulation from "./PathfindingSimulation";
import Explanation from "./Explanation";
import Controls from "./Controls";

const LearnPage = () => {
  return (
    <div className="learn-container">
      <h2>A* Algorithm Visualizer</h2>
      <Explanation />
      <GraphVisualizer />
      <HeuristicDemo />
      <PathfindingSimulation />
      <Controls />
    </div>
  );
};

export default LearnPage;
