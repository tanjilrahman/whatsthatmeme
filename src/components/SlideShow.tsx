import { useGlobalContext } from "@/app/context/store";
import Image from "next/image";
import { useEffect, useState } from "react";

const SlideShow = () => {
  const { players } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(0);
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

  return (
    <div className="max-w-xl mx-auto px-6">
      {playersWithGif.map((player, i) => (
        <div key={i} className={`${i === activeIndex ? "block" : "hidden"}`}>
          <p className="text-xl md:text-2xl text-left mt-4 md:mt-6 italic">
            {activeIndex + 1}/{playersWithGif.length}
          </p>
          <div className="w-full h-[358px] md:h-[500px] mt-3 md:mt-6 relative border-8 border-bgLight bg-bgLit rounded-xl">
            {player.gifUrl && <Image src={player.gifUrl!} alt="gif" fill className="object-contain mx-auto" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideShow;
