/* eslint-disable indent */
import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UserSchema } from '@/entities/User';
import { LoginSchema, RegistrationSchema } from '@/features/Auth';

import { ScrollSaveSchema } from '@/features/ScrollSave';
import { SizeSaveSchema } from '@/features/SizeSave';

import { rtkApi } from '@/shared/api/rtkApi';
import { NewsPageSchema } from '@/pages/NewsPage';
import { NewDetailsSchema } from '@/entities/new';
import { NewDetailsPageSchema } from '@/pages/NewDetailsPage';
import { NotificationsSchema } from '@/features/Notifications';
import { ProfileSchema } from '@/features/editableProfileCard';
import { ShopPageSchema } from '@/pages/ShopPage';
import { HelpPageSchema } from '@/pages/HelpPage';
import { ShopDetailsPageSchema } from '@/pages/ShopDetailsPage';
import { ProductDetailsSchema } from '@/entities/Product';
import { AddCommentFormSchema } from '@/features/addCommentForm';

export interface StateSchema {
  user: UserSchema;
  scrollSave: ScrollSaveSchema;
  sizeSave: SizeSaveSchema;
  notifications: NotificationsSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // Async reducers
  profile?: ProfileSchema;
  addCommentForm?: AddCommentFormSchema;
  helpPage?: HelpPageSchema;
  loginForm?: LoginSchema;
  shopPage?: ShopPageSchema;
  productDetails?: ProductDetailsSchema;
  newsPage?: NewsPageSchema;
  newDetails?: NewDetailsSchema;
  shopDetailsPage?: ShopDetailsPageSchema;
  newDetailsPage?: NewDetailsPageSchema;
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
