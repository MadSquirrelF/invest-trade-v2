export enum ValidateRegistrationPasswordError {
  EMPTY_PASSWORD = 'EMPTY_PASSWORD',
  NO_MATCH_PASSWORDS = 'NO_MATCH_PASSWORDS',
  TOO_SHORT_PASSWORD = 'TOO_SHORT_PASSWORD',
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
}
