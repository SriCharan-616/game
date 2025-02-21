const HeuristicDemo = () => {
    const [selectedNode, setSelectedNode] = React.useState(null);
  
    const handleHover = (node) => {
      setSelectedNode(node);
    };
  
    return (
      <div className="heuristic-demo">
        <h3>Understanding Heuristic (h(x))</h3>
        <p>Hover over nodes to see heuristic values.</p>
        <div className="grid">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="node"
              onMouseEnter={() => handleHover(index)}
            >
              {selectedNode === index ? `h(x) = ${index * 10}` : "•"}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HeuristicDemo;
  