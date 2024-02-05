export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  email: string;
  avatar?: string;
  roles?: UserRole[];
}

export interface UserSchema {
  authData?: User;

  _inited: boolean;
}
