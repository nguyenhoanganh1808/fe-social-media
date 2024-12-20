import { useState } from "react";

export default function useToggle(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return { isOpen, open, close, toggle };
}
