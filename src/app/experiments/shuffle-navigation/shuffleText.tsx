"use client";
import React from "react";
import { useShuffle } from "../../../hooks/useShuffle";

export default function ShuffleText({
  text,
  className,
  randomChars,
}: {
  text: string;
  className?: string;
  randomChars?: boolean;
}) {
  const { displayText, shuffle } = useShuffle(text, {
    iterations: 5,
    speed: 70,
  });

  return (
    <span className={className} onMouseEnter={shuffle}>
      {displayText}
    </span>
  );
}
