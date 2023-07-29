"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  phase: number;
  setPhase: Dispatch<SetStateAction<number>>;
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  appTimer: number;
  setAppTimer: Dispatch<SetStateAction<number>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  partyId: string;
  setPartyId: Dispatch<SetStateAction<string>>;
  memes: Meme[];
  setMemes: Dispatch<SetStateAction<Meme[]>>;
  players: PlayerInfo[];
  setPlayers: Dispatch<SetStateAction<PlayerInfo[]>>;
  rounds: Round[];
  setRounds: Dispatch<SetStateAction<Round[]>>;
}

const GlobalContext = createContext<ContextProps>({
  phase: 0,
  setPhase: (): number => 0,
  timer: -1,
  setTimer: (): number => -1,
  appTimer: -1,
  setAppTimer: (): number => -1,
  userName: "",
  setUserName: (): string => "",
  partyId: "",
  setPartyId: (): string => "",
  memes: [],
  setMemes: (): Meme[] => [],
  players: [],
  setPlayers: (): PlayerInfo[] => [],
  rounds: [],
  setRounds: (): Round[] => [],
});

export const GlobalContextProvider = ({ children }) => {
  const [phase, setPhase] = useState(0);
  const [timer, setTimer] = useState(-1);
  const [appTimer, setAppTimer] = useState(-1);
  const [userName, setUserName] = useState("");
  const [partyId, setPartyId] = useState("");
  const [memes, setMemes] = useState<[] | Meme[]>([]);
  const [players, setPlayers] = useState<[] | PlayerInfo[]>([]);
  const [rounds, setRounds] = useState<[] | Round[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        phase,
        setPhase,
        timer,
        setTimer,
        appTimer,
        setAppTimer,
        userName,
        setUserName,
        partyId,
        setPartyId,
        memes,
        setMemes,
        players,
        setPlayers,
        rounds,
        setRounds,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
