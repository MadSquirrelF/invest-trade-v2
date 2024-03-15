import { User } from '@/entities/User';

export interface LoginSchema {
  email: string;
  password: string;
  isLoading: boolean;
  error?: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse extends ITokens {
  user: User;
}
