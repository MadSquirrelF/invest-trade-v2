import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductCommentsIsLoading = (state: StateSchema) => state.shopDetailsPage?.comments.isLoading;
export const getProductCommentsError = (state: StateSchema) => state.shopDetailsPage?.comments.error;
