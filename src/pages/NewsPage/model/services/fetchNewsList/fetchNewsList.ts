import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { New } from '@/entities/new';
import { addQueryParams } from '@/shared/lib/addQueryParams/addQueryParams';
import {
    getNewsPageLimit, getNewsPageNum, getNewsPageOrder, getNewsPageSearch, getNewsPageSort,
} from '../../selectors/newsPageSelectors';

interface FetchNewsListProps {
  replace?: boolean;
}

export const fetchNewsList = createAsyncThunk<
    New[],
    FetchNewsListProps,
    ThunkConfig<string>
>('newsPage/fetchNewsList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const limit = getNewsPageLimit(getState());

    const sort = getNewsPageSort(getState());

    const order = getNewsPageOrder(getState());

    const search = getNewsPageSearch(getState());

    const page = getNewsPageNum(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
        });
        const response = await extra.api.get<New[]>('/news', {
            params: {
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
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
