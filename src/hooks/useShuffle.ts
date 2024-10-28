import { useState, useCallback, useRef } from "react";

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
    console.log("Shuffle called - clearing previous interval");
    // Clear any existing interval before starting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    iterationCountRef.current = 0;

    const animate = () => {
      console.log("Starting new animation");
      intervalRef.current = setInterval(() => {
        console.log(
          `Iteration: ${iterationCountRef.current + 1}/${iterations}`
        );

        if (iterationCountRef.current >= iterations) {
          console.log("Animation complete - clearing interval");
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
    return () => {
      console.log("Cleanup function called");
      clearInterval(intervalRef.current);
    };
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
