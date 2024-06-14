import { combineReducers } from '@reduxjs/toolkit';
import { shopDetailsPageRecommendationsReducer } from './ShopDetailsPageRecommendationsSlice';
import { shopDetailsCommentReducer } from './ShopDetailsCommentSlice';
import { ShopDetailsPageSchema } from '../types';

export const shopDetailsPageReducer = combineReducers<ShopDetailsPageSchema>({
    recommendations: shopDetailsPageRecommendationsReducer,
    comments: shopDetailsCommentReducer,
});
