import { Dispatch, SetStateAction } from 'react';

export type InfoProps = {
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
  bitrateInKbps: null | number;
  sampleRate: null | number;
  audioFileName: null | string;
  isPlaylistActive: boolean;
  setIsPlaylistActive: Dispatch<SetStateAction<boolean>>;
};
