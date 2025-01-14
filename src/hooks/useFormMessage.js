import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useHover from "./useHover";
import { formatTime } from "../lib/utils";
import { useAuth } from "./useAuthContext";
import { MessageService } from "../services/message.service";

export default function useFormMessage(setMessageData, receiverId) {
  const [messageInput, setMessageInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const methods = useForm({
    defaultValues: {
      photoOrVideo: [],
      document: [],
    },
  });
  const { register, handleSubmit, reset } = methods;
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
  const { user } = useAuth();
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

  const onSubmit = async (data) => {
    console.log(data);
    reset();
    setMessageInput("");

    const pendingMessage = {
      id: `pending-${Date.now()}`,
      content: data.message,
      createdAt: new Date(),
      senderId: { id: user.userId },
      mediaFiles: data.mediaFiles || [],
      state: "pending",
    };
    setMessageData((prevMessages) => [pendingMessage, ...prevMessages]);
    await MessageService.sendMessageToUser(receiverId, data);

    setMessageData((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== pendingMessage.id)
    );
  };

  // const playAudio = () => {
  //   if (audioBlob) {
  //     const audioURL = URL.createObjectURL(audioBlob);
  //     const audio = new Audio(audioURL);
  //     audio.play();
  //   }
  // };

  const handleEmojiClick = (emoji) => {
    setMessageInput((prev) => prev + emoji.native);
  };

  return {
    methods,
    messageInput,
    handleSubmit,
    onSubmit,
    onMouseEmojiEnter,
    onMouseEmojiLeave,
    showEmojiPicker,
    handleEmojiClick,
    register,
    setMessageInput,
    isRecording,
    stopRecording,
    time,
    startRecording,
    audioBlob,
  };
}
