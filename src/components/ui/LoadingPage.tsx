import React from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-bgLit flex space-x-3 md:space-x-4 px-4 md:px-6 h-12 md:h-16 rounded-full items-center">
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: ["0%", "-60%", "0%"] }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0, repeat: Infinity, repeatDelay: 0.2 }}
          className="md:w-6 md:h-6 w-5 h-5 rounded-full bg-textLight"
        />
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: ["0%", "-50%", "0%"] }}
          transition={{ duration: 1.5, ease: "easeIn", delay: 0.4, repeat: Infinity, repeatDelay: 0.2 }}
          className="md:w-6 md:h-6 w-5 h-5 rounded-full bg-textLight"
        />
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: ["0%", "-30%", "0%"] }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
          className="md:w-6 md:h-6 w-5 h-5 rounded-full bg-textLight"
        />
      </div>
    </div>
  );
};

export default LoadingPage;
