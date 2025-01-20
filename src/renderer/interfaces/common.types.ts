import { MutableRefObject } from 'react';
import { Howl } from 'howler';

export type SoundRef = MutableRefObject<Howl | null>;
