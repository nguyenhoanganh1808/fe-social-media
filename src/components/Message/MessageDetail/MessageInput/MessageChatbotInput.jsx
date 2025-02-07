import { forwardRef } from "react";
import { SendHorizontal } from "lucide-react";
import styles from "./MessageInput.module.css";
import LucideCircleButton from "../../../Button/LucideCircleButton/LucideCircleButton";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ChatbotService } from "../../../../services/chatbot.service";

const MessageChabotInput = forwardRef(function MessageChatbotInput(
  { setMessageData },
  ref
) {
  const { register, handleSubmit, reset } = useForm();

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (ref?.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    });
  };

  const onSubmit = async (data) => {
    const { message } = data;
    setMessageData((prev) => [
      {
        content: "Processing... Please wait",
        isUser: false,
        createdAt: new Date().toISOString(),
      },
      { content: message, isUser: true, createdAt: new Date().toISOString() },
      ...prev,
    ]);
    scrollToBottom();

    reset();

    const result = await ChatbotService.sendMessage(message);
    setMessageData((prev) => [...prev].slice(1));
    if (result.error) {
      setMessageData((prev) => [...prev]);
    } else {
      setMessageData((prev) => [result.data, ...prev]);
    }
    scrollToBottom();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.inputContainer}>
          <input
            {...register("message")}
            className={`${styles.input} border-transparent focus:border-transparent focus:ring-0`}
            type="text"
            id="message"
            name="message"
            placeholder="Message"
          />
        </div>

        <LucideCircleButton type="submit" isHoverFill={true}>
          <motion.div
            key="send-horizontal"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <SendHorizontal fill="#38bdf8" />
          </motion.div>
        </LucideCircleButton>
      </form>
    </>
  );
});

MessageChabotInput.propTypes = {
  setMessageData: PropTypes.func.isRequired,
};

export default MessageChabotInput;
