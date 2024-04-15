import { combineReducers } from '@reduxjs/toolkit';
import { NewDetailsPageSchema } from '../types';
import { newDetailsPageLastReducer } from './NewDetailsPageLastSlice';

export const newDetailsPageReducer = combineReducers<NewDetailsPageSchema>({
    last: newDetailsPageLastReducer,
});
