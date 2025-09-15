import { useEffect, useState } from "react";
import "../Styles/General.css";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { slider1, slider2, slider3, slider4, slider5 } from "../Assets/Assets";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const imgArr = [slider1, slider2, slider3, slider4, slider5];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // ✅ Smooth fade + slight scale animation
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: (dir) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.8, ease: "easeInOut" },
    }),
  };

  const leftClick = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? imgArr.length - 1 : prev - 1));
  };

  const rightClick = () => {
    setDirection(1);
    setIndex((prev) => (prev === imgArr.length - 1 ? 0 : prev + 1));
  };

  // ✅ Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      rightClick();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex items-center justify-center px-3 md:px-8 lg:px-20 py-4">
      <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full rounded-xl overflow-hidden flex items-center justify-center px-4 md:px-10 lg:px-16">

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-light_green z-0" />

        {/* Image Slider */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={index}
            src={imgArr[index]}
            alt="slider"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          />
        </AnimatePresence>

        {/* Left Arrow */}
        <MdKeyboardDoubleArrowLeft
          className="absolute top-1/2 left-3 md:left-5 text-3xl md:text-4xl text-white z-20 cursor-pointer hover:scale-110 transition-transform"
          onClick={leftClick}
        />

        {/* Text Content */}
        <div className="relative z-10 text-white text-center md:text-left drop-shadow-lg px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight w-[60vw]">
            Don&apos;t miss amazing grocery deals
          </h1>
          <h3 className="text-base md:text-xl lg:text-2xl font-light mt-3">
            Save up to 50% on your first order
          </h3>
          <button className="bg-green mt-5 flex items-center gap-2 px-5 py-2 md:px-6 md:py-3 rounded-md font-semibold text-sm md:text-lg hover:bg-green/90 transition">
            Shop Now <MdOutlineArrowRightAlt className="text-xl md:text-2xl" />
          </button>
        </div>

        {/* Right Arrow */}
        <MdKeyboardDoubleArrowRight
          className="absolute top-1/2 right-3 md:right-5 text-3xl md:text-4xl text-white z-20 cursor-pointer hover:scale-110 transition-transform"
          onClick={rightClick}
        />
      </div>
    </div>
  );
};

export default Home;
