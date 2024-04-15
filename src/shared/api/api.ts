/* eslint-disable ulbi-tv-plugin/layer-imports */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import axios from 'axios';
import Cookies from 'js-cookie';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { getNewTokens, removeTokensStorage } from '@/features/Auth';

export const errorCatch = (error: any): string => (error.response && error.response.data
    ? typeof error.response.data.message === 'object'
        ? error.response.data.message[0]
        : error.response.data.message
    : error.message);

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const instance = axios.create({
    baseURL: __API__,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken');

    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

instance.interceptors.response.use((config) => config, async (error) => {
    const originalRequest = error.config;

    if ((error.response.status === 401 || errorCatch(error) === 'jwt expired' || 'jwt must be provided') && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            await getNewTokens();
            return await instance.request(originalRequest);
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error) {
            if (errorCatch(error) === 'jwt expired') removeTokensStorage();
        }
    }
    throw error;
});

export default instance;

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    }
    return config;
});
