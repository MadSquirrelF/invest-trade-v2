/* eslint-disable max-len */
import { StateSchema } from 'app/providers/StoreProvider';

export const getRegistrationEmail = (state: StateSchema) => state.registrationForm?.email || '';
export const getRegistrationIsLoading = (state: StateSchema) => state.registrationForm?.isLoading || false;
export const getRegistrationError = (state: StateSchema) => state.registrationForm?.error;
export const getRegistrationPassword = (state: StateSchema) => state.registrationForm?.password || '';
export const getRegistrationFirstname = (state: StateSchema) => state.registrationForm?.firstname || '';
export const getRegistrationLastname = (state: StateSchema) => state.registrationForm?.lastname || '';
export const getRegistrationPhoneNumber = (state: StateSchema) => state.registrationForm?.phone_number || '';
export const getRegistrationUsername = (state: StateSchema) => state.registrationForm?.username || '';
export const getRegistrationIsPasswordValid = (state: StateSchema) => state.registrationForm?.isPasswordValid || false;
export const getRegistrationIsEmailValid = (state: StateSchema) => state.registrationForm?.isEmailValid || false;
export const getRegistrationIsPersonalInfoValid = (state: StateSchema) => state.registrationForm?.isPersonalInfoValid || false;
