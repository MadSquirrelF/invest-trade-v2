/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable i18next/no-literal-string */
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNewsFilters } from '../../lib/hooks/useNewsFilters';
import { FilterContainer, SortType } from '@/features/FilterContainer';
import { SelectOption } from '@/shared/ui/Select/Select';

interface NewsPageFiltersProps {
  className?: string;
}

export const NewsPageFilters = memo(({ className }: NewsPageFiltersProps) => {
    const { t } = useTranslation();
    const {
        onChangeSort,
        sort,
        onChangeSearch,
        search,
        onChangeView,
        view,
        onChangeOrder,
        order,
    } = useNewsFilters();

    const onChangeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeSearch?.(e.target.value);
    };

    const sortFieldOptions = useMemo<SelectOption<SortType>[]>(
        () => [
            {
                value: SortType.CREATED,
                content: t('Дата создания'),
            },
            {
                value: SortType.TITLE,
                content: t('Название'),
            },
            {
                value: SortType.VIEWS,
                content: t('Просмотры'),
            },
        ],
        [t],
    );

    return (
        <FilterContainer
            id="news-search"
            searchValue={search}
            onChangeSearchBox={onChangeSearchHandler}
            sort={sort}
            onChangeSort={onChangeSort}
            sortFieldOptions={sortFieldOptions}
            view={view}
            order={order}
            onViewClick={onChangeView}
            onOrderClick={onChangeOrder}
            isTabs={false}
        />
    );
});
