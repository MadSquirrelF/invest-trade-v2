/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Error } from '@/shared/ui/Error/Error';
import { getProducts } from '../../model/slice/shopPageSlice';
import { getShopPageError, getShopPageIsLoading, getShopPageView } from '../../model/selectors/shopPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProductList } from '@/entities/Product';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initShopPage } from '../../model/services/initShopPage/initShopPage';

interface ShopInfinityListProps {
  className?: string;
}

export const ShopInfinityList = memo(({ className }: ShopInfinityListProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const products = useSelector(getProducts.selectAll);

    const isLoading = useSelector(getShopPageIsLoading);

    const error = useSelector(getShopPageError);

    const view = useSelector(getShopPageView);

    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initShopPage(searchParams));
    });

    if (error) {
        return <Error error="Ошибка загрузки товаров" />;
    }

    return (
        <ProductList
            isLoading={isLoading}
            view={view}
            products={products}
        />
    );
});
