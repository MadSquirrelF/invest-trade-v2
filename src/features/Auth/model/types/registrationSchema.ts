export interface RegistrationSchema {
  email: string;
  password: string;
  username: string;
  phone_number?: string;
  firstname: string;
  lastname: string;
  isLoading: boolean;
  error?: string;
  isPasswordValid?: boolean;
  isEmailValid?: boolean;
  isPersonalInfoValid?: boolean;
}
