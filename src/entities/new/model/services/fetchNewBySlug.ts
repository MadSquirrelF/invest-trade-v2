import { createAsyncThunk } from '@reduxjs/toolkit';
import { New } from '../types/newSchema';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchNewBySlug = createAsyncThunk<
    New,
    string | undefined,
    ThunkConfig<string>
>('newDetails/fetchNewBySlug', async (newSlug, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!newSlug) {
        throw new Error('SLUG статьи не найден');
    }

    try {
        const response = await extra.api.get<New>(
            `/news/by-slug/${newSlug}`,
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e : any) {
        return rejectWithValue(e.response.data.message);
    }
});
