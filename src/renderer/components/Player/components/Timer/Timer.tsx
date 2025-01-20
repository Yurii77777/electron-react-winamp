import { FC } from 'react';

import audio from '../../../../assets/icons/audio.svg';
import playIndicator from '../../../../assets/icons/playIndicator.svg';
import equalizer from '../../../../assets/icons/equalizer.svg';

import { formatProgress } from '../../helpers.player';
import { TimerProps } from './types';

export const Timer: FC<TimerProps> = ({ progress }) => {
  return (
    <div className="flex gap-x-2 w-[190px] h-[90px] timer-bg flex-shrink-0">
      <img src={audio} />

      <div className="flex flex-col justify-between w-full h-full py-2 pr-2">
        <div className="flex justify-between items-center">
          <img src={playIndicator} />
          <p className="font-dogica text-md text-green-1">
            {formatProgress(progress)}
          </p>
        </div>

        <div className="equalizer-bg p-1">
          <img src={equalizer} />
        </div>
      </div>
    </div>
  );
};
