import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { CategoryInfoType } from '@/entities/Info';
import { helpPageActions } from '../../model/slice/helpPageSlice';
import { fetchHelpsList } from '../../model/services/fetchHelpList/fetchHelpList';
import { getHelpPageCategory, getHelpPageSearch } from '../../model/selectors/helpPageSelectors';

export function useHelpFilters() {
    const search = useSelector(getHelpPageSearch);

    const category = useSelector(getHelpPageCategory);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchHelpsList({ replace: true }));
    }, [dispatch]);

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(helpPageActions.setSearch(search));
        },
        [dispatch],
    );

    const handleSearch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    const onChangeCategory = useCallback(
        (category: CategoryInfoType) => {
            dispatch(helpPageActions.setCategory(category));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return {
        category,
        search,
        handleSearch,
        onChangeCategory,
        onChangeSearch,
    };
}
