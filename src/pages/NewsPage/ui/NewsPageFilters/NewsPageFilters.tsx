/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import SearchIcon from '@/shared/assets/icons/search-icon.svg';
import styles from './NewsPageFilters.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { useNewsFilters } from '../../lib/hooks/useNewsFilters';
import { NewsSortSelector } from '@/features/NewsSortSelector';
import { NewsOrderViewTabs } from '@/features/NewsOrderViewTabs';

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

    return (
        <HStack max justify="between" gap="32" className={classNames(styles.NewsPageFilters, {}, [className])}>
            <HStack max gap="32" align="center" className={styles.searchBox}>
                <HStack gap="10" align="center" justify="start" className={styles.inputWrapper}>
                    <label
                        htmlFor="news-search"
                        className={styles.iconLabel}
                    >
                        <SearchIcon className={styles.icon} />
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        id="news-search"
                        placeholder="Поиск..."
                        name="news-search"
                        value={search}
                        autoComplete="new-password"
                        onChange={onChangeSearchHandler}
                    />
                </HStack>
                <NewsSortSelector
                    sort={sort}
                    onChangeSort={onChangeSort}
                />
            </HStack>

            <NewsOrderViewTabs
                view={view}
                order={order}
                onChangeView={onChangeView}
                onChangeOrder={onChangeOrder}
            />
        </HStack>
    );
});
