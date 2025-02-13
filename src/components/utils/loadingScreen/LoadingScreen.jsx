import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DecoderText } from "../DecoderText";

export default function LoadingScreen({ setIsLoading }) {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".progress", {
      width: "100%",
      duration: 6,
      ease: "power3.inOut",
    })

      .to(
        ".number",
        {
          textContent: "100",
          duration: 6,
          roundProps: "textContent",
        },
        "<"
      )
      .to(".number", {
        x: 24,
        autoAlpha: 0,
      })
      .to(".loader", {
        x: -24,
        autoAlpha: 0,
      })
      .to(".progress", {
        width: 0,
        duration: 1,
        autoAlpha: 0,
      })
      .to(".overlay", {
        opacity: 0,
        duration: 1,
        autoAlpha: 0,
        onComplete: () => {
          setIsLoading(false);
        },
      });
  }, []);

  return (
    <div className="fixed top-0 left-0 h-dvh w-dvw bg-zinc-900 overflow-hidden pointer-events-none z-[99] overlay">
      <div className="noiseLoader"></div>
      <div className="absolute bottom-0 left-0 w-full  p-6">
        <div className="flex justify-between pb-2">
          <h1 className="~text-2xl/6xl font-zentry tracking-wide loader">
            <DecoderText text="Loading..." start delay={500} />
          </h1>
          <p className="~text-2xl/6xl number">0</p>
        </div>
        <div className="h-1/2 border-b-[1.5rem] w-0 progress"></div>
      </div>
    </div>
  );
}
