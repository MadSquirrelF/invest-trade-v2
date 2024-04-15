import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getNewsPageHasMore, getNewsPageIsLoading, getNewsPageNum } from '../../selectors/newsPageSelectors';
import { newsPageActions } from '../../slice/newsPageSlice';
import { fetchNewsList } from '../fetchNewsList/fetchNewsList';

export const fetchNextNewsPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('newsPage/fetchNextnewsPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const hasMore = getNewsPageHasMore(getState());

    const page = getNewsPageNum(getState());

    const isLoading = getNewsPageIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(newsPageActions.setPage(page + 1));
        dispatch(fetchNewsList({}));
    }
});
