import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useState } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

export const SectionId = {
  Section1: "Section1",
  Section2: "Section2",
  Section3: "Section3",
};

export function ScrollNav() {
  const [activeSection, setActiveSection] = useState(SectionId.Section1);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".nav-section");

      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            setActiveSection(section.id);
          },
          onEnterBack: () => {
            setActiveSection(section.id);
          },
        });
      });
    },
    { dependencies: [] }
  );

  // for scroll nav bar load
  // useGSAP(() => {
  //   const scrollBarHeight = document
  //     .getElementById("scroll-bar")
  //     ?.getBoundingClientRect()?.height;

  //   if (!scrollBarHeight) return;

  //   gsap.to("#scroll-indicator", {
  //     y: scrollBarHeight - 12,
  //     ease: "none",
  //     scrollTrigger: {
  //       start: 0,
  //       end: "max",
  //       scrub: true,
  //     },
  //   });
  // }, []);

  const onLinkClick = (id) => {
    gsap.to(window, { scrollTo: { y: `#${id}`, offsetY: 0 } });
  };

  return (
    <div className=" fixed right-9 h-full flex flex-col justify-center z-30">
      <nav className="flex flex-col items-end  relative float-right ">
        {/* <div id="scroll-bar" className="absolute left-7 h-full  w-1 rounded-xl ">
          <div
            id="scroll-indicator"
            className="absolute top-0 h-3 w-full bg-zinc-100 rounded-xl"
          />
        </div> */}
        {Object.values(SectionId).map((id) => (
          <motion.div
            key={id}
            data-section-id={id}
            className="dot"
            onClick={() => onLinkClick(id)}
            animate={{
              opacity: activeSection === id ? 1 : 0.2,
              marginBottom: activeSection === id ? "1.5rem" : "0.4rem",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.1 },
            }}
          >
            <motion.div
              animate={{
                scale: activeSection === id ? 1 : 0,
                opacity: activeSection === id ? 1 : 0,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              className="dot-after"
            />
            <motion.div className="dot-before" />

            <motion.div
              animate={{
                opacity: activeSection === id ? 1 : 0,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              className="absolute top-full right-0 pointer-events-none font-circular-web"
            >
              {id}
            </motion.div>
          </motion.div>
        ))}
      </nav>
    </div>
  );
}
