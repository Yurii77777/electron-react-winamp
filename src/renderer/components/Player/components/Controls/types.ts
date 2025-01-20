import { Dispatch, SetStateAction } from 'react';

import { SoundRef } from '../../../../interfaces/common.types';

export type ControlsProps = {
  soundRef: SoundRef;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  setProgressSeconds: Dispatch<SetStateAction<number>>;
};
