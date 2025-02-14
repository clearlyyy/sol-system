import { useState } from "react";


import "../styles/tools.css"

function EditableSetting({ title, value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="title-value">
      <h3 className="setting-title">{title}</h3>
      
      <div
        className="value-container"
        onClick={() => setIsEditing(true)}
        style={{ cursor: "pointer" }}
      >
        {isEditing ? (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditing(false);
            }}
            autoFocus
            className="setting-input-box"
          />
        ) : (
          <h4 className="value">{value}x</h4>
        )}
      </div>
    </div>
  );
}

export default EditableSetting;
