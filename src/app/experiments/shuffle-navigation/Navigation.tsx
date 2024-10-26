"use client";
import React from "react";
import NavItem from "./navItem";

let navItems = [
  { text: "Home", href: "#" },
  { text: "Projects", href: "#" },
  { text: "About", href: "#" },
  { text: "Contact", href: "#" },
];
export default function Navigation() {
  const [isActive, setIsActive] = React.useState("Home");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <nav className="flex gap-4">
        {navItems.map((item) => (
          <NavItem
            key={item.text}
            text={item.text}
            href={item.href}
            isActive={isActive === item.text}
            onClick={() => setIsActive(item.text)}
          />
        ))}
      </nav>
    </div>
  );
}
