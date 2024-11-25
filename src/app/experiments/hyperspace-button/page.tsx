import React from "react";
import HyperspaceButton from "./HyperspaceButton";
export default function page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-stone-950 relative">
      <HyperspaceButton> Launch hyperspace </HyperspaceButton>
      <div className="right-10 fixed bg-stone-900 top-10 p-4 rounded-xl max-w-80 text-white">
        <h3 className="font-sans font-semibold text-sm">🚧 This is work in progress</h3>
        <p className="font-sans text-sm pt-6">
          This button doesn't do anything when you click it (yet). It's just a
          component that looks cool. </p>
          <p className="font-sans text-sm pt-3">The goal is to use three.js for hover effect and animation after clicking</p>
        </div>
    </div>
  );
}
