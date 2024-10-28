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
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [width, setWidth] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  return (
    <a
      href={href}
      ref={ref}
      className="relative font-normal text-xl text-white text-center"
      onClick={onClick}
      style={{ width: width ? `${width}px` : "auto" }}
    >
      {isActive && (
        <motion.span
          layoutId="active-nav-item"
          className="absolute inset-0 bg-black dark:bg-white rounded-full z-[-1]"
        ></motion.span>
      )}
      <ShuffleText text={text} className="mix-blend-difference px-4 py-2" />
    </a>
  );
}
