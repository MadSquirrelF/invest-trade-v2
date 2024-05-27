import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NewList.module.scss';
import { New } from '../../model/types/newSchema';
import { NewListItem } from '../NewListItem/NewListItem';
import { NewListItemSkeleton } from '../NewListItem/NewListItemSkeleton';
import { ViewType } from '@/features/FilterContainer';

interface NewProps {
    className?: string;
    news: New[];
    isLoading: boolean;
    view?: ViewType;
    target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ViewType) => new Array(view === ViewType.SHORT ? 3 : 1)
    .fill(0)
    .map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <NewListItemSkeleton className={styles.card} key={index} view={view} />
    ));

export const NewList = memo((props: NewProps) => {
    const {
        className,
        news,
        isLoading,
        view = ViewType.SHORT,
        target,
    } = props;

    const { t } = useTranslation();

    const renderNew = (newItem: New) => (
        <NewListItem
            newItem={newItem}
            view={view}
            className={styles.card}
            key={newItem._id}
            target={target}
        />
    );

    return (
        <div className={classNames(styles.NewList, {}, [className])}>
            {news.length > 0 ? news.map(renderNew) : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
});
