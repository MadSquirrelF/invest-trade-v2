import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { userActions } from 'entities/User';
import { saveToStorage } from './authHelper';
import { IAuthResponse } from '../types/loginSchema';

interface RegistrationByEmailProps {
  email: string;
  password: string;
  username: string;
  phone_number: string;
  firstname: string;
  lastname: string;
}

export const registrationByEmail = createAsyncThunk<IAuthResponse, RegistrationByEmailProps, ThunkConfig<string>>(
    'registration/registrationByEmail',
    async (authData, thunkAPI) => {
        try {
            const response = await thunkAPI.extra.api.post<IAuthResponse>('/auth/registration', authData);

            if (!response.data) {
                throw new Error();
            }

            if (response.data.accessToken) {
                saveToStorage(response.data);
            }

            thunkAPI.dispatch(userActions.setAuthData(response.data.user));

            return response.data;
        } catch (e : any) {
            return thunkAPI.rejectWithValue(e.response.data.message);
        }
    },
);
