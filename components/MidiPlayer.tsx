"use client";

import { useEffect, useState, useCallback } from "react";
import { songs } from "@/data/songs";

export const MidiPlayer = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [songQueue, setSongQueue] = useState<string[]>([]);
  const [currentSong, setCurrentSong] = useState<string>("");

  // Initialize audio on client-side only with reduced volume
  useEffect(() => {
    const newAudio = new Audio();
    newAudio.volume = 0.2; // Set volume to 30%
    setAudio(newAudio);
  }, []);

  const createNewQueue = useCallback(() => {
    const shuffled = [...songs].sort(() => Math.random() - 0.5);
    setSongQueue(shuffled);
    return shuffled[0];
  }, []);

  const pickNextSong = useCallback(() => {
    if (songQueue.length <= 1) {
      return createNewQueue();
    }
    const [nextSong, ...remainingQueue] = songQueue;
    setSongQueue(remainingQueue);
    return nextSong;
  }, [songQueue, createNewQueue]);

  const playNextSong = useCallback(() => {
    if (!audio) return;
    const nextSong = pickNextSong();
    setCurrentSong(nextSong);
    audio.src = nextSong;
    setSongQueue((prev) => prev.slice(1));
    audio
      .play()
      .then(() => {
        audio.currentTime = 1;
      })
      .catch(() => {
        // Silently fail if we can't play yet
      });
  }, [audio, pickNextSong]);

  useEffect(() => {
    if (!audio) return;

    audio.loop = false;

    const attemptPlay = () => {
      if (!currentSong) {
        playNextSong();
      } else {
        audio.play().catch(() => {
          // Silently fail if we can't play yet
        });
      }
    };

    const playOnInteraction = () => {
      attemptPlay();
    };

    // Add listeners for various user interactions
    document.addEventListener("click", playOnInteraction);
    document.addEventListener("keydown", playOnInteraction);
    document.addEventListener("touchstart", playOnInteraction);

    const updateProgress = () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(Math.round(percentage));
    };

    const handleSongEnd = () => {
      playNextSong();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleSongEnd);
    attemptPlay();

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleSongEnd);
      document.removeEventListener("click", playOnInteraction);
      document.removeEventListener("keydown", playOnInteraction);
      document.removeEventListener("touchstart", playOnInteraction);
    };
  }, [audio, currentSong, playNextSong]);

  const progressBar =
    "=".repeat(Math.floor(progress / 10)) +
    "-".repeat(10 - Math.floor(progress / 10));

  return (
    <div className="midi-player">
      ▶️ Now Playing: {currentSong.split("/").pop()} [{progressBar}]{" "}
      {progress ? progress : "0"}%
      <br />
      ♪ Volume: [▮▮▮▮▮▮▮▮▮▮] (Cannot be disabled)
      <br />
      <button onClick={playNextSong} className="skip-button">
        {">>"} Skip to Next Song
      </button>
    </div>
  );
};
