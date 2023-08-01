import React from "react";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <div className="mx-auto text-[75px] leading-[4.2rem] md:text-[85px] md:leading-[5rem] text-left font-bold">
      <p className="text-primary">what's</p>
      <div className="inline-flex space-x-3">
        <p>that</p>
        <div className="bg-primary flex space-x-2 md:space-x-3 px-4 h-10 md:h-12 rounded-full items-center mt-auto mb-1 md:mb-3">
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: ["0%", "-60%", "0%"] }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0, repeat: Infinity, repeatDelay: 0.2 }}
            className="md:w-5 md:h-5 w-4 h-4 rounded-full bg-textLight"
          />
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{ duration: 1.5, ease: "easeIn", delay: 0.4, repeat: Infinity, repeatDelay: 0.2 }}
            className="md:w-5 md:h-5 w-4 h-4 rounded-full bg-textLight"
          />
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: ["0%", "-30%", "0%"] }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
            className="md:w-5 md:h-5 w-4 h-4 rounded-full bg-textLight"
          />
        </div>
      </div>
      <p className="text-highlighter">meme?</p>
      {/* <Image src="/logo.svg" fill alt="logo" className="object-contain" /> */}
    </div>
  );
};

export default Logo;
