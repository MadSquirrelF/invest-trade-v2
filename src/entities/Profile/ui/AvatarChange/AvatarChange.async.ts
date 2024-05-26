import { FC, lazy } from 'react';
import { AvatarChangeProps } from './AvatarChange';

export const AvatarChangeAsync = lazy<FC<AvatarChangeProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./AvatarChange')), 1500);
}));
