import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { IComment } from '@/entities/Comment';

export const fetchCommentsByProductSlug = createAsyncThunk<
    IComment[],
    string | undefined,
    ThunkConfig<string>
    >(
        'productDetails/fetchCommentsByProductSlug',
        async (slug, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            if (!slug) {
                return rejectWithValue('error');
            }

            try {
                const response = await extra.api.get<IComment[]>(`/comments/${slug}`);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e : any) {
                return rejectWithValue(e.response.data.message);
            }
        },
    );
