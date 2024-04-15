import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { saveToStorage } from './authHelper';
import { IAuthResponse } from '../types/loginSchema';

export const getNewTokens = createAsyncThunk<IAuthResponse, void, ThunkConfig<string>>(
    'auth/getNewTokens',
    async (_, thunkAPI) => {
        try {
            const refreshToken = Cookies.get('refreshToken');
            const response = await thunkAPI.extra.api.post<IAuthResponse>(
                '/auth/login/access-token',
                {
                    refreshToken,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (!response.data) {
                throw new Error();
            }

            if (response.data.accessToken) {
                saveToStorage(response.data);
            }

            return response.data;
        } catch (e : any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    },
);
