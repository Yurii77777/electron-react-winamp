import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { SliderProps } from './types';

export const Slider: FC<SliderProps> = ({
  value,
  onChange,
  trackClassNames,
  isVolumeOrEqualizerSlider,
  duration,
  step,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);

    if (typeof onChange !== 'function') return;

    if (onChange.length === 1) {
      (onChange as (value: number) => void)(newValue);
    } else {
      (onChange as (e: React.ChangeEvent<HTMLInputElement>) => void)(e);
    }
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max={isVolumeOrEqualizerSlider ? '1' : duration?.toString() || '1'}
        step={
          step ||
          (isVolumeOrEqualizerSlider ? '0.01' : Math.max(duration / 100, 1))
        }
        value={value}
        onChange={handleChange}
        className={twMerge(
          'inner-shadow inner-shadow-reverse inner-shadow-soft',
          isVolumeOrEqualizerSlider ? 'volume-slider' : 'progress-bar',
          trackClassNames,
        )}
      />
    </div>
  );
};
