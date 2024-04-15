/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';

import { useCallback } from 'react';
import { Page } from '@/widgets/Page';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { newsPageReducer } from '../../model/slice/newsPageSlice';
import styles from './NewsPage.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchNextNewsPage } from '../../model/services/fetchNextNewsPage/fetchNextNewsPage';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { NewsInfinityList } from '../NewsInfinityList/NewsInfinityList';
import { NewsPageFilters } from '../NewsPageFilters/NewsPageFilters';

const reducers: ReducerList = {
    newsPage: newsPageReducer,
};

interface NewsPageProps {
    className?: string;
}

const NewsPage = (props: NewsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('news');

    const dispatch = useAppDispatch();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextNewsPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(styles.NewsPage, {}, [className])}
            >
                <Breadcrumbs />

                <NewsPageFilters />

                <Text title={t('Все новости')} gap="0" size={TextSize.XL} className={styles.title} />

                <NewsInfinityList />

            </Page>
        </DynamicModuleLoader>
    );
};

export default NewsPage;
