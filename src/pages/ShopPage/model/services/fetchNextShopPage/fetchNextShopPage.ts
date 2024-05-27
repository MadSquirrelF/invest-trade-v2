import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getShopPageHasMore, getShopPageIsLoading, getShopPageNum } from '../../selectors/shopPageSelectors';
import { shopPageActions } from '../../slice/shopPageSlice';
import { fetchProductsList } from '../fetchProductsList/fetchProductsList';

export const fetchNextShopPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('shopPage/fetchNextshopPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const hasMore = getShopPageHasMore(getState());

    const page = getShopPageNum(getState());

    const isLoading = getShopPageIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(shopPageActions.setPage(page + 1));
        dispatch(fetchProductsList({}));
    }
});
