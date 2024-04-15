export {
    userReducer,
    userActions,
} from './model/slice/userSlice';

export type { User, UserSchema, UserRole } from './model/types/user';
export type { JsonSettings } from './model/types/jsonSettings';
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { getUserRoles, isUserAdmin } from './model/selectors/roleSelector/roleSelector';
export { useJsonSettings } from './model/selectors/jsonSettings';
export { saveJsonSettings } from './model/services/saveJsonSettings';
export { initAuthData } from './model/services/initAuthData';
