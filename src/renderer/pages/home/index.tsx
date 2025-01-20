import { lazy, useEffect, useState } from 'react';

const Player = lazy(() => import('../../components/Player'));
const Playlist = lazy(() => import('../../components/Playlist'));

import {
  BASE_WINDOW_WIDTH,
  MIN_WINDOW_HEIGHT,
  WINDOW_HEIGHT_WITH_PLAYLIST,
} from '../../constants/common.constants';

export const HomePage = () => {
  const [isPlaylistActive, setIsPlaylistActive] = useState(false);

  useEffect(() => {
    const windowWidth = BASE_WINDOW_WIDTH;
    const windowHeight = !isPlaylistActive
      ? MIN_WINDOW_HEIGHT
      : WINDOW_HEIGHT_WITH_PLAYLIST;

    window.electron.resizeWindow({
      width: windowWidth,
      height: windowHeight,
    });
  }, [isPlaylistActive]);

  return (
    <article className="flex flex-col flex-1">
      <Player
        isPlaylistActive={isPlaylistActive}
        setIsPlaylistActive={setIsPlaylistActive}
      />
      <Playlist />
    </article>
  );
};
