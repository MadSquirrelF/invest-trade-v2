import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    getNewsPageOrder, getNewsPageSearch, getNewsPageSort, getNewsPageView,
} from '../../model/selectors/newsPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchNewsList } from '../../model/services/fetchNewsList/fetchNewsList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { NewOrder, NewSortField, NewView } from '@/entities/new';
import { newsPageActions } from '../../model/slice/newsPageSlice';

export function useNewsFilters() {
    const view = useSelector(getNewsPageView);
    const sort = useSelector(getNewsPageSort);
    const order = useSelector(getNewsPageOrder);
    const search = useSelector(getNewsPageSearch);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchNewsList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: NewView) => {
            dispatch(newsPageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: NewSortField) => {
            dispatch(newsPageActions.setSort(newSort));
            dispatch(newsPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: NewOrder) => {
            dispatch(newsPageActions.setOrder(newOrder));
            dispatch(newsPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(newsPageActions.setSearch(search));
            dispatch(newsPageActions.setPage(1));
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
    };
}
