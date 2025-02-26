import React, { useImperativeHandle, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { scalingFactor, planetScaling } from "../App";

const UserControls = React.forwardRef(
  (
    {
      setIsPlanetaryInfoVisible,
      followBody,
      setFollowBody,
      selectedBody,
      setSelectedBody,
      orbitControlsRef,
    },
    ref
  ) => {
    const { camera, scene, mouse } = useThree();
    const [targetPosition, setTargetPosition] = useState(null);
    const [planetPosition, setPlanetPosition] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationTime, setAnimationTime] = useState(0);
    const [currentPlanetSize, setPlanetSize] = useState(null);
    const [currentClickType, setCurrentClickType] = useState(null);

    const [_, forceUpdate] = useState();

    const animationSpeed = 0.0005;
    const raycaster = new THREE.Raycaster();
    const selectedBodyPositionRef = useRef(new THREE.Vector3());

    let mouseDownTime = 0;
    let mouseDownPosition = { x: 0, y: 0 };

    const checkClickType = (event) => {
      const clickThreshold = 200;
      const dragThreshold = 5;
      const doubleClickThreshold = 200;

      if (event.type === "mousedown") {
        mouseDownTime = Date.now();
        mouseDownPosition = { x: event.clientX, y: event.clientY };
      }

      if (event.type === "mouseup") {
        const timeDiff = Date.now() - mouseDownTime;
        const movementX = Math.abs(event.clientX - mouseDownPosition.x);
        const movementY = Math.abs(event.clientY - mouseDownPosition.y);

        if (
          timeDiff <= clickThreshold &&
          movementX <= dragThreshold &&
          movementY <= dragThreshold
        ) {
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
      console.log(currentClickType);
    }, [currentClickType]);

    const getPlanetByName = (name) => {
      return scene.getObjectByName(name);
    }

    const selectBody = (eventOrObject) => {
      let object;

      if (eventOrObject instanceof Event || eventOrObject.nativeEvent) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          object = intersects[0].object;
        } else {
          return;
        }
      } else if (eventOrObject instanceof THREE.Object3D) {
        object = eventOrObject;
      } else {
        console.error("Invalid argument passed to selectBody");
        return;
      }

      const worldPos = new THREE.Vector3();
      let customData;
      try {
        if (object.name === "Sun") {
          customData = object.userData || {};
        } else {
          customData = object.children[1].parent.userData || {};
        }
      } catch {
        customData = object.userData || {};
      }

      console.log("Clicked object Mesh", object);
      console.log("Clicked Object Name", object.name);
      console.log("Clicked object data:", customData);
      setPlanetSize(customData.size);
      console.log("Clicked Object Size: ", customData.size);
      object.getWorldPosition(worldPos);
      console.log("Clicked object worldPos:", worldPos);
      setTargetPosition(worldPos);
      setPlanetPosition(worldPos);
      setIsAnimating(true);
      setAnimationTime(0);
      setFollowBody(false);
      setSelectedBody(object);
      setIsPlanetaryInfoVisible(true);

      if (orbitControlsRef.current) {
        orbitControlsRef.current.enabled = false;
      }
    };

    // Expose selectBody to parent components via ref
    useImperativeHandle(ref, () => ({
      selectBody,
      getPlanetByName,
    }));

    useEffect(() => {
      window.addEventListener("mousedown", checkClickType);
      window.addEventListener("mouseup", checkClickType);
      return () => {
        window.removeEventListener("mousedown", checkClickType);
        window.removeEventListener("mouseup", checkClickType);
      };
    }, [mouse]);

    useFrame((state, delta) => {
      if (isAnimating && targetPosition) {
        const offset = new THREE.Vector3(0, 0, (currentPlanetSize / scalingFactor) * planetScaling * 4);
        const cameraTargetPosition = targetPosition.clone().add(offset);

        const animationDuration = 20;
        const t = Math.min(animationTime / animationDuration, 1);
        const rotationT = Math.min(animationTime / (animationDuration / 2), 1);

        const lerpedPosition = new THREE.Vector3().lerpVectors(camera.position, cameraTargetPosition, t);
        camera.position.copy(lerpedPosition);

        const targetDirection = new THREE.Vector3().subVectors(targetPosition, camera.position).normalize();
        const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, -1),
          targetDirection
        );
        camera.quaternion.slerp(targetQuaternion, rotationT);

        setAnimationTime((prevTime) => prevTime + delta);

        if (camera.position.distanceTo(cameraTargetPosition) < 0.05) {
          setIsAnimating(false);
          setFollowBody(true);

          if (orbitControlsRef.current) {
            orbitControlsRef.current.enabled = true;
            camera.lookAt(planetPosition);
            camera.position.copy(cameraTargetPosition);
            orbitControlsRef.current.target.copy(planetPosition);
            orbitControlsRef.current.update();
          }
        }
      }

      

      
    });

    //////////////////////////////////////////////////////////////////////////////////////// 
    // CAMERA TRACKING OBJECTS


    const prevPosRef = useRef(new THREE.Vector3());
    useEffect(() => {
      prevPosRef.current = undefined;
    }, [followBody, selectedBody]);

    useFrame(() => {
      if (!orbitControlsRef.current || !selectedBody || !followBody) return;
    
      const worldPos = new THREE.Vector3();
      selectedBody.getWorldPosition(worldPos);
    
      if (!prevPosRef.current) {
        // First frame - initialize previous position
        prevPosRef.current = worldPos.clone();
      } else {
        // Calculate movement delta
        const delta = new THREE.Vector3().subVectors(worldPos, prevPosRef.current);
        
        // Move camera by the same delta
        camera.position.add(delta);
        
        // Update camera matrix if needed
        camera.updateMatrixWorld();
      }
    
      // Update OrbitControls target
      orbitControlsRef.current.target.copy(worldPos);
      prevPosRef.current.copy(worldPos);
      
      // Update controls
      orbitControlsRef.current.update();
    });

    
    return (
      <>
        <OrbitControls ref={orbitControlsRef} enableDamping={true} dampingFactor={0.05} zoomSpeed={4} autoRotate={false} makeDefault/>
      </>
    );
  }
);

export default UserControls;