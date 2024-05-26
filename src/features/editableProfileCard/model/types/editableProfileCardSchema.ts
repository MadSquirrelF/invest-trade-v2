import { Profile } from '@/entities/Profile';
import { ValidateRegistrationPasswordError } from '@/features/Auth';

export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_AGE = 'INCORRECT_AGE',
  INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR',
}

export enum ReadOnlyInfo {
  PERSONAL = 'personal',
  PASSWORD = 'password',
  LOCATION = 'location',
  CONTACT = 'contact',
  NULL = 'null'
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
    isLoading: boolean;
    error?: string;
    readonlyInfo?: ReadOnlyInfo;
    validateErrors?: ValidateProfileError[];
    validatePasswordErrors?: ValidateRegistrationPasswordError[];
}
