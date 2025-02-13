"use client";
import LoadingScreen from "@/components/utils/loadingScreen/LoadingScreen";
import useTalhaStore from "@/store/useStore";
import Lenis from "lenis";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  const { isLoading, setIsLoading } = useTalhaStore();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
    });

    lenis.stop();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const handleLoadingCompletion = () => {
      setIsLoading(false);
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    };

    if (!isLoading) handleLoadingCompletion();

    return () => {
      lenis.stop();
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen setIsLoading={setIsLoading} />}
      <main className="relative h-svh border flex flex-col justify-center items-center border-dashed border-orange-400">
        <h1 className="~text-2xl/6xl font-zentry pb-20">Welcome to Showcase</h1>

        <div className="border border-dotted min-w-[200px] p-3 hover:bg-black hover:text-white hover:border-hidden hover:rounded-md transition-all ease-in-out duration-300">
          <span className="font-secondary ~text-lg/4xl ">
            <span className="font-primary pr-4">1.</span>
            <Link href={"/shader"}>View Shader Art</Link>
          </span>
        </div>
      </main>
    </>
  );
}
