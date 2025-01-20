import { FC, useState } from 'react';

import { Button } from '../../../UI/Button/Button';
import { ButtonVariant } from '../../../UI/Button/types';
import { CONTROL_BUTTONS } from '../../../../constants/player.constants';
import { MESSAGE } from '../../../../messages/messages';
import reject from '../../../../assets/icons/reject.svg';
import repeat from '../../../../assets/icons/repeat.svg';
import logo from '../../../../assets/icons/logo.svg';

import { useApp } from '../../../../providers/AppProvider';
import { ControlsProps } from './types';

export const Controls: FC<ControlsProps> = ({
  soundRef,
  isPlaying,
  setIsPlaying,
  setProgressSeconds,
}) => {
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);

  const { form, selectedFile, setSelectedFile } = useApp();
  const { reset } = form;

  return (
    <div className="flex justify-between items-center h-9 w-full">
      <div className="flex items-center gap-x-4">
        <div className="flex items-center">
          {CONTROL_BUTTONS.map(({ id, icon, handler }) => (
            <Button
              key={id}
              variant={ButtonVariant.Primary}
              imgSrc={icon}
              customClasses="p-0"
              onClick={() =>
                handler(
                  soundRef,
                  isPlaying,
                  setIsPlaying,
                  setProgressSeconds,
                  form,
                  setSelectedFile,
                  selectedFile,
                )
              }
            />
          ))}
        </div>

        <Button
          variant={ButtonVariant.Primary}
          imgSrc={reject}
          customClasses="p-0"
          onClick={() => {
            reset();
            setProgressSeconds(0);
            if (soundRef.current) soundRef.current.stop();
            setSelectedFile(null);
          }}
        />
      </div>

      <div className="flex items-center gap-x-1">
        <Button
          variant={ButtonVariant.Secondary}
          title={MESSAGE.SHUFFLE}
          customClasses="text-sm"
          isActive={isShuffleActive}
          onClick={() => setIsShuffleActive(!isShuffleActive)}
        />
        <Button
          variant={ButtonVariant.Secondary}
          imgSrc={repeat}
          isActive={isRepeatActive}
          onClick={() => setIsRepeatActive(!isRepeatActive)}
        />
      </div>

      <img src={logo} />
    </div>
  );
};
