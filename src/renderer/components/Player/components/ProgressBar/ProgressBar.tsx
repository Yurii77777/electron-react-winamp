import { FC } from 'react';

import { Slider } from '../../../UI/Slider/Slider';
import { ProgressBarProps } from './types';

const PROGRESS_BAR_STEP = 1;

export const ProgressBar: FC<ProgressBarProps> = ({
  progress,
  onChange,
  duration,
}) => {
  const handleSeek = (newValue: number) => {
    onChange(newValue);
  };

  return (
    <div className="relative w-full">
      <Slider
        value={progress}
        onChange={(value: number) => handleSeek(value)}
        trackClassNames="progress-bar bg-gray-6"
        isVolumeOrEqualizerSlider={false}
        duration={duration}
        step={PROGRESS_BAR_STEP}
      />
    </div>
  );
};
