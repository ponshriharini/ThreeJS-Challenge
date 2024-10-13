import { useEffect, useRef } from "react";

function useKeyboardControls() {
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "w":
        case "ArrowUp":
          keys.current.forward = true;
          break;
        case "s":
        case "ArrowDown":
          keys.current.backward = true;
          break;
        case "a":
        case "ArrowLeft":
          keys.current.right = true;
          break;
        case "d":
        case "ArrowRight":
          keys.current.left = true;
          break;
        case " ":
          keys.current.up = true;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case "w":
        case "ArrowUp":
          keys.current.forward = false;
          break;
        case "s":
        case "ArrowDown":
          keys.current.backward = false;
          break;
        case "a":
        case "ArrowLeft":
          keys.current.right = false;
          break;
        case "d":
        case "ArrowRight":
          keys.current.left = false;
          break;
        case " ":
          keys.current.up = false;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
}

export default useKeyboardControls;