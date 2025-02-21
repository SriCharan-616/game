import React, { useState } from "react";
import { Link } from "react-router-dom";
import './styles/ProblemList.css'
const ProblemList = () => {
  const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: "47%", status: "attempted" },
    { id: 2, title: "Longest Substring", difficulty: "Medium", acceptance: "32%", status: "submitted" },
    { id: 3, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: "29%", status: "not attempted" },
    { id: 4, title: "Valid Parentheses", difficulty: "Easy", acceptance: "58%", status: "attempted" },
    { id: 5, title: "Merge Intervals", difficulty: "Medium", acceptance: "42%", status: "submitted" },
    { id: 6, title: "Word Break", difficulty: "Medium", acceptance: "38%", status: "not attempted" },
    { id: 7, title: "Max Subarray", difficulty: "Easy", acceptance: "53%", status: "attempted" },
    { id: 8, title: "Coin Change", difficulty: "Medium", acceptance: "36%", status: "not attempted" },
    { id: 9, title: "Trapping Rain Water", difficulty: "Hard", acceptance: "27%", status: "submitted" },
    { id: 10, title: "LRU Cache", difficulty: "Hard", acceptance: "24%", status: "not attempted" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter logic
  const filteredProblems = problems.filter((problem) => {
    return (
      (difficultyFilter === "All" || problem.difficulty === difficultyFilter) &&
      (statusFilter === "All" || problem.status === statusFilter) &&
      problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="problem-list-container">
      <h2>Problem Set</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search problems..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => setDifficultyFilter(e.target.value)} value={difficultyFilter}>
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="All">All Status</option>
          <option value="attempted">Attempted</option>
          <option value="submitted">Submitted</option>
          <option value="not attempted">Not Attempted</option>
        </select>
      </div>

      {/* Problem List */}
      <ul className="problem-list">
        {filteredProblems.map((problem) => (
          <li key={problem.id} className={`problem ${problem.difficulty.toLowerCase()}`}>
            <Link to={`/problem/${problem.id}`}>
              <span className="title">{problem.title}</span> 
              <span className="difficulty">{problem.difficulty}</span> 
              <span className="acceptance">Acceptance: {problem.acceptance}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemList;
