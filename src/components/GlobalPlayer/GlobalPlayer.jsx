import "./GlobalPlayer.css";

import {
  useEffect,
  useRef,
} from "react";

import {
  usePlayer,
} from "../../PlayerContext/PlayerContext";

export default function MusicPlayer() {
  const {
    currentBeat,
    isPlaying,
  } = usePlayer();

  const audioRef =
    useRef(null);

  useEffect(() => {
    if (
      !audioRef.current
    )
      return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  if (!currentBeat)
    return null;

  return (
    <div className="music-player">
      <div className="player-info">
        <strong>
          {
            currentBeat.title
          }
        </strong>

        <span>
          {
            currentBeat.producer
          }
        </span>
      </div>

      <audio
        controls
        ref={audioRef}
        src={`http://localhost:3001${currentBeat.preview}`}
      />
    </div>
  );
}