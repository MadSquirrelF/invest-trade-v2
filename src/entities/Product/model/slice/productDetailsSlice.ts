import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductDetailsSchema } from '../types/productDetailsSchema';
import { fetchProductBySlug } from '../services/fetchProductById/fetchProductById';
import { Product } from '../types/productSchema';

const initialState: ProductDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductBySlug.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProductBySlug.fulfilled, (
                state,
                action: PayloadAction<Product>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProductBySlug.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productDetailsActions } = productDetailsSlice;
export const { reducer: productDetailsReducer } = productDetailsSlice;
