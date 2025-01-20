import { SoundRef } from '../interfaces/common.types';

import prev from '../assets/icons/prev.svg';
import play from '../assets/icons/play.svg';
import pause from '../assets/icons/pause.svg';
import stop from '../assets/icons/stop.svg';
import next from '../assets/icons/next.svg';

export const CONTROL_BUTTONS = [
  {
    id: 'Prev',
    icon: prev,
  },
  {
    id: 'Play',
    icon: play,
    handler: (
      soundRef: SoundRef,
      isPlaying: boolean,
      setIsPlaying: (state: boolean) => void,
    ) => {
      if (soundRef.current && !isPlaying) {
        soundRef.current.play();
        setIsPlaying(true);
      }
    },
  },
  {
    id: 'Pause',
    icon: pause,
    handler: (
      soundRef: SoundRef,
      isPlaying: boolean,
      setIsPlaying: (state: boolean) => void,
    ) => {
      if (soundRef.current && isPlaying) {
        soundRef.current.pause();
        setIsPlaying(false);
      }
    },
  },
  {
    id: 'Stop',
    icon: stop,
    handler: (
      soundRef: SoundRef,
      isPlaying: boolean,
      setIsPlaying: (state: boolean) => void,
      setProgressSeconds: (value: number) => void,
    ) => {
      if (soundRef.current) {
        soundRef.current.stop();
        setIsPlaying(false);
        setProgressSeconds(0);
      }
    },
  },
  {
    id: 'Next',
    icon: next,
  },
];
