import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    getShopPageBrand,
    getShopPageCategory,
    getShopPageOrder,
    getShopPageSearch,
    getShopPageSort,
    getShopPageView,
} from '../../model/selectors/shopPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProductsList } from '../../model/services/fetchProductsList/fetchProductsList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { OrderType, SortType, ViewType } from '@/features/FilterContainer';
import { shopPageActions } from '../../model/slice/shopPageSlice';
import { BrandType, CategoryType } from '@/entities/Product';

export function useShopFilters() {
    const view = useSelector(getShopPageView);
    const sort = useSelector(getShopPageSort);
    const order = useSelector(getShopPageOrder);
    const search = useSelector(getShopPageSearch);
    const brand = useSelector(getShopPageBrand);
    const category = useSelector(getShopPageCategory);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchProductsList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ViewType) => {
            dispatch(shopPageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (shopSort: SortType) => {
            dispatch(shopPageActions.setSort(shopSort));
            dispatch(shopPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (shopOrder: OrderType) => {
            dispatch(shopPageActions.setOrder(shopOrder));
            dispatch(shopPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(shopPageActions.setSearch(search));
            dispatch(shopPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeBrand = useCallback(
        (brand: BrandType) => {
            dispatch(shopPageActions.setBrand(brand));
            dispatch(shopPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeCategory = useCallback(
        (category: CategoryType) => {
            dispatch(shopPageActions.setCategory(category));
            dispatch(shopPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    return {
        view,
        sort,
        order,
        search,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeCategory,
        onChangeBrand,
        brand,
        category,
    };
}
