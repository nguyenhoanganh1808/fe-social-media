import { useEffect, useRef, useState } from "react";

export default function useDialog() {
  const [modalOpen, setModalOpen] = useState(false);
  const dialogRef = useRef(null);
  function showDialog() {
    dialogRef.current?.showModal();
    setModalOpen(true);
  }

  function closeDialog() {
    dialogRef.current?.close();
    setModalOpen(false);
  }

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalOpen]);

  return {
    dialogRef,
    showDialog,
    closeDialog,
  };
}
