import { Mic, SendHorizontal, Smile, Paperclip, Trash2 } from "lucide-react";
import styles from "./MessageInput.module.css";
import LucideCircleButton from "../../../Button/LucideCircleButton/LucideCircleButton";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import useHover from "../../../../hooks/useHover";

export default function MessageInput() {
  const [messageInput, setMessageInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const {
    isHovered: showEmojiPicker,
    onMouseEnter: onMouseEmojiEnter,
    onMouseLeave: onMouseEmojiLeave,
  } = useHover();
  const [time, setTime] = useState("0:00,00");
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const formatTime = (elapsedTime) => {
    const minutes = String(Math.floor(elapsedTime / 60000)).padStart(1, "0");
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(
      2,
      "0"
    );
    const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(
      2,
      "0"
    );
    return `${minutes}:${seconds},${milliseconds}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
      };

      startTimeRef.current = Date.now();
      setIsRecording(true);

      intervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        setTime(formatTime(elapsedTime));
      }, 10);

      console.log(mediaRecorder);

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime("00:00,00");
  };

  // const playAudio = () => {
  //   if (audioBlob) {
  //     const audioURL = URL.createObjectURL(audioBlob);
  //     const audio = new Audio(audioURL);
  //     audio.play();
  //   }
  // };

  const handleEmojiClick = (emoji) => {
    setMessageInput((prev) => prev + emoji.emoji);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <div
            className={styles.smileyContainer}
            onMouseEnter={onMouseEmojiEnter}
            onMouseLeave={onMouseEmojiLeave}
          >
            <Smile />
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ scale: 0 }}
                  style={{ originX: 0, originY: 1 }}
                  exit={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.2,
                  }}
                  className={styles.emojiPicker}
                >
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input
            className={styles.input}
            type="text"
            id="message"
            name="message"
            placeholder="Message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />

          {isRecording ? (
            <div className={styles.timeContainer}>
              <p className={styles.time}>{time}</p>
              <motion.div
                className={styles.recordDot}
                animate={{
                  opacity: ["100%", "0%", "100%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            </div>
          ) : (
            <label className={styles.fileInputLabel} htmlFor="messageFile">
              <Paperclip />
            </label>
          )}
          <input
            className={styles.fileInput}
            type="file"
            id="messageFile"
            name="messageFile"
          />
        </div>
        {isRecording && (
          <LucideCircleButton color="red" onClick={stopRecording}>
            <Trash2 />
          </LucideCircleButton>
        )}
        {messageInput.trim() === "" && !isRecording ? (
          <LucideCircleButton onClick={startRecording}>
            <motion.div key="mic" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Mic />
            </motion.div>
          </LucideCircleButton>
        ) : (
          <LucideCircleButton isHoverFill={true} onClick={stopRecording}>
            <motion.div
              key="send-horizontal"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <SendHorizontal fill="#38bdf8" />
            </motion.div>
          </LucideCircleButton>
        )}
      </div>
    </>
  );
}
