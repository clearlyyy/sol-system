import React, { useRef, useEffect } from 'react';
import { extend } from '@react-three/fiber'; // Import extend
import { Line2 } from 'three/examples/jsm/lines/Line2'; // Import Line2
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'; // Import LineGeometry
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'; // Import LineMaterial

// Extend R3F to recognize Line2, LineGeometry, and LineMaterial
extend({ Line2, LineGeometry, LineMaterial });

const OrbitalLine = ({ points, color }) => {
    const lineRef = useRef();

    useEffect(() => {
        if (lineRef.current) {
            // Create the geometry and set positions
            const geometry = new LineGeometry();
            geometry.setPositions(points.flatMap(p => [p.x, p.y, p.z]));

            // Create the material
            const material = new LineMaterial({
                color: color,
                linewidth: 2.3, // Adjust linewidth as needed
            });

            // Assign geometry and material to the Line2 instance
            lineRef.current.geometry = geometry;
            lineRef.current.material = material;
        }
        
    }, [points, color]);

    return <line2 ref={lineRef} raycast={() => {}} />;
};

export default OrbitalLine;