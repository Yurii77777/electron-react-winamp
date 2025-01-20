import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { SoundRef } from '../interfaces/common.types';
import { FORM_STORE_NAME } from './common.constants';

import prev from '../assets/icons/prev.svg';
import play from '../assets/icons/play.svg';
import pause from '../assets/icons/pause.svg';
import stop from '../assets/icons/stop.svg';
import next from '../assets/icons/next.svg';

export const CONTROL_BUTTONS = [
  {
    id: 'Prev',
    icon: prev,
    handler: (
      soundRef: SoundRef,
      isPlaying: boolean,
      setIsPlaying: (state: boolean) => void,
      setProgressSeconds: (value: number) => void,
      form: UseFormReturn<any>,
      setSelectedFile: Dispatch<SetStateAction<File | null>>,
      selectedFile: File | null,
    ) => {
      if (!selectedFile) return;

      const files = form.getValues(FORM_STORE_NAME) as File[];
      const currentIndex = files.findIndex(
        (file) => file.name === selectedFile.name,
      );

      if (currentIndex > 0) {
        const previousFile = files[currentIndex - 1];
        soundRef.current?.stop();
        setProgressSeconds(0);
        setSelectedFile(previousFile);
        setIsPlaying(false);
      }
    },
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
    handler: (
      soundRef: SoundRef,
      isPlaying: boolean,
      setIsPlaying: (state: boolean) => void,
      setProgressSeconds: (value: number) => void,
      form: UseFormReturn<any>,
      setSelectedFile: Dispatch<SetStateAction<File | null>>,
      selectedFile: File | null,
    ) => {
      if (!selectedFile) return;

      const files = form.getValues(FORM_STORE_NAME) as File[];
      const currentIndex = files.findIndex(
        (file) => file.name === selectedFile.name,
      );

      if (currentIndex < files.length - 1) {
        const nextFile = files[currentIndex + 1];
        soundRef.current?.stop();
        setProgressSeconds(0);
        setSelectedFile(nextFile);
        setIsPlaying(false);
      }
    },
  },
];
