export function generatePartyCode(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = 4;
  let code = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

export function generateRandomString(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = Math.floor(Math.random() * 20) + 2;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function pickRandomPlayers(players: string[]) {
  const numPlayersToPick = Math.floor(Math.random() * 2) + 1; // Generate a random number between 1 and 2
  const shuffledPlayers = players.sort(() => Math.random() - 0.5);
  const randomPlayers = shuffledPlayers.slice(0, numPlayersToPick);
  return randomPlayers;
}

export function getPlayerIndex(players: PlayerInfo[], userName: string) {
  const playerIndex = players.findIndex((player) => player.name === userName);

  return playerIndex;
}

export function findRoundWinners(players: PlayerInfo[]): PlayerInfo[] {
  const nameCountMap: { [voteGifPlayer: string]: number } = {};

  players.forEach((player) => {
    if (player.voteGifPlayer! in nameCountMap) {
      nameCountMap[player.voteGifPlayer!]++;
    } else {
      nameCountMap[player.voteGifPlayer!] = 1;
    }
  });

  let maxOccurrences = 0;
  for (const voteGifPlayer in nameCountMap) {
    if (nameCountMap[voteGifPlayer] > maxOccurrences) {
      maxOccurrences = nameCountMap[voteGifPlayer];
    }
  }

  const playersWithMaxOccurrences: PlayerInfo[] = [];
  players.forEach((player) => {
    if (nameCountMap[player.name] === maxOccurrences) {
      playersWithMaxOccurrences.push(player);
    }
  });

  return playersWithMaxOccurrences;
}

export function randomPlayerWithGif(players: PlayerInfo[]) {
  let randomPlayer;
  // Filter the players to get those with non-null gifUrl
  const playersWithGif = players.filter((player) => player.gifUrl !== null);

  // Check if there are players with non-null gifUrl
  if (playersWithGif.length > 0) {
    // Randomly select a player with non-null gifUrl
    const randomIndex = Math.floor(Math.random() * playersWithGif.length);
    randomPlayer = playersWithGif[randomIndex].name;
  } else {
    // Handle the case when no players have a non-null gifUrl
    randomPlayer = null;
  }

  return randomPlayer;
}
