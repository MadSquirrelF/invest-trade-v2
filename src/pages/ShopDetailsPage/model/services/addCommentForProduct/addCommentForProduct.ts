import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductDetailsData } from '@/entities/Product';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchCommentsByProductSlug } from '../fetchCommentsByProductSlug/fetchCommentsByProductSlug';
import { addCommentForProductQuery } from '../../api/commentApi';

export const addCommentForProduct = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
    >(
        'productDetails/addCommentForProduct',
        async (comment, thunkApi) => {
            const {
                dispatch, rejectWithValue, getState,
            } = thunkApi;

            const userData = getUserAuthData(getState());
            const product = getProductDetailsData(getState());

            if (!userData || !comment || !product) {
                return rejectWithValue('no data');
            }

            try {
                await dispatch(addCommentForProductQuery({
                    productId: product._id,
                    comment,
                })).unwrap();

                dispatch(fetchCommentsByProductSlug(product.slug));

                return undefined;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
