import PropTypes from "prop-types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CustomSlider.module.css";

export default function CustomSlider({ mediaList }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("left");

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const currentMedia = mediaList[currentIndex];

  const slideVariants = {
    hiddenRight: {
      x: "100%", // Slide in from the right
      opacity: 0, // Start invisible
    },
    hiddenLeft: {
      x: "-100%", // Slide in from the left
      opacity: 0, // Start invisible
    },
    visible: {
      x: "0%", // Center the slide
      opacity: 1, // Fully visible
      transition: {
        duration: 0.5, // Adjust for smoothness
        ease: "easeInOut",
      },
    },
    exitRight: {
      x: "-100%", // Slide out to the left
      opacity: 0, // Fade out
      transition: {
        duration: 0.5, // Adjust for smoothness
        ease: "easeInOut",
      },
    },
    exitLeft: {
      x: "100%", // Slide out to the right
      opacity: 0, // Fade out
      transition: {
        duration: 0.5, // Adjust for smoothness
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={styles.slideContainer}>
      {currentMedia.type === "image" ? (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={currentMedia.url}
            variants={slideVariants}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit={direction === "right" ? "exitLeft" : "exitRight"}
          />
        </AnimatePresence>
      ) : (
        <video controls className={styles.previewVideo}>
          <source src={currentMedia.url} type={currentMedia.type} />
          Your browser does not support the video tag.
        </video>
      )}

      <div className={styles.slideDirection}>
        {currentIndex !== 0 && (
          <div className={styles.left} onClick={handlePrevious}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 96 960 960"
              width="20"
            >
              <path
                fill="white"
                d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z"
              />
            </svg>
          </div>
        )}
        {currentIndex < mediaList.length - 1 && (
          <div className={styles.right} onClick={handleNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 96 960 960"
              width="20"
            >
              <path
                fill="white"
                d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z"
              />
            </svg>
          </div>
        )}
        <div className={styles.carouselIndicator}>
          {mediaList.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${
                currentIndex === index ? `${styles.active}` : ""
              }`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

CustomSlider.propTypes = {
  mediaList: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      type: PropTypes.string,
    })
  ),
};
