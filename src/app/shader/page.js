import Link from "next/link";
import React from "react";

const artworks = [
  { id: "plane", title: "Plane Shader" },
  { id: "box", title: "Box Shader" },
];

export default function page() {
  return (
    <div className="border flex flex-col p-6">
      <h1 className="~text-2xl/6xl font-zentry">Shader Art Work</h1>
      <div className="grid grid-cols-2 gap-4 p-10 border mt-5">
        {artworks.map((art) => (
          <Link
            key={art.id}
            href={`/shader/${art.id}`}
            className="p-4 bg-gray-900 text-white text-center rounded-lg hover:scale-105 transition"
          >
            <h2>{art.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
