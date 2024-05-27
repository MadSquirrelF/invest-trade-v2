/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable i18next/no-literal-string */
import { ChangeEventHandler, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './FilterSearchBox.module.scss';
import { HStack } from '@/shared/ui/Stack';
import SearchIcon from '@/shared/assets/icons/search-icon.svg';
import { ListBox, ThemeListBox } from '@/shared/ui/ListBox/ListBox';
import { SelectOption } from '@/shared/ui/Select/Select';
import { SortType } from '../../model/types';

interface FilterSearchBoxProps {
  className?: string;
  id: string;
  searchValue: string;
  onChangeSearchBox: ChangeEventHandler<HTMLInputElement>;
  sort: SortType;
  onChangeSort: (value: SortType) => void;
  sortFieldOptions: SelectOption<SortType>[]
}

export const FilterSearchBox = memo((props: FilterSearchBoxProps) => {
    const { t } = useTranslation();

    const {
        className,
        id,
        sort,
        onChangeSort,
        sortFieldOptions,
        searchValue,
        onChangeSearchBox,
    } = props;

    return (
        <HStack max gap="32" align="center" className={classNames(styles.FilterSearchBox, {}, [className])}>
            <HStack gap="10" align="center" justify="start" className={styles.inputWrapper}>
                <label
                    htmlFor={id}
                    className={styles.iconLabel}
                >
                    <SearchIcon className={styles.icon} />
                </label>

                <input
                    type="text"
                    className={styles.input}
                    id={id}
                    placeholder="Поиск..."
                    name={id}
                    value={searchValue}
                    autoComplete="new-password"
                    onChange={onChangeSearchBox}
                />
            </HStack>
            <ListBox
                items={sortFieldOptions}
                value={sort}
                theme={ThemeListBox.CLEAR}
                readonly={false}
                defaultValue={t('Сортировать по')}
                onChange={onChangeSort}
            />
        </HStack>
    );
});
