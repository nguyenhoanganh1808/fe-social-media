import { forwardRef } from "react";

const CreatePostModal = forwardRef(function CreatePostModal(props, ref) {
  return (
    <dialog ref={ref}>
      <p>Greetings, one and all!</p>
      <form method="dialog">
        <button>OK</button>
      </form>
    </dialog>
  );
});

export default CreatePostModal;
