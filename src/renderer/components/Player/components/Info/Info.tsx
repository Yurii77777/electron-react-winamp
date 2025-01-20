import { FC, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Slider } from '../../../UI/Slider/Slider';
import { Button } from '../../../UI/Button/Button';
import { SongTitle } from '../SongTitle/SongTitle';
import { useApp } from '../../../../providers/AppProvider';
import { INITIAL_SOUND_BALANCE } from '../../../../constants/common.constants';
import { MESSAGE } from '../../../../messages/messages';
import { getAudioChannelType, handleOnChange } from '../../helpers.player';
import { ButtonVariant } from '../../../UI/Button/types';
import { InfoProps } from './types';

const STEREO_AUDIO_STYLES = 'text-green-1 green-drop-shadow';

export const Info: FC<InfoProps> = ({
  volume,
  setVolume,
  bitrateInKbps,
  sampleRate,
  audioFileName,
  isPlaylistActive,
  setIsPlaylistActive,
}) => {
  const [soundDirection, setSoundDirection] = useState(INITIAL_SOUND_BALANCE);
  const [isEqualizerActive, setIsEqualizerActive] = useState(false);
  const [audioChannelType, setAudioChannelType] = useState<string | null>(null);

  const { selectedFile } = useApp();

  useEffect(() => {
    const fetchChannelType = async () => {
      if (selectedFile) {
        const channelType = await getAudioChannelType(selectedFile);
        setAudioChannelType(channelType);
      } else {
        setAudioChannelType(null);
      }
    };

    fetchChannelType();
  }, [selectedFile]);

  return (
    <div className="flex flex-col gap-y-3 h-[88px] flex-grow max-w-[calc(100%-200px)]">
      <SongTitle title={audioFileName} />

      <div className="flex items-center h-6 min-h-6 w-full justify-between">
        <div className="flex items-center gap-x-[10px] h-full">
          <p
            className="flex items-center font-dogica text-green-1 text-xs p-1
                      w-10 h-full bg-black secondary-shadow tertiary-shadow overflow-hidden"
          >
            {bitrateInKbps}
          </p>
          <p className="font-dogica text-xs text-white">{MESSAGE.BITRATE}</p>
          <p
            className="flex items-center font-dogica text-green-1 text-xs p-1
                      w-8 h-full bg-black secondary-shadow tertiary-shadow overflow-hidden"
          >
            {sampleRate}
          </p>
          <p className="font-dogica text-xs text-white">{MESSAGE.HZ}</p>
        </div>

        <div className="flex items-center gap-x-3 text-white text-xs">
          <p>{MESSAGE.MONO}</p>
          <p className={twMerge(audioChannelType && STEREO_AUDIO_STYLES)}>
            {MESSAGE.STEREO}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center h-5 min-h-5 w-full gap-x-1">
        <div className=" flex items-center gap-x-3">
          <Slider
            value={soundDirection}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e, setSoundDirection)
            }
            isVolumeOrEqualizerSlider={true}
            trackClassNames="gradient-red"
            step={0.01}
          />
          <Slider
            value={volume}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(e, setVolume)
            }
            isVolumeOrEqualizerSlider={true}
            trackClassNames="gradient-green"
            step={0.01}
          />
        </div>

        <div className="flex items-center gap-x-1">
          <Button
            variant={ButtonVariant.Secondary}
            title={MESSAGE.EQ}
            isActive={isEqualizerActive}
            onClick={() => setIsEqualizerActive(!isEqualizerActive)}
          />
          <Button
            variant={ButtonVariant.Secondary}
            title={MESSAGE.PL}
            isActive={isPlaylistActive}
            onClick={() => setIsPlaylistActive(!isPlaylistActive)}
          />
        </div>
      </div>
    </div>
  );
};
