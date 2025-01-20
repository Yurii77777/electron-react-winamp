import { Dispatch, SetStateAction } from 'react';

import { SoundRef } from '../../interfaces/common.types';

export type PlayerProps = {
  isPlaylistActive: boolean;
  setIsPlaylistActive: Dispatch<SetStateAction<boolean>>;
};

export type UpdateProgressArgs = {
  soundRef: SoundRef;
  isPlaying: boolean;
  setProgressSeconds: Dispatch<SetStateAction<number>>;
};
