import { Dispatch, SetStateAction } from 'react';

import { UpdateProgressArgs } from './types';

export const handleOnChange = (
  value: number | React.ChangeEvent<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<number>>,
) => {
  const newValue =
    typeof value === 'number' ? value : parseFloat(value.target.value);
  setValue(newValue);
};

export const getBitrate = async (audioFile: File) => {
  try {
    const fileSizeInBits = audioFile.size * 8;
    const arrayBuffer = await audioFile.arrayBuffer();

    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const duration = audioBuffer.duration;

    if (!duration || duration === Infinity) {
      throw new Error('Invalid audio duration');
    }

    const bitrateInBps = fileSizeInBits / duration;
    const bitrateInKbps = Math.round(bitrateInBps / 1000);

    return bitrateInKbps;
  } catch (error) {
    console.error('Error calculating bitrate:', error);
    return null;
  }
};

export const getSampleRate = async (audioFile: File) => {
  try {
    const arrayBuffer = await audioFile.arrayBuffer();

    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const sampleRateInKHz = Math.round(audioBuffer.sampleRate / 1000);

    return sampleRateInKHz;
  } catch (error) {
    console.error('Error getting sample rate:', error);
    return null;
  }
};

export const formatProgress = (progress: number): string => {
  const hours = Math.floor(progress / 3600);
  const minutes = Math.floor((progress % 3600) / 60);
  const seconds = Math.floor(progress % 60);

  const formattedMinutes =
    hours > 0 ? String(minutes).padStart(2, '0') : minutes;
  const formattedSeconds = String(seconds).padStart(2, '0');

  return hours > 0
    ? `${hours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
};

export const formatDuration = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const duration = audioBuffer.duration;

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    const formattedMinutes =
      hours > 0 ? String(minutes).padStart(2, '0') : minutes;
    const formattedSeconds = String(seconds).padStart(2, '0');

    return hours > 0
      ? `${hours}:${formattedMinutes}:${formattedSeconds}`
      : `${formattedMinutes}:${formattedSeconds}`;
  } catch (error) {
    console.error('Error formatting duration:', error);
    return '00:00';
  }
};

export const updateProgress = ({
  soundRef,
  isPlaying,
  setProgressSeconds,
}: UpdateProgressArgs) => {
  if (!soundRef?.current && !isPlaying) return;

  const currentSeek = soundRef.current.seek() as number;
  setProgressSeconds(currentSeek);
};

export const getAudioChannelType = async (audioFile: File): Promise<string> => {
  try {
    const audioContext = new AudioContext();
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const channelCount = audioBuffer.numberOfChannels;

    if (channelCount === 1) {
      return 'Mono';
    } else if (channelCount === 2) {
      return 'Stereo';
    } else {
      return 'Unknown';
    }
  } catch (error) {
    console.error('Error determining audio channel type:', error);
    return 'Unknown';
  }
};
