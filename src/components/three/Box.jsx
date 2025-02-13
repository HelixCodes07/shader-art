"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";

export default function Box() {
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      setEventSource(document.body);
    }
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 15], fov: 30 }}
      eventSource={eventSource}
      className="canvas"
    >
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>

      <OrbitControls />
      <ambientLight intensity={1} />
    </Canvas>
  );
}
