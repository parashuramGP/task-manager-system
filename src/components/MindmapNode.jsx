import { useState } from "react";

function MindmapNode({ node, selectedNode, onSelect, level }) {
  const [expanded, setExpanded] = useState(true);
  const [hovered, setHovered] = useState(false);

  const isSelected = selectedNode?.id === node.id;
  const levelClass = `level-${level}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",   // 🔥 THIS FIXES ALIGNMENT
        marginTop: "24px",
        position: "relative",
      }}
    >
      {/* NODE */}
      <div
        className={`node ${levelClass} ${isSelected ? "selected" : ""} ${
          level === 0 ? "root" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {node.title}
      </div>

      {/* TOOLTIP */}
      {hovered && <div className="tooltip">{node.summary}</div>}

      {/* CHILDREN */}
      {expanded && node.children?.length > 0 && (
        <div
          className="children"
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "30px",
          }}
        >
          {node.children.map((child) => (
            <MindmapNode
              key={child.id}
              node={child}
              selectedNode={selectedNode}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MindmapNode;
