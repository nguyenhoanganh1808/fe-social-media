import { Mic, SendHorizontal, Smile, Paperclip } from "lucide-react";
import styles from "./MessageInput.module.css";
import LucideCircleButton from "../../../Button/LucideCircleButton/LucideCircleButton";
import { useState } from "react";

export default function MessageInput() {
  const [messageInput, setMessageInput] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Smile />
        <input
          className={styles.input}
          type="text"
          id="message"
          name="message"
          placeholder="Message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />

        <label className={styles.fileInputLabel} htmlFor="messageFile">
          <Paperclip />
        </label>
        <input
          className={styles.fileInput}
          type="file"
          id="messageFile"
          name="messageFile"
        />
      </div>
      {messageInput.trim() === "" ? (
        <LucideCircleButton>
          <Mic />
        </LucideCircleButton>
      ) : (
        <LucideCircleButton isHoverFill={true}>
          <SendHorizontal fill="#38bdf8" />
        </LucideCircleButton>
      )}
    </div>
  );
}
