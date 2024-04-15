import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewDetailsData = (state: StateSchema) => state.newDetails?.data;
export const getNewDetailsIsLoading = (state: StateSchema) => state.newDetails?.isLoading || false;
export const getNewDetailsError = (state: StateSchema) => state.newDetails?.error;
