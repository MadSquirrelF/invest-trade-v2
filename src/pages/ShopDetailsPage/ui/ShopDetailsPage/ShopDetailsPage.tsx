/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ShopDetailsPage.module.scss';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { ProductDetails } from '@/entities/Product';
import { shopDetailsPageReducer } from '../../model/slices';
import { VStack } from '@/shared/ui/Stack';
import { ProductRecommendationsList } from '@/features/productRecommendationsList';
import { ShopDetailsComments } from '../ShopDetailsComments/ShopDetailsComments';

const reducers: ReducerList = {
    shopDetailsPage: shopDetailsPageReducer,
};

const ShopDetailsPage = () => {
    const { t } = useTranslation();

    const { slug } = useParams<{slug: string}>();

    if (!slug) {
        return (
            <div className={classNames(styles.ArticleDetailsPage, {}, [])}>
                {t('Товар не найдена')}
            </div>
        );
    }

    return (

        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page>
                <VStack max gap="32" className={classNames(styles.ShopDetailsPage, {}, [])}>
                    <Breadcrumbs />
                    <ProductDetails slug={slug} />
                    <ShopDetailsComments slug={slug} />
                    <ProductRecommendationsList />
                </VStack>
            </Page>
        </DynamicModuleLoader>

    );
};

export default ShopDetailsPage;
