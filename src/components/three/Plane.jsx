import { Canvas } from "@react-three/fiber";
import React from "react";

export default function Plane() {
  return (
    <Canvas className="canvas">
      <mesh>
        <planeGeometry args={[2, 2]} />
        <meshNormalMaterial />
      </mesh>
    </Canvas>
  );
}
