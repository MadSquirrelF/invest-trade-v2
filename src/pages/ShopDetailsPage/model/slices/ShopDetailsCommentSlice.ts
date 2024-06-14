import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { IComment } from '@/entities/Comment';
import { ShopDetailsCommentSchema } from '../types/ShopDetailsCommentSchema';
import { fetchCommentsByProductSlug } from '../services/fetchCommentsByProductSlug/fetchCommentsByProductSlug';

const commentsAdapter = createEntityAdapter<IComment>({
    selectId: (comment) => comment._id,
});

export const getProductComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.shopDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const ShopDetailsCommentSlice = createSlice({
    name: 'ShopDetailsCommentSlice',
    initialState: commentsAdapter.getInitialState<ShopDetailsCommentSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {
        },
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByProductSlug.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCommentsByProductSlug.fulfilled, (
                state,
                action: PayloadAction<IComment[]>,
            ) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByProductSlug.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: shopDetailsCommentReducer } = ShopDetailsCommentSlice;
