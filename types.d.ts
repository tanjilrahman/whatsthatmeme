type Meme = {
  context: string;
};

type PlayerInfo = {
  name: string;
  avatar: string;
  selectedContext: number | null;
  regenerate: boolean;
  gifUrl: string | null;
  voteGifPlayer: string | null;
  points: number;
};

type Round = {
  context: string;
};
