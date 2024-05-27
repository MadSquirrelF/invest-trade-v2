/* eslint-disable i18next/no-literal-string */
import { ChangeEventHandler, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './FilterContainer.module.scss';
import { FilterSearchBox } from '../FilterSearchBox/FilterSearchBox';
import { SelectOption } from '@/shared/ui/Select/Select';
import { HStack, VStack } from '@/shared/ui/Stack';
import { FilterSort } from '../FilterSort/FilterSort';
import { FilterTabs } from '../FilterTabs/FilterTabs';
import { OrderType, SortType, ViewType } from '../../model/types';
import { BrandType, CategoryType, ITabs } from '@/entities/Product';

interface FilterContainerProps {
  className?: string;
  id: string;
  searchValue: string;
  onChangeSearchBox: ChangeEventHandler<HTMLInputElement>;
  sort: SortType;
  onChangeSort: (value: SortType) => void;
  sortFieldOptions: SelectOption<SortType>[]
  view: ViewType;
  order: OrderType;
  onViewClick: (value: ViewType) => void;
  onOrderClick: (value: OrderType) => void;
  onChangeCategory?: (category: CategoryType) => void;
  onChangeBrand?: (brand: BrandType) => void;
  isTabs?: boolean;
  categories?: ITabs[];
  brands?: ITabs[];
  brand?: string;
  category?: string;
}

export const FilterContainer = memo((props: FilterContainerProps) => {
    const { t } = useTranslation();

    const {
        className,
        id,
        isTabs,
        sort,
        onChangeSort,
        sortFieldOptions,
        searchValue,
        onChangeSearchBox,
        onViewClick,
        onOrderClick,
        view,
        order,
        categories,
        brands,
        brand,
        category,
        onChangeCategory,
        onChangeBrand,
    } = props;

    const onBrandClick = useCallback((tab: ITabs) => {
        onChangeBrand?.(tab.value as BrandType);
    }, [onChangeBrand]);

    const onCategoryClick = useCallback((tab: ITabs) => {
        onChangeCategory?.(tab.value as CategoryType);
    }, [onChangeCategory]);

    return (
        <VStack max gap="16" className={classNames(styles.FilterContainer, {}, [className])}>
            <HStack max gap="32" justify="between">
                <FilterSearchBox
                    id={id}
                    sort={sort}
                    onChangeSearchBox={onChangeSearchBox}
                    onChangeSort={onChangeSort}
                    searchValue={searchValue}
                    sortFieldOptions={sortFieldOptions}
                />

                <FilterSort
                    onChangeOrder={onOrderClick}
                    onChangeView={onViewClick}
                    view={view}
                    order={order}
                />
            </HStack>
            {isTabs && (
                <FilterTabs
                    categories={categories}
                    brands={brands}
                    brandValue={brand}
                    categoryValue={category}
                    onCategoryClick={onCategoryClick}
                    onBrandClick={onBrandClick}
                />
            )}

        </VStack>
    );
});
