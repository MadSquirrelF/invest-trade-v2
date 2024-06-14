import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/productSchema';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchProductBySlug = createAsyncThunk<
    Product,
    string,
    ThunkConfig<string>
    >(
        'productDetails/fetchProductBySlug',
        async (productSlug, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                const response = await extra.api.get<Product>(`/products/by-slug/${productSlug}`);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e : any) {
                return rejectWithValue(e.response.data.message);
            }
        },
    );
