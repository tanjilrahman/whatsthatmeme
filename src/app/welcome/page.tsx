"use client";

import Button from "@/components/ui/Button";
import LoadingPage from "@/components/ui/LoadingPage";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const page = () => {
  const [rehydration, setRehydration] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const steps = [
    {
      title: "Welcome!",
      desc: "What's That Meme is a GIF-tastic, AI-powered party game for up to 12 players where you vote on the funniest memes made by you and your friends.",
      img: "/logo.png",
    },
    {
      title: "Step 1",
      desc: "Pick a setup that tickles the imagination.",
      img: "/welcome/selection.svg",
    },
    {
      title: "Step 2",
      desc: "Create a meme by choosing any GIF you want.",
      img: "/welcome/create.svg",
    },
    {
      title: "Step 3",
      desc: "Reveal everyones meme creations.",
      img: "/welcome/reveal.svg",
    },
    {
      title: "Step 4",
      desc: "Vote on your favorite meme.",
      img: "/welcome/vote.svg",
    },
    {
      title: "Step 5",
      desc: "Celebrate the winner!",
      img: "/welcome/winner.svg",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    setRehydration(true);
  }, [rehydration]);

  if (!rehydration) {
    return <LoadingPage />;
  } else {
    return (
      <div className="text-center flex flex-col justify-between max-w-xl h-full mx-auto">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-[45vh] md:h-[55vh] bg-primary rounded-b-3xl relative"
        >
          <Image src={steps[currentStep].img} alt="howto" fill className="p-8 md:p-16 object-contain" />
        </motion.div>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="px-6 mt-8 md:mt-10 text-left"
        >
          <div>
            <h3 className="font-bold text-5xl md:text-6xl">{steps[currentStep].title}</h3>
            <p className="text-textDark mt-4 text-xl md:text-2xl">{steps[currentStep].desc}</p>
          </div>
        </motion.div>
        <div className="fixed left-1/2 text-xl transform -translate-x-1/2 bottom-0 w-full">
          {currentStep > 0 && (
            <div className="flex space-x-3 mt-auto max-w-xl mx-auto mb-5 md:mb-8 px-6">
              {steps.slice(1).map((_, i) => (
                <div
                  key={i}
                  className={`${i === 0 && currentStep === 1 ? "bg-textLight" : "bg-bgLight"} h-2 w-full rounded-full`}
                >
                  {i === currentStep - 2 && (
                    <motion.div
                      initial={{ x: "0%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="bg-textLight h-2 w-full ml-3 rounded-full "
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          <div className=" flex justify-center space-x-3 bg-bgDark pt-6 border-t border-bgLight pb-10 px-6">
            <button
              className="w-full md:w-[250px] py-[15px] bg-bgLight text-textDark cursor-default rounded-xl"
              onClick={() => router.push("/")}
            >
              Skip
            </button>
            <button className="w-full md:w-[250px]" onClick={handleNext}>
              <Button text={currentStep === steps.length - 1 ? "Start" : "Next"} alt={false} />
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default page;
