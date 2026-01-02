import { useEffect, useState } from "react";

function SidePanel({ node, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (node) {
      setTitle(node.title);
      setDescription(node.description);
      setEditMode(false);
    }
  }, [node]);

  if (!node) {
    return (
      <div className="side-panel">
        <div className="card">
          <h3>Architecture Documentation</h3>
          <p>Select a node to view details.</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onSave({
      ...node,
      title,
      description,
    });
    setEditMode(false);
  };

  return (
    <div className="side-panel">
      <div className="card">
        <h2>{node.title}</h2>

        {!editMode ? (
          <>
            <p>{node.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="button-row">
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SidePanel;
