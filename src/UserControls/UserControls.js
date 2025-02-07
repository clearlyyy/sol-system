import { useThree, useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { scalingFactor, planetScaling } from "../App"

// Ease-in-out function to create a bell curve effect
const easeInOut = (t) => {
  return 0.5 * (1 - Math.cos(Math.PI * t)); // This will ease in and out smoothly
};

const UserControls = ({setTableData, setIsPlanetaryInfoVisible, canvasRef, followBody, setFollowBody, selectedBody, setSelectedBody}) => {
  const { camera, scene, mouse } = useThree();
  const [targetPosition, setTargetPosition] = useState(null);
  const [planetPosition, setPlanetPosition] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationTime, setAnimationTime] = useState(0); // To track animation progress
  const [currentPlanetSize, setPlanetSize] = useState(null);
  
  const [currentClickType, setCurrentClickType] = useState(null);

  // Adjust this value to control the speed
  const animationSpeed = 0.0005 // Control the animation speed (higher = faster)

  const raycaster = new THREE.Raycaster();

  // Create a ref for OrbitControls
  const orbitControlsRef = useRef();


  let mouseDownTime = 0;
  let mouseDownPosition = { x: 0, y: 0 };


  const checkClickType = (event) => {
    const clickThreshold = 200; // Time threshold for checking click types.
    const dragThreshold = 5; // Movemennt threshold to detect dragging in px
    const doubleClickThreshold = 200; // Time window for double click detection in ms

    if (event.type === "mousedown") {
      mouseDownTime = Date.now();
      mouseDownPosition = { x: event.clientX, y: event.clientY };
      
    }

    if (event.type === "mouseup") {
      const timeDiff = Date.now() - mouseDownTime;
      const movementX = Math.abs(event.clientX - mouseDownPosition.x);
      const movementY = Math.abs(event.clientY - mouseDownPosition.y);

      // Determine click type based on time and movement
      if (timeDiff <= clickThreshold && movementX <= dragThreshold && movementY <= dragThreshold) {
        setCurrentClickType("Click");
        selectBody(event);
      } else if (movementX > dragThreshold || movementY > dragThreshold) {
        setCurrentClickType("Drag");
      } else {
        setCurrentClickType("Hold");
      }
    }
  };

  useEffect(() => {
    console.log(currentClickType); // Log the updated click type
  }, [currentClickType]);
  

  // Function to handle mouse down event
  const selectBody = (event) => {

    console.log("Moving to Planet")

    // Update raycaster with mouse position and camera
    raycaster.setFromCamera(mouse, camera);
    

    // Get intersected objects
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      // Get the first intersected object
      const object = intersects[0].object;
      const worldPos = new THREE.Vector3();
      var customData;
      try {
        if (object.name === "Sun") { customData = object.userData || {}; }
        else {  customData = object.children[1].parent.userData || {}; }
      } catch {
        customData = object.userData || {};
      }
      console.log("Clicked object Mesh", object);
      console.log("Clicked Object Name", object.name);
      console.log("Clicked object data:", customData);
      setPlanetSize(customData.size);
      console.log("Clicked Object Size: ", customData.size);
      object.getWorldPosition(worldPos); // Get world position of the clicked object
      console.log("Clicked object worldPos:", worldPos);
      setTargetPosition(worldPos); // Set target position to the object’s world position
      setPlanetPosition(worldPos); // Store the planet position for orbitControls
      setIsAnimating(true); // Start the animation
      setAnimationTime(0); // Reset animation time to 0
      setFollowBody(false);
      setSelectedBody(object);
      setIsPlanetaryInfoVisible(true);


      //Update Table data for orbital information in PlanetaryInfo.js
      object.name != "Sun" && setTableData([
        { label: "Semi Major Axis", value: customData.A.toLocaleString() + " km" },
        { label: "Eccentricity", value: customData.EC.toFixed(8) },
        { label: "Inclination", value: customData.i.toFixed(3) +  "°"},
        { label: "Periapsis", value: customData.omega.toFixed(2) + " km"},
        { label: "Ascending Node", value: customData.Omega.toFixed(3) + "°"},
        { label: "Mean Motion", value: customData.meanMotion.toFixed(6) + " deg/day" },
        { label: "Mean Anomaly", value: customData.j2000MeanAnomaly.toFixed(3) + "°" },
        { label: "True Anomaly", value: customData.trueAnomaly.toFixed(4) + "°" }
      ]);

      // Temporarily disable orbit controls while animating
      if (orbitControlsRef.current) {
        orbitControlsRef.current.enabled = false;
      }
    } 
      
  };

  // Add event listener for mouse down
  useEffect(() => {
    window.addEventListener("mousedown", checkClickType);
    window.addEventListener("mouseup", checkClickType);
    
  }, [mouse]);

  useFrame((state, delta) => {
    if (isAnimating && targetPosition) {
        // Calculate the offset position so the camera doesn't go inside the planet
        const offset = new THREE.Vector3(0, 0, ((currentPlanetSize / scalingFactor) * planetScaling) * 4); // Adjust the offset as needed
        const cameraTargetPosition = targetPosition.clone().add(offset); // Offset from the planet

        // Define the animation duration (in seconds)
        const animationDuration = 20; // Adjust this value to control the total animation time

        // Calculate the animation progress (t) based on elapsed time
        const t = Math.min(animationTime / animationDuration, 1); // Ensure t doesn't exceed 1
        const rotationT = Math.min(animationTime / (animationDuration / 2), 1); // Rotation completes earlier (half the time)

        // Linear interpolation for position (straight line)
        const lerpedPosition = new THREE.Vector3().lerpVectors(
            camera.position,
            cameraTargetPosition,
            t
        );

        // Update the camera position
        camera.position.copy(lerpedPosition);

        // Smoothly update the camera's rotation
        const targetDirection = new THREE.Vector3().subVectors(targetPosition, camera.position).normalize();
        const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, -1), // Default forward vector in Three.js
            targetDirection
        );
        camera.quaternion.slerp(targetQuaternion, rotationT); // Use faster t for rotation interpolation

        // Increment animation time based on delta time
        setAnimationTime((prevTime) => prevTime + delta); // Use delta for frame rate independence

        // Stop animation when the camera is close enough to the target
        if (camera.position.distanceTo(cameraTargetPosition) < 0.05) {
            setIsAnimating(false); // Stop the animation when complete
            setFollowBody(true);

            // Re-enable orbit controls after animation
            if (orbitControlsRef.current) {
                orbitControlsRef.current.enabled = true;

                // Set the camera position and target manually
                camera.lookAt(planetPosition); // Ensure the camera is looking at the planet
                camera.position.copy(cameraTargetPosition); // Ensure the camera is offset from the target
                orbitControlsRef.current.target.copy(planetPosition); // Set the target to the planet's position

                // Update OrbitControls to apply the changes
                orbitControlsRef.current.update();
            }
        }
    }


    // Update orbit controls if they are enabled
    if (orbitControlsRef.current && orbitControlsRef.current.enabled) {
      orbitControlsRef.current.update(); // Manually update the controls while enabled
    }
  });


  //Handle Selected Body and Follow it.
  useFrame(() => {
    if (selectedBody != null && followBody) {
      const worldPos = new THREE.Vector3();
      const offset = new THREE.Vector3(0, 0, ((currentPlanetSize / scalingFactor) * planetScaling) * 4);
      const cameraPos = worldPos.clone().add(offset);
      selectedBody.getWorldPosition(worldPos);
      if (orbitControlsRef.current) {
        orbitControlsRef.current.target.set(worldPos.x, worldPos.y, worldPos.z);
        //orbitControlsRef.current.object.position.copy(cameraPos);
        orbitControlsRef.current.update();
      }
    }
  })

  return (
    <>
      {/* Use OrbitControls directly in the scene */}
      <OrbitControls ref={orbitControlsRef} />
    </>
  );
};

export default UserControls;
