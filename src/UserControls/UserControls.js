import React, { useImperativeHandle, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { scalingFactor, planetScaling } from "../App";

const UserControls = React.forwardRef(
  (
    {
      setTableData,
      setIsPlanetaryInfoVisible,
      canvasRef,
      followBody,
      setFollowBody,
      selectedBody,
      setSelectedBody,
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

    const animationSpeed = 0.0005;
    const raycaster = new THREE.Raycaster();
    const orbitControlsRef = useRef();

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

      object.name !== "Sun" &&
        setTableData([
          { label: "Semi Major Axis", value: customData.A.toLocaleString() + " km" },
          { label: "Eccentricity", value: customData.EC.toFixed(8) },
          { label: "Inclination", value: customData.i.toFixed(3) + "°" },
          { label: "Periapsis", value: customData.omega.toFixed(2) + " km" },
          { label: "Ascending Node", value: customData.Omega.toFixed(3) + "°" },
          { label: "Mean Motion", value: customData.meanMotion.toFixed(6) + " deg/day" },
          { label: "Mean Anomaly", value: customData.j2000MeanAnomaly.toFixed(3) + "°" },
          { label: "True Anomaly", value: customData.trueAnomaly.toFixed(4) + "°" },
        ]);

      if (orbitControlsRef.current) {
        orbitControlsRef.current.enabled = false;
      }
    };

    // Expose selectBody to parent components via ref
    useImperativeHandle(ref, () => ({
      selectBody,
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

      if (orbitControlsRef.current && orbitControlsRef.current.enabled) {
        orbitControlsRef.current.update();
      }
    });

    useFrame(() => {
      if (selectedBody != null && followBody) {
        const worldPos = new THREE.Vector3();
        const offset = new THREE.Vector3(0, 0, (currentPlanetSize / scalingFactor) * planetScaling * 4);
        const cameraPos = worldPos.clone().add(offset);
        selectedBody.getWorldPosition(worldPos);
        if (orbitControlsRef.current) {
          orbitControlsRef.current.target.set(worldPos.x, worldPos.y, worldPos.z);
          orbitControlsRef.current.update();
        }
      }
    });

    return (
      <>
        <OrbitControls ref={orbitControlsRef} />
      </>
    );
  }
);

export default UserControls;