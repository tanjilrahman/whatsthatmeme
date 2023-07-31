import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/app/context/store";

const PageAnimation = () => {
  const { phase } = useGlobalContext();
  return (
    <div>
      {phase === 0 && (
        <motion.div
          initial={{ scaleX: 2.5 }}
          animate={{ scaleX: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          style={{ originX: 1 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
        >
          <div className="fixed top-0 left-16 md:left-32 right-0 bottom-0 bg-purple-600 z-20" />
          <div className="fixed top-0 left-32 md:left-64 right-0 bottom-0 bg-yellow-500 z-20" />
          <div className="fixed top-0 left-44 md:left-96 right-0 bottom-0 bg-bgDark z-30" />
        </motion.div>
      )}
      {phase === 1 && (
        <motion.div
          initial={{ scaleX: 2.5 }}
          animate={{ scaleX: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          style={{ originX: 1 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
        >
          <div className="fixed top-0 left-16 md:left-32 right-0 bottom-0 bg-purple-600 z-20" />
          <div className="fixed top-0 left-32 md:left-64 right-0 bottom-0 bg-yellow-500 z-20" />
          <div className="fixed top-0 left-44 md:left-96 right-0 bottom-0 bg-bgDark z-30" />
        </motion.div>
      )}
      {phase === 3 && (
        <motion.div
          initial={{ scaleX: 2.5 }}
          animate={{ scaleX: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          style={{ originX: 1 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
        >
          <div className="fixed top-0 left-16 md:left-32 right-0 bottom-0 bg-purple-600 z-20" />
          <div className="fixed top-0 left-32 md:left-64 right-0 bottom-0 bg-yellow-500 z-20" />
          <div className="fixed top-0 left-44 md:left-96 right-0 bottom-0 bg-bgDark z-30" />
        </motion.div>
      )}
      {phase === 4 && (
        <motion.div
          initial={{ scaleX: 2.5 }}
          animate={{ scaleX: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          style={{ originX: 1 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
        >
          <div className="fixed top-0 left-16 md:left-32 right-0 bottom-0 bg-purple-600 z-20" />
          <div className="fixed top-0 left-32 md:left-64 right-0 bottom-0 bg-yellow-500 z-20" />
          <div className="fixed top-0 left-44 md:left-96 right-0 bottom-0 bg-bgDark z-30" />
        </motion.div>
      )}
      {phase === 5 && (
        <motion.div
          initial={{ scaleX: 2.5 }}
          animate={{ scaleX: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          style={{ originX: 1 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
        >
          <div className="fixed top-0 left-16 md:left-32 right-0 bottom-0 bg-purple-600 z-20" />
          <div className="fixed top-0 left-32 md:left-64 right-0 bottom-0 bg-yellow-500 z-20" />
          <div className="fixed top-0 left-44 md:left-96 right-0 bottom-0 bg-bgDark z-30" />
        </motion.div>
      )}
      {phase === 6 && (
        <motion.div
          initial={{ scaleX: 2.5 }}
          animate={{ scaleX: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          style={{ originX: 1 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
        >
          <div className="fixed top-0 left-16 md:left-32 right-0 bottom-0 bg-purple-600 z-20" />
          <div className="fixed top-0 left-32 md:left-64 right-0 bottom-0 bg-yellow-500 z-20" />
          <div className="fixed top-0 left-44 md:left-96 right-0 bottom-0 bg-bgDark z-30" />
        </motion.div>
      )}
      {phase === 7 && (
        <motion.div
          initial={{ scaleX: 2.5 }}
          animate={{ scaleX: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          style={{ originX: 1 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-primary z-40"
        >
          <div className="fixed top-0 left-16 md:left-32 right-0 bottom-0 bg-purple-600 z-20" />
          <div className="fixed top-0 left-32 md:left-64 right-0 bottom-0 bg-yellow-500 z-20" />
          <div className="fixed top-0 left-44 md:left-96 right-0 bottom-0 bg-bgDark z-30" />
        </motion.div>
      )}
    </div>
  );
};

export default PageAnimation;
