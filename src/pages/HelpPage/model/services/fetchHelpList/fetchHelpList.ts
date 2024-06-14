import { createAsyncThunk } from '@reduxjs/toolkit';
import { Info } from '@/entities/Info';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getHelpPageCategory, getHelpPageSearch } from '../../selectors/helpPageSelectors';
import { addQueryParams } from '@/shared/lib/addQueryParams/addQueryParams';

interface FetchHelpListProps {
  replace?: boolean;
}

export const fetchHelpsList = createAsyncThunk<
    Info[],
    FetchHelpListProps,
    ThunkConfig<string>
>('shopPage/fetchHelpList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const category = getHelpPageCategory(getState());

    const search = getHelpPageSearch(getState());

    try {
        addQueryParams({
            category,
            search,
        });
        const response = await extra.api.get<Info[]>('/info', {
            params: {
                _category: category,
                _searchTerm: search,
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
