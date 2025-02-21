import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import "./styles/PSPage.css";
import { FaLightbulb } from "react-icons/fa"; // Bulb icon for streak

const languageOptions = {
  python: { name: "Python", lang: python, mode: "python3" },
  javascript: { name: "JavaScript", lang: javascript, mode: "nodejs" },
  cpp: { name: "C++", lang: cpp, mode: "cpp17" },
};

const PSPage = () => {
  const { id } = useParams();
  const [code, setCode] = useState("# Write your code here...");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");

  // Function to execute code (Use your API credentials)
  const runCode = async () => {
    try {
      const response = await fetch("https://api.jdoodle.com/v1/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script: code,
          language: languageOptions[language].mode,
          versionIndex: "3",
          clientId: "your-client-id",
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
      <div className="header">
        <h2>Problem {id}</h2>
        <FaLightbulb className="streak-icon" title="Stay consistent!" />
      </div>

      {/* Language Selector */}
      <div className="language-selector">
        <label>Choose Language:</label>
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          {Object.keys(languageOptions).map((lang) => (
            <option key={lang} value={lang}>
              {languageOptions[lang].name}
            </option>
          ))}
        </select>
      </div>

      {/* Code Editor */}
      <CodeMirror
        value={code}
        height="250px"
        extensions={[languageOptions[language].lang()]}
        onChange={(value) => setCode(value)}
        className="code-editor"
      />

      {/* Buttons */}
      <div className="button-group">
        <button onClick={runCode} className="run-button">Run</button>
        <button className="submit-button">Submit</button>
        <Link to={`/discussion/${id}`} className="discussion-button">Discussion</Link>
        <Link to={`/solution/${id}`} className="solution-button">Solution</Link>
      </div>

      {/* Output Display */}
      <div className="output">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default PSPage;
