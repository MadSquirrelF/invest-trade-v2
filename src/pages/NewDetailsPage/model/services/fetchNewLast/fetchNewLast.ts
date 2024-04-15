import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { New, NewOrder, NewSortField } from '@/entities/new';

export const fetchNewLast = createAsyncThunk<
    New[],
    number,
    ThunkConfig<string>
>('newDetailsPage/fetchNewLast', async (limit, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<New[]>('/news', {
            params: {
                _limit: limit,
                _order: NewOrder.DESC,
                _sort: NewSortField.CREATED,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e : any) {
        return rejectWithValue(e.response.data.message);
    }
});
