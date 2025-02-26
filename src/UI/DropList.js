import React, { useState, useEffect } from 'react';
import { Html } from "@react-three/drei"


import "../styles/planetaryinfo.css"

function DropList({children, name}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };
  

  return (
    <div className='droplist-container'>
        <div className="droplist-title" onClick={handleClick}>
            <h4>{name}</h4>
            <i className={`fa ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'} dropdown-button`}></i>
        </div>
        {isOpen && <div className="droplist-content">{children}</div>}
        
    </div>
  );
}

export default DropList;
