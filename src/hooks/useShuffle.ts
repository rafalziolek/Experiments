import { useState, useCallback, useRef, useEffect } from "react";

export function useShuffle(
  text: string,
  options?: {
    iterations?: number;
    randomChars?: boolean;
    speed?: number;
  }
) {
  const { iterations = 5, randomChars = false, speed = 50 } = options ?? {};
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout>();
  const iterationCountRef = useRef(0);

  const shuffle = useCallback(() => {
    iterationCountRef.current = 0;

    const animate = () => {
      intervalRef.current = setInterval(() => {
        if (iterationCountRef.current >= iterations) {
          setDisplayText(text);
          clearInterval(intervalRef.current);
          return;
        }

        const shuffled = randomChars
          ? generateRandomChars(text.length)
          : shuffleCharacters(text);

        setDisplayText(shuffled);
        iterationCountRef.current += 1;
      }, speed);
    };

    animate();
    return () => clearInterval(intervalRef.current);
  }, [text, iterations, randomChars, speed]);

  return { displayText, shuffle };
}

// Helper functions
function shuffleCharacters(text: string) {
  const chars = text.split("");
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

function generateRandomChars(length: number) {
  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return Array(length)
    .fill(0)
    .map(() =>
      possibleChars.charAt(Math.floor(Math.random() * possibleChars.length))
    )
    .join("");
}
