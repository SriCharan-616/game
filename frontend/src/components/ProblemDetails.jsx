import React from "react";
import { useParams } from "react-router-dom";

const ProblemDetails = () => {
  const { problemId } = useParams();
  const problem = {
    1: { title: "Two Sum", description: "Find two numbers that add up to a target sum." },
    2: { title: "Longest Substring", description: "Find the length of the longest substring without repeating characters." },
    3: { title: "Median of Two Sorted Arrays", description: "Find the median of two sorted arrays." },
  };

  return (
    <div className="problem-details">
      <h2>{problem[problemId]?.title}</h2>
      <p>{problem[problemId]?.description}</p>
    </div>
  );
};

export default ProblemDetails;
