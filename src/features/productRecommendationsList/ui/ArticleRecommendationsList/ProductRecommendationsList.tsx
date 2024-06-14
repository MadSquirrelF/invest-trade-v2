/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ProductList } from '@/entities/Product';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { VStack } from '@/shared/ui/Stack';
import { useProductRecommendationsList } from '../../api/productRecommendationsApi';
import { ViewType } from '@/features/FilterContainer';
import { Error } from '@/shared/ui/Error/Error';

interface ProductRecommendationsListProps {
    className?: string;
}

export const ProductRecommendationsList = memo((props: ProductRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const { isLoading, data: products, error } = useProductRecommendationsList(3);

    if (isLoading || error || !products) {
        return <Error error="Ошибка получения статьи" />;
    }

    return (
        <VStack max align="start" gap="32" className={classNames('', {}, [className])}>
            <Text gap="0" text="Рекомендации :" bold={TextBold.BOLD} size={TextSize.XL} />
            <ProductList
                products={products}
                isLoading={isLoading}
                view={ViewType.SHORT}
                target="_blank"
            />
        </VStack>
    );
});
