import { Mic, SendHorizontal, Smile, Trash2 } from "lucide-react";
import styles from "./MessageInput.module.css";
import LucideCircleButton from "../../../Button/LucideCircleButton/LucideCircleButton";
import { motion, AnimatePresence } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import PropTypes from "prop-types";

import useFormMessage from "../../../../hooks/useFormMessage";
import FileInput from "./FileInput";
import { FormProvider } from "react-hook-form";

export default function MessageInput({ receiverId, setMessageData }) {
  const {
    methods,
    handleEmojiClick,
    handleSubmit,
    isRecording,
    messageInput,
    onMouseEmojiEnter,
    onMouseEmojiLeave,
    onSubmit,
    register,
    setMessageInput,
    showEmojiPicker,
    startRecording,
    stopRecording,
    time,
  } = useFormMessage(setMessageData, receiverId);
  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={styles.container}
        >
          <div
            className={styles.inputContainer}
            onSubmit={handleSubmit(onSubmit)}
          >
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
                    <Picker data={data} onEmojiSelect={handleEmojiClick} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <input
              {...register("message")}
              className={`${styles.input} border-transparent focus:border-transparent focus:ring-0`}
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
              <FileInput
                setMessageData={setMessageData}
                receiverId={receiverId}
              />
            )}
          </div>
          {isRecording && (
            <LucideCircleButton color="red" onClick={stopRecording}>
              <Trash2 />
            </LucideCircleButton>
          )}
          {messageInput.trim() === "" && !isRecording ? (
            <LucideCircleButton onClick={startRecording}>
              <motion.div
                key="mic"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Mic />
              </motion.div>
            </LucideCircleButton>
          ) : (
            <LucideCircleButton
              type="submit"
              isHoverFill={true}
              onClick={stopRecording}
            >
              <motion.div
                key="send-horizontal"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <SendHorizontal fill="#38bdf8" />
              </motion.div>
            </LucideCircleButton>
          )}
        </form>
      </FormProvider>
    </>
  );
}

MessageInput.propTypes = {
  receiverId: PropTypes.string.isRequired,
  setMessageData: PropTypes.func.isRequired,
};
