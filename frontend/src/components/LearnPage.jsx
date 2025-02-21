import React, { useState, useEffect } from "react";
import "./styles/LearnPage.css";

const rows = 10;
const cols = 10;

// Manhattan distance heuristic for A*
const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// Generate grid with walls, start, and goal
const generateGrid = () => {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        x: r,
        y: c,
        isWall: false,
        isStart: r === 0 && c === 0,
        isGoal: r === rows - 1 && c === cols - 1,
        visited: false,
        path: false,
      });
    }
    grid.push(row);
  }
  return grid;
};

const LearnPage = () => {
  const [grid, setGrid] = useState(generateGrid);
  const [running, setRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState("A*");
  const [startNode, setStartNode] = useState({ x: 0, y: 0 });
  const [goalNode, setGoalNode] = useState({ x: rows - 1, y: cols - 1 });

  const getNeighbors = (node) => {
    const { x, y } = node;
    const neighbors = [];
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && !grid[newX][newY].isWall) {
        neighbors.push(grid[newX][newY]);
      }
    }
    return neighbors;
  };

  const visualizePath = (cameFrom) => {
    let current = goalNode;
    const newGrid = grid.map(row => row.map(node => ({ ...node, path: false })));

    while (cameFrom[current.x + "," + current.y]) {
      current = cameFrom[current.x + "," + current.y];
      newGrid[current.x][current.y].path = true;
    }
    setGrid(newGrid);
  };

  const visualizeAlgorithm = async () => {
    setRunning(true);
    const newGrid = grid.map(row => row.map(node => ({ ...node, visited: false, path: false })));
    let cameFrom = {};

    if (algorithm === "BFS") {
      await breadthFirstSearch(newGrid, cameFrom);
    } else if (algorithm === "Dijkstra") {
      await dijkstra(newGrid, cameFrom);
    } else {
      await aStar(newGrid, cameFrom);
    }

    visualizePath(cameFrom);
    setRunning(false);
  };

  const breadthFirstSearch = async (grid, cameFrom) => {
    const queue = [startNode];
    cameFrom[startNode.x + "," + startNode.y] = null;

    while (queue.length) {
      const current = queue.shift();
      grid[current.x][current.y].visited = true;
      setGrid([...grid]);
      await new Promise(resolve => setTimeout(resolve, 50));

      if (current === goalNode) break;
      for (const neighbor of getNeighbors(current)) {
        if (!(neighbor.x + "," + neighbor.y in cameFrom)) {
          queue.push(neighbor);
          cameFrom[neighbor.x + "," + neighbor.y] = current;
        }
      }
    }
  };

  const dijkstra = async (grid, cameFrom) => {
    const pq = [{ node: startNode, cost: 0 }];
    const costSoFar = { [startNode.x + "," + startNode.y]: 0 };

    while (pq.length) {
      pq.sort((a, b) => a.cost - b.cost);
      const { node: current } = pq.shift();
      grid[current.x][current.y].visited = true;
      setGrid([...grid]);
      await new Promise(resolve => setTimeout(resolve, 50));

      if (current === goalNode) break;
      for (const neighbor of getNeighbors(current)) {
        const newCost = costSoFar[current.x + "," + current.y] + 1;
        if (!(neighbor.x + "," + neighbor.y in costSoFar) || newCost < costSoFar[neighbor.x + "," + neighbor.y]) {
          costSoFar[neighbor.x + "," + neighbor.y] = newCost;
          pq.push({ node: neighbor, cost: newCost });
          cameFrom[neighbor.x + "," + neighbor.y] = current;
        }
      }
    }
  };

  const aStar = async (grid, cameFrom) => {
    const pq = [{ node: startNode, cost: 0 }];
    const costSoFar = { [startNode.x + "," + startNode.y]: 0 };

    while (pq.length) {
      pq.sort((a, b) => a.cost - b.cost);
      const { node: current } = pq.shift();
      grid[current.x][current.y].visited = true;
      setGrid([...grid]);
      await new Promise(resolve => setTimeout(resolve, 50));

      if (current === goalNode) break;
      for (const neighbor of getNeighbors(current)) {
        const newCost = costSoFar[current.x + "," + current.y] + 1;
        if (!(neighbor.x + "," + neighbor.y in costSoFar) || newCost < costSoFar[neighbor.x + "," + neighbor.y]) {
          costSoFar[neighbor.x + "," + neighbor.y] = newCost;
          const priority = newCost + heuristic(goalNode, neighbor);
          pq.push({ node: neighbor, cost: priority });
          cameFrom[neighbor.x + "," + neighbor.y] = current;
        }
      }
    }
  };

  const handleCellClick = (row, col) => {
    if (running) return;
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

    if (newGrid[row][col].isStart) {
      setStartNode({ x: row, y: col });
    } else if (newGrid[row][col].isGoal) {
      setGoalNode({ x: row, y: col });
    } else {
      newGrid[row][col].isWall = !newGrid[row][col].isWall;
    }

    setGrid(newGrid);
  };

  return (
    <div className="learn-page">
      <h1>Pathfinding Algorithm Visualizer</h1>

      <section>
        <h2>Breadth-First Search (BFS)</h2>
        <p>BFS expands outward equally from the starting point.</p>
        <button onClick={() => setAlgorithm("BFS")}>Visualize BFS</button>
      </section>

      <section>
        <h2>Dijkstra’s Algorithm</h2>
        <p>Dijkstra’s Algorithm accounts for movement costs.</p>
        <button onClick={() => setAlgorithm("Dijkstra")}>Visualize Dijkstra</button>
      </section>

      <section>
        <h2>A* Algorithm</h2>
        <p>A* combines the efficiency of Dijkstra’s Algorithm with goal orientation.</p>
        <button onClick={() => setAlgorithm("A*")}>Visualize A*</button>
      </section>

      <button onClick={visualizeAlgorithm} disabled={running}>Run {algorithm}</button>

      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((node, colIdx) => (
              <div key={colIdx} onClick={() => handleCellClick(rowIdx, colIdx)}
                className={`node ${node.isWall ? "wall" : ""} ${node.visited ? "visited" : ""} ${node.path ? "path" : ""} ${node.isStart ? "start" : ""} ${node.isGoal ? "goal" : ""}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnPage;
