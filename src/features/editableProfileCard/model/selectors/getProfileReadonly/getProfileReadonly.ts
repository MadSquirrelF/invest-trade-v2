import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileReadonlyInfo = (state: StateSchema) => state.profile?.readonlyInfo;
