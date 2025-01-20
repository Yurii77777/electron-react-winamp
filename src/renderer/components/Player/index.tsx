import React, { useState, useRef, useEffect, FC } from 'react';
import { Howl } from 'howler';

import { Header } from '../Header/Header';
import { Timer } from './components/Timer/Timer';
import { Info } from './components/Info/Info';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { Controls } from './components/Controls/Controls';
import { INITIAL_VOLUME } from '../../constants/common.constants';
import { PlayerProps } from './types';
import { HeaderVariant } from '../Header/types';
import { useApp } from '../../providers/AppProvider';
import { getBitrate, getSampleRate, updateProgress } from './helpers.player';

const Player: FC<PlayerProps> = ({ isPlaylistActive, setIsPlaylistActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressSeconds, setProgressSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [volume, setVolume] = useState(INITIAL_VOLUME);
  const [bitrateInKbps, setBitrateInKbps] = useState(null);
  const [sampleRate, setSampleRate] = useState(null);
  const [audioFileName, setAudioFileName] = useState(null);

  const soundRef = useRef(null);
  const progressInterval = useRef(null);
  const { selectedFile } = useApp();

  const handleSeek = (newTimeInSeconds: number) => {
    if (!soundRef.current || durationSeconds <= 0) return;

    const clampedTime = Math.max(
      0,
      Math.min(newTimeInSeconds, durationSeconds),
    );
    soundRef.current.seek(clampedTime);
    setProgressSeconds(clampedTime);
  };

  // Initialize Howl
  useEffect(() => {
    if (!selectedFile) return;

    if (soundRef.current) {
      soundRef.current.unload();
    }

    soundRef.current = new Howl({
      src: [URL.createObjectURL(selectedFile)],
      html5: true,
      volume: volume,
      onload: async () => {
        const fileName = selectedFile.name;
        setAudioFileName(fileName);

        const bitrate = await getBitrate(selectedFile);
        if (bitrate) {
          setBitrateInKbps(bitrate);
        }

        const rate = await getSampleRate(selectedFile);
        if (rate) {
          setSampleRate(rate);
        }

        const loadedDuration = soundRef.current.duration();
        if (loadedDuration) {
          setDurationSeconds(loadedDuration);
        }
      },
      onloaderror: (id, error) => {
        console.error('Error loading audio:', error);
      },
      onplayerror: (id, error) => {
        console.error('Error playing audio:', error);
        soundRef.current.once('unlock', () => {
          soundRef.current.play();
        });
      },
    });

    soundRef.current.play();
    setIsPlaying(true);

    return () => {
      soundRef.current.unload();
    };
  }, [selectedFile]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(
        () => updateProgress({ soundRef, isPlaying, setProgressSeconds }),
        500,
      );
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  return (
    <section>
      <Header variant={HeaderVariant.Primary} />

      <div
        className="flex flex-col gap-y-[10px] px-2 pt-1 pb-[10px] primary-gradient
            border-l-2 border-t-2 border-gray-2 primary-shadow"
      >
        <div className="flex items-center gap-x-[10px]">
          <Timer progress={progressSeconds} />
          <Info
            volume={volume}
            setVolume={setVolume}
            bitrateInKbps={bitrateInKbps}
            sampleRate={sampleRate}
            audioFileName={audioFileName}
            isPlaylistActive={isPlaylistActive}
            setIsPlaylistActive={setIsPlaylistActive}
          />
        </div>

        <ProgressBar
          progress={progressSeconds}
          duration={durationSeconds}
          onChange={handleSeek}
        />

        <Controls
          soundRef={soundRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setProgressSeconds={setProgressSeconds}
        />
      </div>
    </section>
  );
};

export default Player;
