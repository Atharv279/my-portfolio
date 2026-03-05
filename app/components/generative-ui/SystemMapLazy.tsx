"use client";

import dynamic from "next/dynamic";

const SystemMap = dynamic(
  () => import("./SystemMap").then((m) => m.SystemMap),
  { ssr: false }
);

export function SystemMapLazy() {
  return <SystemMap />;
}
