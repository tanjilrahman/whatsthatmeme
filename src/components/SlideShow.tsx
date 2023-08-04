import { useGlobalContext } from "@/app/context/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SlideShow = () => {
  const { players } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [playersWithGif, setPlayersWithGif] = useState<PlayerInfo[]>([]);

  useEffect(() => {
    const playersWithGif = players.filter((player) => player.gifUrl !== null);
    setPlayersWithGif(playersWithGif);
  }, []);

  useEffect(() => {
    if (activeIndex + 1 != playersWithGif.length) {
      const timer = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % playersWithGif.length);
      }, 5000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [playersWithGif, activeIndex]);

  useEffect(() => {
    setShowAnimation(true);

    // Hide the div after 1.5 seconds
    const timeoutId = setTimeout(() => {
      setShowAnimation(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeIndex]);

  return (
    <div className="max-w-xl mx-auto px-6">
      {playersWithGif.map((player, i) => (
        <div key={i} className={`${i === activeIndex ? "block" : "hidden"}`}>
          <p className="text-xl md:text-2xl text-left mt-4 md:mt-6 italic">
            {activeIndex + 1}/{playersWithGif.length}
          </p>
          <div className="w-full h-[358px] md:h-[500px] mt-3 md:mt-6 relative border-8 border-bgLight bg-bgLit rounded-xl overflow-hidden">
            {showAnimation && (
              <div>
                <motion.div
                  initial={{ scaleY: 2 }}
                  animate={{ scaleY: 0, transition: { duration: 1, ease: "circInOut" } }}
                  style={{ originY: -1 }}
                  className="absolute top-0 left-0 right-0 bottom-0 bg-primary z-40"
                />
                <motion.div
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0, transition: { duration: 1, ease: "circInOut" } }}
                  style={{ originY: -1 }}
                  className="absolute top-0 left-0 right-0 bottom-0 bg-bgLit z-30"
                />
              </div>
            )}
            {player.gifUrl && <Image src={player.gifUrl!} alt="gif" fill className="object-contain mx-auto" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideShow;
