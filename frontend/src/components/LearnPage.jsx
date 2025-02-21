import React, { useState } from "react";
import "./styles/LearnPage.css";

const rows = 5;
const cols = 5;

const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

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

const GridVisualizer = ({ algorithm, title }) => {
  const [grid, setGrid] = useState(generateGrid);
  const [running, setRunning] = useState(false);
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

      if (current.x === goalNode.x && current.y === goalNode.y) break;
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

      if (current.x === goalNode.x && current.y === goalNode.y) break;
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

      if (current.x === goalNode.x && current.y === goalNode.y) break;
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

  const handleReset = () => {
    setGrid(generateGrid());
  };

  const handleCellClick = (rowIdx, colIdx) => {
    setGrid((prevGrid) => {
      return prevGrid.map((row, rIdx) =>
        row.map((node, cIdx) => {
          if (rIdx === rowIdx && cIdx === colIdx) {
            return { ...node, isWall: !node.isWall }; // Toggle wall state
          }
          return node;
        })
      );
    });
  };

  return (
    <div className="grid-container">
      <h2>{title}</h2>
      <button onClick={visualizeAlgorithm} disabled={running}>Run {algorithm}</button>
      <button onClick={handleReset} disabled={running}>Reset Grid</button>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((node, colIdx) => (
              <div
                key={colIdx}
                className={`node ${node.isWall ? "wall" : ""} ${node.visited ? "visited" : ""} ${node.path ? "path" : ""} ${node.isStart ? "start" : ""} ${node.isGoal ? "goal" : ""}`}
                onClick={() => handleCellClick(rowIdx, colIdx)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const LearnPage = () => {
  return (
    <div className="learn-page">
      <h1>Pathfinding Algorithm Visualizer</h1>
      <GridVisualizer algorithm="BFS" title="Breadth-First Search (BFS)" />
      <GridVisualizer algorithm="Dijkstra" title="Dijkstra’s Algorithm" />
      <GridVisualizer algorithm="A*" title="A* Algorithm" />
    </div>
  );
};

export default LearnPage;

