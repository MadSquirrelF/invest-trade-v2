import { StateSchema } from '@/app/providers/StoreProvider';

export const getWidth = (state: StateSchema) => state?.sizeSave.width;
