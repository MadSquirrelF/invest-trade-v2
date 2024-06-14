import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Product } from '@/entities/Product';

export const fetchProductRecommendations = createAsyncThunk<
    Product[],
    void,
    ThunkConfig<string>
    >(
        'articlesDetailsPage/fetchProductRecommendations',
        async (_, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                const response = await extra.api.get<Product[]>('/products/recommendations', {
                    params: {
                        _limit: 4,
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e : any) {
                return rejectWithValue(e.response.data.message);
            }
        },
    );
