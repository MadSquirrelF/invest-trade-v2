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
export const getRegistrationPasswordValidateErrors = (state: StateSchema) => state.registrationForm?.validatePasswordErrors;
export const getRegistrationEmailValidateErrors = (state: StateSchema) => state.registrationForm?.validateEmailsErrors;
export const getRegistrationPersonalDataValidateErrors = (state: StateSchema) => state.registrationForm?.validatePersonalDataErrors;
export const getRegistrationRepeatPassword = (state: StateSchema) => state.registrationForm?.repeatPassword || '';
