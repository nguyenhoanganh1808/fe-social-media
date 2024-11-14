import { useEffect, useRef, useState } from "react";
import styles from "./CreatePost.module.css";
import CreatePostModal from "./CreatePostModal/CreatePostModal";

export default function CreatePost() {
  const [modalOpen, setModalOpen] = useState(false);
  const dialogRef = useRef(null);

  const author = {
    name: "George Jose",
    link: "george",
    avatarUrl:
      "https://s3-alpha-sig.figma.com/img/d6a6/fffd/2100d987b5946aa1df33cf0f6c34a418?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0ozEGQKCEzpMDFiGB0WI7e3Jy5hs~XAzkQEmXckRff9Yql3RG4oZ3qz7U-lmzlgN5l~VSp88OF3WSEHLG8hewYzujk8BfcrkQvmBJSeDEvGfDm6uDq5Hsx9cQ1cfgLQHZz10fHEBoS7H8kb73P-hWtJj2qYrDYGdR5YhEHfHT9EQehf5C90C4PZkDVQRu6FZWCVcxHr7FcTZGWaNC-LSjOSmA4KZaKs1FIk-OEuIlV9fK7KSQoo-7pSIHsF2dGTfhxvY4s8ywp-UY0qcUPSa7BHmFJKLlpd~NhfU2JEvdZGid5XK-F6O7RbD4CLUF1cc6yaUuh1WrCdQ9fM~aRMJQ__",
  };

  function showDialog() {
    dialogRef.current?.showModal();
    setModalOpen(true);
  }

  function closeDialog() {
    dialogRef.current?.close();
    setModalOpen(false);
  }



  return (
    <div className={styles.container}>
      <CreatePostModal
        closeDialog={closeDialog}
        author={author}
        ref={dialogRef}
      />
      <img
        className={styles.avatar}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
        alt=""
      />

      <div className={styles.postContainer}>
        <textarea
          onClick={showDialog}
          className={styles.postContent}
          name="content"
          id="content"
          placeholder="What happening?"
        ></textarea>
      </div>
    </div>
  );
}
