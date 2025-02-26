import { useState } from "react";


import "../styles/tools.css"
import { mul } from "three/tsl";

function EditableSetting({ title, value, onChange, unit, multiplier = 1}) {
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
            onChange={(e) => onChange(Number(e.target.value) * multiplier)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsEditing(false);
            }}
            autoFocus
            className="setting-input-box"
          />
        ) : (
          <h4 className="value">{value}{unit}</h4>
        )}
      </div>
    </div>
  );
}

export default EditableSetting;
