import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { New } from '@/entities/new';
import { OrderType, SortType } from '@/features/FilterContainer';

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
                _order: OrderType.DESC,
                _sort: SortType.CREATED,
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
