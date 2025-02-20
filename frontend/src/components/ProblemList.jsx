import React from "react";
import { Link } from "react-router-dom";

const ProblemList = () => {
  const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy" },
    { id: 2, title: "Longest Substring", difficulty: "Medium" },
    { id: 3, title: "Median of Two Sorted Arrays", difficulty: "Hard" },
  ];

  return (
    <div className="problem-list">
      <h2>Problem Set</h2>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <Link to={`/problem/${problem.id}`}>{problem.title} ({problem.difficulty})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemList;
