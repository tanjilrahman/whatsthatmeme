import React from "react";
import { motion } from "framer-motion";

const LogoHeader = () => {
  return (
    <div className="mx-auto text-[20px] leading-[1.2rem] md:text-[30px] md:leading-[1.8rem] text-left font-bold">
      <p className="text-primary">what's</p>
      <div className="inline-flex space-x-1">
        <p>that</p>
        <div className="bg-primary flex space-x-[2px] md:space-x-1 px-[4px] md:px-[6px] h-3 md:h-4 rounded-full items-center mt-auto mb-[2px] md:mb-1">
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: ["0%", "-60%", "0%"] }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0, repeat: Infinity, repeatDelay: 0.2 }}
            className="w-1 h-1 md:w-[6px] md:h-[6px] rounded-full bg-textLight"
          />
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{ duration: 1.5, ease: "easeIn", delay: 0.4, repeat: Infinity, repeatDelay: 0.2 }}
            className="w-1 h-1 md:w-[6px] md:h-[6px] rounded-full bg-textLight"
          />
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: ["0%", "-30%", "0%"] }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
            className="w-1 h-1 md:w-[6px] md:h-[6px] rounded-full bg-textLight"
          />
        </div>
      </div>
      <p className="text-highlighter">meme?</p>
      {/* <Image src="/logo.svg" fill alt="logo" className="object-contain" /> */}
    </div>
  );
};

export default LogoHeader;
