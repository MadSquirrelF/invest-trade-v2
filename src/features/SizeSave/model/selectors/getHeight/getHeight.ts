import { StateSchema } from '@/app/providers/StoreProvider';

export const getHeight = (state: StateSchema) => state?.sizeSave.height;
