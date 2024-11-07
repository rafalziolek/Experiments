"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  originX: number;
  originY: number;
  x: number;
  y: number;
  angle: number;
  baseSpeed: number;
  size: number;
  delay: number;
  distanceTraveled: number;
}

interface HyperspaceButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function HyperspaceButton({
  children,
  onClick,
  className = "",
}: HyperspaceButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  const createStar = (width: number, height: number): Star => {
    const randomRadius =
      Math.sqrt(Math.random()) * (Math.min(width, height) * 0.5);
    const randomAngle = Math.random() * Math.PI * 2;

    const originX = width / 2 + randomRadius * Math.cos(randomAngle);
    const originY = height / 2 + randomRadius * Math.sin(randomAngle);

    return {
      originX,
      originY,
      x: originX,
      y: originY,
      angle: randomAngle,
      baseSpeed: 0.1 + Math.random() * 0.2,
      size: 0.2 + Math.random() * 0.3,
      delay: Math.random() * 1000,
      distanceTraveled: 0,
    };
  };

  const initStars = (width: number, height: number) => {
    starsRef.current = Array(80)
      .fill(null)
      .map(() => createStar(width, height));
    timeRef.current = 0;
  };

  const updateAndDrawStars = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    dpr: number,
    timestamp: number
  ) => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, width * dpr, height * dpr);

    if (!isHovered) return;

    timeRef.current = timestamp;
    const maxDistance = Math.sqrt(width * width + height * height);

    starsRef.current.forEach((star) => {
      if (timeRef.current < star.delay) return;

      const dx = star.x - star.originX;
      const dy = star.y - star.originY;
      star.distanceTraveled = Math.sqrt(dx * dx + dy * dy);

      const distanceRatio = star.distanceTraveled / maxDistance;
      const speed = star.baseSpeed * (1 + distanceRatio) * 3;

      star.x += Math.cos(star.angle) * speed;
      star.y += Math.sin(star.angle) * speed;

      const sizeMultiplier = 1 + star.distanceTraveled / 150;
      const currentSize = star.size * sizeMultiplier;

      const brightness = Math.min(0.8, 0.2 + distanceRatio * 0.6);

      if (star.x < 0 || star.x > width || star.y < 0 || star.y > height) {
        Object.assign(star, createStar(width, height));
        return;
      }

      const gradient = ctx.createRadialGradient(
        star.x * dpr,
        star.y * dpr,
        0,
        star.x * dpr,
        star.y * dpr,
        currentSize * dpr * 2
      );

      gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${brightness * 0.4})`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(
        star.x * dpr,
        star.y * dpr,
        currentSize * dpr * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  };

  useEffect(() => {
    const button = buttonRef.current;
    const canvas = canvasRef.current;
    if (!button || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const { width, height } = button.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      initStars(width, height);
    };

    const animate = (timestamp: number) => {
      const { width, height } = canvas;
      updateAndDrawStars(ctx, width / dpr, height / dpr, dpr, timestamp);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    ctx.imageSmoothingEnabled = true;
    resizeCanvas();
    animate(0);

    const handleResize = () => {
      requestAnimationFrame(resizeCanvas);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (buttonRef.current && canvasRef.current) {
          initStars(
            buttonRef.current.offsetWidth,
            buttonRef.current.offsetHeight
          );
        }
      }}
      className={`
        group
relative
inline-flex
items-center
justify-center
uppercase
text-sm
px-10
py-4
text-white
font-semibold
border
hover:border-2
border-white
rounded-full
hover:border-yellow-500
hover:shadow-[0_0_20px_-10px_rgba(0,0,0,0.3)]
hover:shadow-yellow-400/50
overflow-hidden
bg-black

        ${className}
      `}
    >
      <canvas
        ref={canvasRef}
        className="
          absolute
          top-0
          left-0
          w-full
          h-full
          pointer-events-none
          opacity-0
          transition-opacity
          duration-300
          ease-in
          group-hover:opacity-100
        "
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
