import { createAsyncThunk } from '@reduxjs/toolkit';
import { New } from '../types/newSchema';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchNewById = createAsyncThunk<
    New,
    string | undefined,
    ThunkConfig<string>
>('newDetails/fetchNewById', async (newId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!newId) {
        throw new Error('ID статьи не найден');
    }

    try {
        const response = await extra.api.get<New>(
            `/news/details/${newId}`,
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e : any) {
        return rejectWithValue(e.response.data.message);
    }
});
