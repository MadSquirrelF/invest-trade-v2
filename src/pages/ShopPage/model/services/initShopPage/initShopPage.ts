import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { OrderType, SortType } from '@/features/FilterContainer';
import { getShopPageInited } from '../../selectors/shopPageSelectors';
import { BrandType, CategoryType } from '@/entities/Product';
import { shopPageActions } from '../../slice/shopPageSlice';
import { fetchProductsList } from '../fetchProductsList/fetchProductsList';

export const initShopPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('shopPage/initShopPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getShopPageInited(getState());

    if (!inited) {
        const orderFromUrl = searchParams.get('order') as OrderType;
        const sortFromUrl = searchParams.get('sort') as SortType;
        const categoryFromUrl = searchParams.get('category') as CategoryType;
        const brandFromUrl = searchParams.get('brand') as BrandType;
        const searchFromUrl = searchParams.get('search');

        if (orderFromUrl) {
            dispatch(shopPageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(shopPageActions.setSort(sortFromUrl));
        }
        if (categoryFromUrl) {
            dispatch(shopPageActions.setCategory(categoryFromUrl));
        }
        if (brandFromUrl) {
            dispatch(shopPageActions.setBrand(brandFromUrl));
        }
        if (searchFromUrl) {
            dispatch(shopPageActions.setSearch(searchFromUrl));
        }

        dispatch(shopPageActions.initState());
        dispatch(fetchProductsList({}));
    }
});
