const Explanation = () => {
    return (
      <div className="explanation">
        <h3>What is A* Algorithm?</h3>
        <p>
          A* is a pathfinding algorithm that finds the shortest path from a start node to a goal node.
          It uses:
        </p>
        <ul>
          <li>⚡ <b>g(x)</b> - Cost from the start node to the current node.</li>
          <li>🎯 <b>h(x)</b> - Estimated cost from the current node to the goal.</li>
          <li>🔢 <b>f(x) = g(x) + h(x)</b> - Total cost.</li>
        </ul>
        <p>Click on nodes below to see how the cost functions work!</p>
      </div>
    );
  };
  
  export default Explanation;
  