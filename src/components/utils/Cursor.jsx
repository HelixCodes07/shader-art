import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const defaultCursorSize = { width: 20, height: 20 };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - defaultCursorSize.width / 2);
    mouse.y.set(clientY - defaultCursorSize.height / 2);
  };

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const elements = document.querySelectorAll("[data-hover]");

    const addHoverListeners = (el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    };

    const removeHoverListeners = (el) => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };

    elements.forEach(addHoverListeners);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      elements.forEach(removeHoverListeners);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering]);

  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        mixBlendMode: isHovering ? "difference" : "normal",
      }}
      animate={{
        width: isHovering ? 30 : 20,
        height: isHovering ? 30 : 20,
        borderStyle: isHovering ? "none" : "solid",
        borderWidth: isHovering ? "0px" : "1px",
        backgroundColor: isHovering ? "rgb(243,242,249)" : "rgb(0,0,0,0)",
      }}
      className="fixed w-[20px] h-[20px] border border-[#f3f2f9] rounded-full pointer-events-none z-20"
    />
  );
}
