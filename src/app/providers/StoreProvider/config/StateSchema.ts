import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/Auth/model/types/loginSchema';
import { RegistrationSchema } from '@/features/Auth/model/types/registrationSchema';

import { ScrollSaveSchema } from '@/features/ScrollSave';
import { SizeSaveSchema } from '@/features/SizeSave';

import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
  user: UserSchema;
  scrollSave: ScrollSaveSchema;
  sizeSave: SizeSaveSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // Async reducers
  loginForm?: LoginSchema;
  registrationForm?: RegistrationSchema;
}

export type StateSchemaKey = keyof StateSchema;
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
