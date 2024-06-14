import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { fetchCommentsByProductSlug } from '../fetchCommentsByProductSlug/fetchCommentsByProductSlug';
import { getProductDetailsData } from '@/entities/Product';
import { addLikeForCommentMutation } from '../../api/commentApi';

export const addLikeForComment = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
    >(
        'productDetails/addLikeForComment',
        async (productId, thunkApi) => {
            const {
                dispatch, rejectWithValue, getState,
            } = thunkApi;

            const product = getProductDetailsData(getState());

            if (!productId || !product) {
                return rejectWithValue('no data');
            }

            try {
                await dispatch(addLikeForCommentMutation(productId)).unwrap();

                dispatch(fetchCommentsByProductSlug(product.slug));

                return undefined;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
