import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Product } from '@/entities/Product';
import {
    getShopPageBrand,
    getShopPageCategory,
    getShopPageLimit,
    getShopPageNum,
    getShopPageOrder,
    getShopPageSearch,
    getShopPageSort,
} from '../../selectors/shopPageSelectors';
import { addQueryParams } from '@/shared/lib/addQueryParams/addQueryParams';

interface FetchProductsListProps {
  replace?: boolean;
}

export const fetchProductsList = createAsyncThunk<
    Product[],
    FetchProductsListProps,
    ThunkConfig<string>
>('shopPage/fetchProductsList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const limit = getShopPageLimit(getState());

    const sort = getShopPageSort(getState());

    const category = getShopPageCategory(getState());

    const brand = getShopPageBrand(getState());

    const order = getShopPageOrder(getState());

    const search = getShopPageSearch(getState());

    const page = getShopPageNum(getState());

    try {
        addQueryParams({
            category,
            brand,
            sort,
            order,
            search,
        });
        const response = await extra.api.get<Product[]>('/products', {
            params: {
                _limit: limit,
                _page: page,
                _brand: brand,
                _category: category,
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
