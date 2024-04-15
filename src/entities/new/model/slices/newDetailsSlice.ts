import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewDetailsSchema } from '../types/newDetailsSchema';
import { New } from '../types/newSchema';
import { fetchNewBySlug } from '../services/fetchNewBySlug';

const initialState: NewDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const newDetailsSlice = createSlice({
    name: 'newDetailsDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewBySlug.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchNewBySlug.fulfilled, (
                state,
                action: PayloadAction<New>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchNewBySlug.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: newDetailsActions } = newDetailsSlice;
export const { reducer: newDetailsReducer } = newDetailsSlice;
