import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getNewsPageInited } from '../../selectors/newsPageSelectors';
import { newsPageActions } from '../../slice/newsPageSlice';
import { fetchNewsList } from '../fetchNewsList/fetchNewsList';
import { OrderType, SortType } from '@/features/FilterContainer';

export const initNewsPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('newsPage/initNewsPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getNewsPageInited(getState());

    if (!inited) {
        const orderFromUrl = searchParams.get('order') as OrderType;
        const sortFromUrl = searchParams.get('sort') as SortType;
        const searchFromUrl = searchParams.get('search');

        if (orderFromUrl) {
            dispatch(newsPageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(newsPageActions.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(newsPageActions.setSearch(searchFromUrl));
        }

        dispatch(newsPageActions.initState());
        dispatch(fetchNewsList({}));
    }
});
