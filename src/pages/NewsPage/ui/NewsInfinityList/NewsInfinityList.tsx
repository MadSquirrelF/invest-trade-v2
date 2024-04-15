/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getNews } from '../../model/slice/newsPageSlice';
import { getNewsPageError, getNewsPageIsLoading, getNewsPageView } from '../../model/selectors/newsPageSelectors';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initNewsPage } from '../../model/services/initNewsPage/initNewsPage';
import { Error } from '@/shared/ui/Error/Error';
import { NewList } from '@/entities/new';

interface NewsInfinityListProps {
  className?: string;
}

export const NewsInfinityList = memo(({ className }: NewsInfinityListProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const news = useSelector(getNews.selectAll);

    const isLoading = useSelector(getNewsPageIsLoading);

    const error = useSelector(getNewsPageError);

    const view = useSelector(getNewsPageView);

    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initNewsPage(searchParams));
    });

    if (error) {
        return <Error error="Ошибка загрузки статей" />;
    }

    return (
        <NewList
            isLoading={isLoading}
            view={view}
            news={news}
        />
    );
});
