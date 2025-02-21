import React, { useState, useEffect } from "react";
import "./styles/AstarGame.css";

const ROWS = 20;
const COLS = 30;
const MOVE_DELAY = 2000; // AI starts moving after 2 seconds

const NodeType = {
  EMPTY: "empty",
  PLAYER: "player",
  GOAL: "goal",
  WALL: "wall",
  PATH: "path",
  VISITED: "visited",
  AI: "ai",
};

// Heuristic function for A*
const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const AstarGame = () => {
  const [grid, setGrid] = useState([]);
  const [player, setPlayer] = useState({ x: 2, y: 2 });
  const [goal, setGoal] = useState({ x: ROWS - 2, y: COLS - 2 });
  const [ai, setAI] = useState(null);
  const [moves, setMoves] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    resetGrid();
  }, []);

  useEffect(() => {
    // AI starts moving after a delay
    if (ai === null) {
      setTimeout(() => setAI({ x: ROWS - 2, y: 2 }), MOVE_DELAY);
    }
  }, [ai]);

  useEffect(() => {
    if (ai) {
      const interval = setInterval(() => moveAI(), 500); // AI moves every 0.5s
      return () => clearInterval(interval);
    }
  }, [ai]);

  const resetGrid = () => {
    const newGrid = Array.from({ length: ROWS }, (_, row) =>
      Array.from({ length: COLS }, (_, col) => ({
        x: row,
        y: col,
        type:
          row === player.x && col === player.y
            ? NodeType.PLAYER
            : row === goal.x && col === goal.y
            ? NodeType.GOAL
            : NodeType.EMPTY,
      }))
    );
    setGrid(newGrid);
    setMoves(0);
    setAI(null);
  };

  const handleCellClick = (row, col) => {
    const newGrid = [...grid];
    if (newGrid[row][col].type === NodeType.EMPTY) {
      newGrid[row][col].type = NodeType.WALL;
    } else if (newGrid[row][col].type === NodeType.WALL) {
      newGrid[row][col].type = NodeType.EMPTY;
    }
    setGrid(newGrid);
  };

  // Handle player movement
  const movePlayer = (dx, dy) => {
    if (running) return;
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (isValidMove(newX, newY)) {
      const newGrid = [...grid];
      newGrid[player.x][player.y].type = NodeType.EMPTY;
      newGrid[newX][newY].type = NodeType.PLAYER;
      setGrid(newGrid);
      setPlayer({ x: newX, y: newY });
      setMoves(moves + 1);

      // Check for win
      if (newX === goal.x && newY === goal.y) {
        alert(`You Win in ${moves + 1} moves!`);
        resetGrid();
      }
    }
  };

  // AI movement using A*
  const moveAI = () => {
    if (!ai) return;
    const path = aStarPath(ai, player);

    if (path.length > 1) {
      const nextMove = path[1]; // AI moves one step
      const newGrid = [...grid];
      newGrid[ai.x][ai.y].type = NodeType.EMPTY;
      newGrid[nextMove.x][nextMove.y].type = NodeType.AI;
      setGrid(newGrid);
      setAI(nextMove);

      // Check for loss
      if (nextMove.x === player.x && nextMove.y === player.y) {
        alert("AI Caught You! Game Over.");
        resetGrid();
      }
    }
  };

  const isValidMove = (x, y) =>
    x >= 0 && x < ROWS && y >= 0 && y < COLS && grid[x][y].type !== NodeType.WALL;

  // A* Algorithm
  const aStarPath = (start, end) => {
    let openSet = [];
    let closedSet = new Set();

    openSet.push({
      ...start,
      g: 0,
      h: heuristic(start, end),
      f: heuristic(start, end),
      parent: null,
    });

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      let current = openSet.shift();

      if (current.x === end.x && current.y === end.y) {
        return reconstructPath(current);
      }

      closedSet.add(`${current.x},${current.y}`);

      for (let neighbor of getNeighbors(current)) {
        if (closedSet.has(`${neighbor.x},${neighbor.y}`) || !isValidMove(neighbor.x, neighbor.y)) continue;

        let gScore = current.g + 1;
        let hScore = heuristic(neighbor, end);
        let fScore = gScore + hScore;

        let existing = openSet.find(n => n.x === neighbor.x && n.y === neighbor.y);
        if (!existing || gScore < existing.g) {
          openSet.push({ ...neighbor, g: gScore, h: hScore, f: fScore, parent: current });
        }
      }
    }
    return [];
  };

  const getNeighbors = node => {
    const directions = [
      { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, // Cardinal
      { x: 1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 } // Diagonal
    ];
    return directions.map(dir => ({ x: node.x + dir.x, y: node.y + dir.y }));
  };

  const reconstructPath = node => {
    let path = [];
    while (node) {
      path.push(node);
      node = node.parent;
    }
    return path.reverse();
  };

  return (
    <div className="visualizer">
      <h2>Escape the AI!</h2>
      <p>Moves: {moves}</p>
      <div className="grid-game">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className={`cell ${cell.type}`} onClick={() => handleCellClick(rowIndex, colIndex)} />
          ))
        )}
      </div>
      <button onClick={resetGrid}>Reset</button>
      <p>Use Arrow Keys / WASD to Move</p>
    </div>
  );
};

export default AstarGame;
