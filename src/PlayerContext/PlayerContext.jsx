import {
  createContext,
  useContext,
  useState,
} from "react";

const PlayerContext =
  createContext();

export function PlayerProvider({
  children,
}) {
  const [
    currentBeat,
    setCurrentBeat,
  ] = useState(null);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  function playBeat(beat) {
    setCurrentBeat(beat);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(
      (prev) => !prev
    );
  }

  return (
    <PlayerContext.Provider
      value={{
        currentBeat,
        isPlaying,
        playBeat,
        togglePlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(
    PlayerContext
  );
}