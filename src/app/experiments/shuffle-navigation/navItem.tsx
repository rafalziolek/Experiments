import React from "react";
import ShuffleText from "./shuffleText";
import { motion } from "framer-motion";

export default function NavItem({
  text,
  href,
  isActive,
  onClick,
}: {
  text: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      className="relative font-medium text-xl text-white"
      onClick={onClick}
    >
      {isActive && (
        <motion.span
          layoutId="active-nav-item"
          className="absolute inset-0 bg-black dark:bg-white rounded-full"
        ></motion.span>
      )}
      <ShuffleText text={text} className="mix-blend-difference px-4 py-2" />
    </a>
  );
}
