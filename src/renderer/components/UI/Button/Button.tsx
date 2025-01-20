import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { ButtonProps, ButtonVariant } from './types';

const BASE_CLASSES = 'flex items-center font-dogica text-sm h-[22px] p-0.5';
const PRIMARY_CLASSES = 'bg-blue-500 text-white';
const SECONDARY_CLASSES =
  'text-gray-3 bg-gray-4 inner-shadow-light inner-shadow-dark';

export const Button: FC<ButtonProps> = ({
  variant,
  title,
  isActive,
  onClick,
  imgSrc,
  customClasses,
}) => {
  return (
    <button
      className={twMerge(
        BASE_CLASSES,
        variant === ButtonVariant.Primary ? PRIMARY_CLASSES : SECONDARY_CLASSES,
        customClasses,
      )}
      onClick={onClick}
    >
      <div
        className={twMerge(
          'flex items-center gap-x-2 p-0.5',
          variant === ButtonVariant.Secondary &&
            'inner-shadow-white inner-shadow-blue',
        )}
      >
        {variant === ButtonVariant.Secondary && (
          <div
            className={twMerge(
              'w-2 h-2 bg-gray-5 inner-shadow-gray',
              isActive && 'bg-green-1 inner-shadow-green',
            )}
          />
        )}
        {!!imgSrc && <img src={imgSrc} />}
        {!!title && <span>{title}</span>}
      </div>
    </button>
  );
};
