import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstname?:string;
  lastname?:string;
  country?: Country;
  age?: number;
  currency?: Currency;
  sex?: string;
  phone_number?: string;
  createdAt: string;
  city?: string;
  address?: string;
  avatar?: string;
  roles?: UserRole[];
}

export interface UserSchema {
  authData?: User;
  isLoading?: false;
  error?: string;

  _inited: boolean;
}
