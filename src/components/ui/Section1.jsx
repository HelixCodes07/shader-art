import useTalhaStore from "@/store/useStore";
import { motion } from "framer-motion";
import React from "react";

export default function Section1({ id }) {
  const { isLoading } = useTalhaStore();

  return (
    <div
      id={id}
      className="nav-section container border h-svh flex flex-col items-center justify-center  bg-black/20"
    >
      <motion.h1
        animate={{ opacity: isLoading ? 0 : 1, transition: { duration: 3 } }}
        data-hover
        className=" ~text-2xl/6xl bg-white text-black sm:bg-red-500 md:bg-blue-500 lg:bg-yellow-400 xl:bg-green-400 2xl:bg-purple-500  font-secondary "
      >
        WhatssUPpppppp
      </motion.h1>
    </div>
  );
}
