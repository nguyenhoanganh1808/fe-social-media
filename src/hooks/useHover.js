import { useState, useCallback } from "react";

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  return { isHovered, onMouseEnter, onMouseLeave };
};

export default useHover;
