/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable i18next/no-literal-string */
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FilterContainer,
    SortType,
} from '@/features/FilterContainer';
import { useShopFilters } from '../../lib/hooks/useShopFilters';
import { SelectOption } from '@/shared/ui/Select/Select';
import {
    BrandList, CategoryList,
} from '@/entities/Product';

interface ShopPageFiltersProps {
  className?: string;
}

export const ShopPageFilters = memo(({ className }: ShopPageFiltersProps) => {
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
        onChangeBrand,
        brand,
        onChangeCategory,
        category,
    } = useShopFilters();

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
            id="shop-search"
            searchValue={search}
            onChangeSearchBox={onChangeSearchHandler}
            sort={sort}
            onChangeSort={onChangeSort}
            sortFieldOptions={sortFieldOptions}
            view={view}
            order={order}
            onViewClick={onChangeView}
            onOrderClick={onChangeOrder}
            categories={CategoryList}
            brands={BrandList}
            isTabs
            onChangeCategory={onChangeCategory}
            onChangeBrand={onChangeBrand}
            brand={brand}
            category={category}
        />
    );
});
