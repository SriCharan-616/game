const Controls = ({ onStart, onReset }) => {
    return (
      <div className="controls">
        <button onClick={onStart}>Start A*</button>
        <button onClick={onReset}>Reset</button>
        <label>Choose Heuristic:</label>
        <select>
          <option value="manhattan">Manhattan Distance</option>
          <option value="euclidean">Euclidean Distance</option>
        </select>
      </div>
    );
  };
  
  export default Controls;
  