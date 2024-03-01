import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RegistrationSchema } from '../types/registrationSchema';
import { registrationByEmail } from '../services/registrationByEmail';

const initialState: RegistrationSchema = {
    isLoading: false,
    email: '',
    password: '',
    username: '',
    phone_number: '',
    firstname: '',
    lastname: '',
    isEmailValid: true,
    isPasswordValid: false,
    isPersonalInfoValid: false,
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setFirstname: (state, action: PayloadAction<string>) => {
            state.firstname = action.payload;
        },
        setLastname: (state, action: PayloadAction<string>) => {
            state.lastname = action.payload;
        },
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phone_number = action.payload;
        },
        setIsPasswordValid: (state, action: PayloadAction<boolean>) => {
            state.isPasswordValid = action.payload;
        },
        setIsEmailValid: (state, action: PayloadAction<boolean>) => {
            state.isEmailValid = action.payload;
        },
        setIsPersonalInfo: (state, action: PayloadAction<boolean>) => {
            state.isPersonalInfoValid = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registrationByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registrationByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: registrationActions } = registrationSlice;
export const { reducer: registrationReducer } = registrationSlice;
