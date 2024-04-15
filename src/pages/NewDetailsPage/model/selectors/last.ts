import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewLastIsLoading = (state: StateSchema) => state.newDetailsPage?.last?.isLoading;

export const getNewLastError = (state: StateSchema) => state.newDetailsPage?.last?.error;
