import { FeatureFlags } from '@/shared/types/featureFlags';
import { JsonSettings } from './jsonSettings';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  _id: string;
  email: string;
  username: string;
  description: string;
  avatar: string;
  roles: UserRole[];
  features?: FeatureFlags;
  jsonSettings?: JsonSettings;
}

export interface UserSchema {
  authData?: User;
  isLoading?: false;
  error?: string;

  _inited: boolean;
}
