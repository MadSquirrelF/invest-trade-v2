export enum ValidateRegistrationPasswordError {
  EMPTY_PASSWORD = 'EMPTY_PASSWORD',
  NO_MATCH_PASSWORDS = 'NO_MATCH_PASSWORDS',
  TOO_SHORT_PASSWORD = 'TOO_SHORT_PASSWORD',
}

export enum ValidateRegistrationEmailError {
  EMPTY_DATA = 'EMPTY_DATA',
  NOT_VALID_EMAIL = 'NOT_VALID_EMAIL',
  TOO_SHORT_LOGIN = 'TOO_SHORT_LOGIN',
}

export enum ValidateRegistrationPersonalDataError {
  EMPTY_DATA = 'EMPTY_DATA',
  NOT_VALID_PHONE_NUMBER = 'NOT_VALID_PHONE_NUMBER',
  TOO_SHORT_FIRSTNAME = 'TOO_SHORT_FIRSTNAME',
  TOO_SHORT_LASTNAME = 'TOO_SHORT_LASTNAME',
}

export interface RegistrationSchema {
  email: string;
  password: string;
  repeatPassword: string;
  username: string;
  phone_number?: string;
  firstname: string;
  lastname: string;
  isLoading: boolean;
  error?: string;
  validatePasswordErrors: ValidateRegistrationPasswordError[];
  validateEmailsErrors: ValidateRegistrationEmailError[];
  validatePersonalDataErrors: ValidateRegistrationPersonalDataError[];
}
