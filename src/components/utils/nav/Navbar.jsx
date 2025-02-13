"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import AnimatedLink from "./AnimatedLink";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

export default function Navbar() {
  const [mode, setMode] = useState(true);

  const [open, setOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const deskWidth = isDesktopOrLaptop ? 480 : 208;
  const deskheight = isDesktopOrLaptop ? 650 : 320;

  const variants = {
    open: {
      width: deskWidth,
      height: deskheight,
      transition: { duration: 0.6, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: 0,
      height: 0,
      transition: {
        duration: 0.6,
        delay: 0.35,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <header className="fixed top-10 left-0 w-full z-10">
      <div className="flex items-center justify-between ~px-10/20 ">
        <div className="w-[4rem]">
          <Image alt="logo" src={"/img/TA.svg"} width={100} height={100} />
        </div>
        <div className="flex items-center  relative ">
          {/* menu  */}
          <motion.div
            className="bg-zinc-800 w-52 h-80 rounded-2xl absolute top-0 right-0 menuNoise overflow-clip"
            variants={variants}
            animate={isActive ? "open" : "closed"}
            initial="closed"
          >
            <AnimatePresence mode="wait">
              {isActive && <NavLink />}
            </AnimatePresence>
          </motion.div>

          <div className="flex items-center">
            {/* light mode  icon */}
            <div
              data-hover
              className="cursor-pointer z-10"
              role="button"
              onClick={() => setMode((prev) => !prev)}
            >
              <ThemeIcon mode={mode} isActive={isActive} />
            </div>
            {/* menu icon */}
            <div onClick={() => setIsActive((prev) => !prev)}>
              <div
                data-hover
                className=" cursor-pointer pl-3"
                role="button"
                onClick={() => setOpen((prev) => !prev)}
              >
                <MenuIcon open={open} isActive={isActive} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const ThemeIcon = ({ mode }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
      width="20"
      height="20"
      style={{
        display: "block",
        stroke: "#f3f2f9",
        strokeWidth: "2px",
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 10,
      }}
    >
      <title>Theme</title>
      <motion.path
        d="M14.994,7.99a7,7,0,0,1-12.813,3.9,1,1,0,0,1,1.063-1.532,6.139,6.139,0,0,0,1.961.089,6.012,6.012,0,0,0,5.212-4.985,6.067,6.067,0,0,0-.065-2.274A1,1,0,0,1,11.9,2.182,6.985,6.985,0,0,1,14.994,7.99Z"
        transformOrigin="0px 0px"
        animate={{
          transform: mode ? "translateY(17px)" : "translateY(0px)",
        }}
      ></motion.path>
      <motion.g
        transformOrigin="0px 0px"
        animate={{
          transform: mode ? "translateY(0px)" : "translateY(17px)",
        }}
      >
        <circle cx="8.5" cy="8.5" r="3"></circle>
        <line x1="8.5" y1="1" x2="8.5" y2="2"></line>
        <line x1="13.803" y1="3.197" x2="13.096" y2="3.904"></line>
        <line x1="16" y1="8.5" x2="15" y2="8.5"></line>
        <line x1="13.803" y1="13.803" x2="13.096" y2="13.096"></line>
        <line x1="8.5" y1="16" x2="8.5" y2="15"></line>
        <line x1="3.197" y1="13.803" x2="3.904" y2="13.096"></line>
        <line x1="1" y1="8.5" x2="2" y2="8.5"></line>
        <line x1="3.197" y1="3.197" x2="3.904" y2="3.904"></line>
      </motion.g>
    </svg>
  );
};

const MenuIcon = ({ open }) => {
  const [hover, setHover] = useState(false);

  const circleAnimation = (x, y, hoverX, hoverY, hoverEffect) => ({
    transform: open
      ? `translate(${x}px, ${y}px)` // Open state takes priority
      : hover
      ? `translate(${hoverX}px, ${hoverY}px)` // Hover state applied otherwise
      : "translate(0px, 0px)", // Default state
    opacity: hover ? (hoverEffect ? 0 : 1) : open ? 0 : 1,
  });

  const rectAnimation = (
    x,
    y,
    width,
    height,
    hoverX,
    hoverY,
    hoverWidth,
    hoverHight
  ) => ({
    transform: open
      ? `translate(${x}px, ${y}px)` // Open state takes priority
      : hover
      ? `translate(${hoverX}px, ${hoverY}px)` // Hover state applied otherwise
      : "translate(0px, 0px)", // Default state
    width: open ? width : hover ? hoverWidth : 6,
    height: open ? height : hover ? hoverHight : 6,
    opacity: hover ? 1 : open ? 1 : 0.75,
  });

  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={{
        transform: open ? "rotate(45deg)" : "none",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48"
        height="48"
        style={{
          display: "block",
          stroke: "#f3f2f9",
          strokeWidth: "2px",
          fill: "none",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: 10,
        }}
      >
        <title>Menu</title>

        {/* Circles */}
        <motion.circle
          cx="12"
          cy="12"
          r="3"
          animate={circleAnimation(-24, -24, 0, 0, false)}
        />
        <motion.circle
          cx="24"
          cy="12"
          r="3"
          animate={circleAnimation(0, -24, 0, -24, true)}
        />
        <motion.circle
          cx="36"
          cy="12"
          r="3"
          animate={circleAnimation(24, -24, 0, 0, false)}
        />
        <motion.circle
          cx="36"
          cy="24"
          r="3"
          animate={circleAnimation(24, 0, 24, 0, true)}
        />
        <motion.circle
          cx="36"
          cy="36"
          r="3"
          animate={circleAnimation(24, 24, 0, 0, false)}
        />
        <motion.circle
          cx="24"
          cy="36"
          r="3"
          animate={circleAnimation(0, 24, 0, 24, true)}
        />
        <motion.circle
          cx="12"
          cy="36"
          r="3"
          animate={circleAnimation(-24, 24, 0, 0, false)}
        />
        <motion.circle
          cx="12"
          cy="24"
          r="3"
          animate={circleAnimation(-24, 0, -24, 0, true)}
        />

        {/* Rectangles */}
        <motion.rect
          x="21"
          y="21"
          width="6px"
          height="6px"
          rx="3"
          ry="3"
          animate={rectAnimation(-16.97, 0, 39.94, 6, -12, 0, 30, 6)}
        />
        <motion.rect
          x="21"
          y="21"
          width="6px"
          height="6px"
          rx="3"
          ry="3"
          animate={rectAnimation(0, -16.97, 6, 39.94, 0, -12, 6, 30)}
        />
      </svg>
    </motion.div>
  );
};

const NavLink = () => {
  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/",
    },
    {
      title: "Projects",
      href: "/",
    },
    {
      title: "Contact",
      href: "/",
    },
  ];

  const variants = {
    initial: {
      opacity: 0,
      rotateX: 90,
      translateY: 80,
      translateX: -20,
    },
    enter: (i) => ({
      opacity: 1,
      rotateX: 0,
      translateX: 0,
      translateY: 0,
      transition: {
        duration: 0.65,
        delay: 0.5 + i * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <div className="h-full pt-20 pl-10 pr-10 pb-10 box-border">
      <div className="flex flex-col gap-3">
        {links.map((link, i) => {
          return (
            <div
              key={i}
              style={{
                perspective: "120px",
                perspectiveOrigin: "bottom",
              }}
            >
              <motion.div
                data-hover
                custom={i}
                variants={variants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <AnimatedLink title={link.title} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
