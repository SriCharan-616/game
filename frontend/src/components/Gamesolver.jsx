import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import "./styles/PSPage.css";

const Gamesolver = () => {
  const [code, setCode] = useState("# Write Python code here...");
  const [output, setOutput] = useState("");

  // Function to execute Python code
  const runCode = async () => {
    try {
      const response = await fetch("https://api.jdoodle.com/v1/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script: code,
          language: "python3",
          versionIndex: "3",
          clientId: "your-client-id", // Replace with JDoodle API credentials
          clientSecret: "your-client-secret",
        }),
      });

      const result = await response.json();
      setOutput(result.output || "Error running code");
    } catch (error) {
      setOutput("Execution failed!");
    }
  };

  return (
    <div className="ps-container">
      <h2>Problem Solving</h2>
      <p>Write and run Python code below:</p>

      {/* Code Editor */}
      <CodeMirror
        value={code}
        height="200px"
        extensions={[python()]}
        onChange={(value) => setCode(value)}
        className="code-editor"
      />

      {/* Run Button */}
      <button onClick={runCode} className="run-button">
        Run Code
      </button>

      {/* Output */}
      <div className="output">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Gamesolver;
