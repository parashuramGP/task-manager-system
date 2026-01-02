import MindmapNode from "./MindmapNode";

function Mindmap({ data, selectedNode, onSelect }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <MindmapNode
        node={data}
        selectedNode={selectedNode}
        onSelect={onSelect}
        level={0}
      />
    </div>
  );
}

export default Mindmap;
