/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { Page } from '@/widgets/Page';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { ShopPageFilters } from '../ShopPageFilters/ShopPageFilters';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { shopPageReducer } from '../../model/slice/shopPageSlice';
import { ShopInfinityList } from '../ShopInfinityList/ShopInfinityList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchNextShopPage } from '../../model/services/fetchNextShopPage/fetchNextShopPage';
import styles from './ShopPage.module.scss';

const reducers: ReducerList = {
    shopPage: shopPageReducer,
};

const ShopPage = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextShopPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPart}>
                <Breadcrumbs />

                <ShopPageFilters />

                <Text title={t('Все товары')} gap="0" size={TextSize.XL} className={styles.text} />

                <ShopInfinityList />
            </Page>
        </DynamicModuleLoader>

    );
};

export default ShopPage;
