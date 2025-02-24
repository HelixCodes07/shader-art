import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import React, { useEffect, useRef, useState } from "react";

export default function Plane() {
  const [anim, setAnim] = useState(false);

  const progress = useMotionValue(0);

  const x = useMotionValue(0);
  const scaleZ = useTransform(x, (v) => v / 100);

  return (
    <>
      <button className="fixed z-40" onClick={() => setAnim((prev) => !prev)}>
        Start Motion
      </button>
      <Canvas className="canvas">
        <OrbitControls />
        <ambientLight intensity={1} />
        <motion.mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={"#ff00ff"} />
        </motion.mesh>

        <motion.mesh position-x={x} scale={[1, 1, scaleZ]} animate={{ x: 100 }}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={"#ff0000"} />
        </motion.mesh>
      </Canvas>
    </>
  );
}
