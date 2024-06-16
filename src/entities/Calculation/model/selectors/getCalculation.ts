import { StateSchema } from '@/app/providers/StoreProvider';

export const getCalculationPrice = (state: StateSchema) => state.calculation?.totalPrice || 1497;
export const getCalculationData = (state: StateSchema) => state.calculation?.calculations || [];
export const getCalculationIsLoading = (state: StateSchema) => state.calculation?.isLoading || false;
export const getCalculationError = (state: StateSchema) => state.calculation?.error;
