import { useState, useRef } from "react";
import initialData from "./data/mindmap.json";
import Mindmap from "./components/Mindmap";
import SidePanel from "./components/SidePanel";

function App() {
  const [mindmapData, setMindmapData] = useState(initialData);
  const [selectedNode, setSelectedNode] = useState(null);
  const canvasRef = useRef(null);

  const resetView = () => {
    setSelectedNode(null);
    canvasRef.current.scrollTop = 0;
    canvasRef.current.scrollLeft = 0;
  };

  // 🔥 Recursive update function
  const updateNode = (node, updatedNode) => {
    if (node.id === updatedNode.id) {
      return { ...node, ...updatedNode };
    }

    if (!node.children) return node;

    return {
      ...node,
      children: node.children.map((child) =>
        updateNode(child, updatedNode)
      ),
    };
  };

  const handleSave = (updatedNode) => {
    setMindmapData((prev) => updateNode(prev, updatedNode));
    setSelectedNode(updatedNode);
  };

  return (
    <div className="app-container">
      <div ref={canvasRef} className="mindmap-container">
        <div className="toolbar">
          <button className="btn btn-primary">Expand All</button>
          <button className="btn btn-secondary">Collapse All</button>
          <button className="btn btn-secondary">Drill Down</button>
          <button className="btn btn-secondary">Drill Up</button>
          <button className="btn btn-warning" onClick={resetView}>
            Fit View
          </button>
          <button className="btn btn-success">Add Node</button>
        </div>

        <Mindmap
          data={mindmapData}
          selectedNode={selectedNode}
          onSelect={setSelectedNode}
        />
      </div>

      <SidePanel node={selectedNode} onSave={handleSave} />
    </div>
  );
}

export default App;
