const ColoredMemeContext = ({ meme, players }: { meme: string; players: PlayerInfo[] }) => {
  const cleanWord = (word: string) => word.replace(/[^a-zA-Z0-9']+/, "").replace(/['s]*$/, "");

  const contextWords = meme.split(" ");

  const coloredContext = contextWords.map((word, index) => {
    const cleanedWord = cleanWord(word);
    const player = players.find((player) => player.name === cleanedWord);
    if (player) {
      return (
        <span key={index} className="text-yellow-500">
          {word}{" "}
        </span>
      );
    }
    return (
      <span key={index} className="text-gray-200 ">
        {word}{" "}
      </span>
    );
  });

  return <p>{coloredContext}</p>;
};

export default ColoredMemeContext;
