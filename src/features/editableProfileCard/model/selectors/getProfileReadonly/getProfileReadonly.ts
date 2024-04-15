import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileReadonlyContactInfo = (state: StateSchema) => state.profile?.readonlyContactInfo;
export const getProfileReadonlyLocationInfo = (state: StateSchema) => state.profile?.readonlyLocationInfo;
export const getProfileReadonlyPasswordInfo = (state: StateSchema) => state.profile?.readonlyPasswordInfo;
export const getProfileReadonlyPersonalInfo = (state: StateSchema) => state.profile?.readonlyPersonalInfo;
