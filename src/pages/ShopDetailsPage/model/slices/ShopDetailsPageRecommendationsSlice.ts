import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ShopDetailsRecommendationsSchema } from '../types/ShopDetailsRecommendationsSchema';
import { fetchProductRecommendations } from '../services/fetchArticlesRecommendations/fetchArticlesRecommendations';

const recommendationsAdapter = createEntityAdapter<Product>({
    selectId: (product) => product._id,
});

export const getProductRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.shopDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const ShopDetailsRecommendationsSlice = createSlice({
    name: 'ShopDetailsRecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ShopDetailsRecommendationsSchema>({
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
            .addCase(fetchProductRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProductRecommendations.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchProductRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: shopDetailsPageRecommendationsReducer } = ShopDetailsRecommendationsSlice;
