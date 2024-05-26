import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileNewPassword = (state: StateSchema) => state.profile?.newPassword || '';
export const getProfileRepeatNewPassword = (state: StateSchema) => state.profile?.repeatNewPassword || '';
export const getProfileOldPassword = (state: StateSchema) => state.profile?.oldPassword || '';
export const getProfilePasswordErrors = (state: StateSchema) => state.profile?.validatePasswordErrors;
