export type SliderProps = {
  value: number;
  onChange:
    | ((e: React.ChangeEvent<HTMLInputElement>) => void)
    | ((value: number) => void);
  isVolumeOrEqualizerSlider: boolean;
  trackClassNames?: string;
  duration?: number;
  step?: number;
};
