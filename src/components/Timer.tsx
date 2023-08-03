import { useGlobalContext } from "@/app/context/store";
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

export const Timer = () => {
  const { userName, players, partyId, timer, phase, setTimer, appTimer, setAppTimer } = useGlobalContext();
  const isHost = players[0]?.name === userName;
  const [party, loading, error] = useDocument(doc(db, "parties", partyId));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (party) {
      setAppTimer(party.data()?.roundTimer);
    }
  }, [party, setTimer]);

  useEffect(() => {
    if (isHost) {
      updateDoc(doc(db, "parties", partyId), {
        roundTimer: timer,
      });
    }
  }, [isHost, partyId, timer]);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
    }

    return () => {
      clearInterval(timerRef.current!);
    };
  }, [timer, setTimer]);

  let overlayWidth = 0;

  if (appTimer > 0) {
    if (phase === 1) {
      overlayWidth = ((appTimer - 1) / 20) * 110;
    }
    // if (phase === 2) {
    //   overlayWidth = ((appTimer - 1) / 5) * 100;
    // }
    if (phase === 3) {
      overlayWidth = ((appTimer - 1) / 90) * 102;
    }
    if (phase === 4) {
      const participatingPlayers = players.filter((player) => player.gifUrl).length;
      overlayWidth = ((appTimer - 1) / (participatingPlayers * 5)) * 110;
    }
    if (phase === 5) {
      overlayWidth = ((appTimer - 1) / 15) * 110;
    }
    if (phase === 6) {
      overlayWidth = ((appTimer - 1) / 10) * 110;
    }
    // if (phase === 7) {
    //   overlayWidth = ((appTimer - 1) / 15) * 100;
    // }
    // if (phase === 8) {
    //   overlayWidth = ((appTimer - 1) / 10) * 100;
    // }
  }

  return (
    <div className="z-30 fixed top-0 w-full h-[5px] bg-bgDark mx-auto overflow-hidden">
      <div
        className={`${overlayWidth < 20 ? "bg-red-600" : overlayWidth < 40 ? "bg-orange-500" : "bg-primary"}
        h-[100%] -z-10 absolute top-0 left-0 transition-all duration-[1s] ease-linear`}
        style={{
          width: `${overlayWidth}%`,
        }}
      />
      {/* <div className="text-center z-10">Time Remaining {appTimer}s</div> */}
    </div>
  );
};
