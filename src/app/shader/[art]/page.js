"use client";
import React from "react";
import { notFound } from "next/navigation";
import Box from "@/components/three/Box";
import Plane from "@/components/three/Plane";

const shaderComponents = {
  plane: Plane,
  box: Box,
};

export default function page({ params }) {
  const { art } = params;
  const ShaderComponent = shaderComponents[art];

  if (!ShaderComponent) return notFound(); // 404 if invalid art
  return (
    <div>
      <ShaderComponent />
    </div>
  );
}
