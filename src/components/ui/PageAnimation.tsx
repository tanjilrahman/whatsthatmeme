import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/app/context/store";

const PageAnimation = () => {
  const { phase } = useGlobalContext();
  return (
    <div>
      {phase === 0 && (
        <div>
          <motion.div
            initial={{ scaleY: 2 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-bgDark z-30"
          />
        </div>
      )}
      {phase === 1 && (
        <div>
          <motion.div
            initial={{ scaleY: 2 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-bgDark z-30"
          />
        </div>
      )}
      {phase === 3 && (
        <div>
          <motion.div
            initial={{ scaleY: 2 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-bgDark z-30"
          />
        </div>
      )}
      {phase === 4 && (
        <div>
          <motion.div
            initial={{ scaleY: 2 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-bgDark z-30"
          />
        </div>
      )}
      {phase === 5 && (
        <div>
          <motion.div
            initial={{ scaleY: 2 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-bgDark z-30"
          />
        </div>
      )}
      {phase === 6 && (
        <div>
          <motion.div
            initial={{ scaleY: 2 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-bgDark z-30"
          />
        </div>
      )}
      {phase === 7 && (
        <div>
          <motion.div
            initial={{ scaleY: 2 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 2, ease: "circInOut" } }}
            style={{ originY: -1 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-bgDark z-30"
          />
        </div>
      )}
    </div>
  );
};

export default PageAnimation;
