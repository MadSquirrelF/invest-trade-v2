import Cookies from 'js-cookie';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { IAuthResponse, ITokens } from '../types/loginSchema';

export const saveTokensStorage = (data: ITokens) => {
    Cookies.set('accessToken', data.accessToken);
    Cookies.set('refreshToken', data.refreshToken);
};

export const saveToStorage = (data: IAuthResponse) => {
    saveTokensStorage(data);
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data.user));
};

export const removeTokensStorage = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
};
