import { lazy } from 'react';

export const NewDetailsPageAsync = lazy(
    () => import('./NewDetailsPage'),
);
