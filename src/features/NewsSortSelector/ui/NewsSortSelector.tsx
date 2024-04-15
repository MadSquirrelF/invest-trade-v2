/* eslint-disable i18next/no-literal-string */
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NewsSortSelector.module.scss';
import { ListBox, ThemeListBox } from '@/shared/ui/ListBox/ListBox';
import { NewSortField } from '@/entities/new';
import { SelectOption } from '@/shared/ui/Select/Select';

interface NewsSortSelectorProps {
  className?: string;
  sort: NewSortField;
  onChangeSort: (newSort: NewSortField) => void
}

export const NewsSortSelector = memo(({ className, sort, onChangeSort }: NewsSortSelectorProps) => {
    const { t } = useTranslation();

    const sortFieldOptions = useMemo<SelectOption<NewSortField>[]>(
        () => [
            {
                value: NewSortField.CREATED,
                content: t('Дата создания'),
            },
            {
                value: NewSortField.TITLE,
                content: t('Название'),
            },
            {
                value: NewSortField.VIEWS,
                content: t('Просмотры'),
            },
        ],
        [t],
    );

    return (
        <div className={classNames(styles.NewsSortSelector, {}, [className])}>
            <ListBox
                items={sortFieldOptions}
                value={sort}
                theme={ThemeListBox.CLEAR}
                readonly={false}
                defaultValue={t('Сортировать по')}
                onChange={onChangeSort}
            />
        </div>
    );
});
