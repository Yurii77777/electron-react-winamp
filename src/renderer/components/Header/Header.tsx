import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import sandClock from '../../assets/icons/sandClock.svg';
import decorLine from '../../assets/icons/decorLine.svg';
import minimize from '../../assets/icons/minimize.svg';
import maximize from '../../assets/icons/maximize.svg';
import close from '../../assets/icons/close.svg';

import { HeaderProps, HeaderVariant } from './types';
import { MESSAGE } from '../../messages/messages';

export const Header: FC<HeaderProps> = ({ variant }) => {
  return (
    <div
      className={twMerge(
        'flex items-center gap-x-1 h-[26px] w-full px-1 primary-gradient overflow-hidden',
        variant === HeaderVariant.Secondary && 'inner-shadow-header',
      )}
    >
      {variant === HeaderVariant.Primary && <img src={sandClock} />}

      <div className="flex-1 h-full">
        <img
          src={decorLine}
          alt="Decor Line"
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-sm text-gray-1 font-arialBlack whitespace-nowrap">
        {variant === HeaderVariant.Primary
          ? MESSAGE.PLAYER_HEADER_TITLE
          : MESSAGE.PLAYLIST_HEADER_TITLE}
      </h1>

      <div className="flex-1 h-full">
        <img
          src={decorLine}
          alt="Decor Line"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex justify-center items-center gap-x-1">
        {variant === HeaderVariant.Primary && (
          <button className="flex-shrink-0">
            <img src={minimize} alt="Minimize" />
          </button>
        )}
        <button className="flex-shrink-0">
          <img src={maximize} alt="Maximize" />
        </button>
        <button className="flex-shrink-0">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div>
  );
};
