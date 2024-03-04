import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    RegistrationSchema,
    ValidateRegistrationEmailError,
    ValidateRegistrationPasswordError,
    ValidateRegistrationPersonalDataError,
} from '../types/registrationSchema';
import { registrationByEmail } from '../services/registrationByEmail';

const initialState: RegistrationSchema = {
    isLoading: false,
    email: '',
    password: '',
    repeatPassword: '',
    username: '',
    phone_number: '',
    firstname: '',
    lastname: '',
    validatePasswordErrors: [],
    validateEmailsErrors: [],
    validatePersonalDataErrors: [],
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
        setRepeatPassword: (state, action: PayloadAction<string>) => {
            state.repeatPassword = action.payload;
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
        setPasswordValidErrors: (state, action: PayloadAction<ValidateRegistrationPasswordError[]>) => {
            state.validatePasswordErrors = action.payload;
        },
        setEmailValidErrors: (state, action: PayloadAction<ValidateRegistrationEmailError[]>) => {
            state.validateEmailsErrors = action.payload;
        },
        setPersonalDataValidErrors: (state, action: PayloadAction<ValidateRegistrationPersonalDataError[]>) => {
            state.validatePersonalDataErrors = action.payload;
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
