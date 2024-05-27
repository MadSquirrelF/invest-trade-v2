/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable i18next/no-literal-string */
import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProductList.module.scss';
import { ViewType } from '@/features/FilterContainer';
import { Product } from '../../model/types/productSchema';
import { ProductListItem } from '../ProductListItem/ProductListItem';
import { ProductsListItemSkeleton } from './ProductsListItemSkeleton';
import { Theme } from '@/shared/const/theme';
import NotFoundDataImageLight from '@/shared/assets/images/not_found_data_light.svg';
import NotFoundDataImageDark from '@/shared/assets/images/not_found_data_dark.svg';
import { useTheme } from '@/app/providers/ThemeProvider';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';

interface ProductListProps {
  className?: string;
  isLoading: boolean;
  view?: ViewType;
  products: Product[];
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ViewType) => new Array(view === ViewType.SHORT ? 3 : 1)
    .fill(0)
    .map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ProductsListItemSkeleton className={styles.card} key={index} view={view} />
    ));

export const ProductList = memo((props: ProductListProps) => {
    const { t } = useTranslation();

    const { theme } = useTheme();

    const {
        className,
        isLoading,
        view = ViewType.SHORT,
        products,
        target,
    } = props;

    const renderImage = useCallback(
        (theme: Theme) => {
            switch (theme) {
            case Theme.LIGHT:
                return <NotFoundDataImageLight className={styles.NotFound} />;

            case Theme.DARK:
                return <NotFoundDataImageDark className={styles.NotFound} />;
            }
        },
        [],
    );

    const renderProduct = (productItem: Product) => (
        <ProductListItem
            product={productItem}
            view={view}
            key={productItem._id}
            target={target}
        />
    );

    return (
        <div className={classNames(styles.ProductList, {}, [className])}>
            {products.length > 0 ? products.map(renderProduct) : (
                <HStack max justify="start" align="center">
                    {renderImage(theme)}
                    <Text
                        gap="16"
                        bold={TextBold.BOLD}
                        size={TextSize.XL}
                        title="Данный товар не найден"
                        text="Попробуйте выбрать альтернативный
                     товар в нашем ассортименте или обратитесь к нашему менеджеру"
                        className={styles.text}
                    />
                </HStack>
            )}
            {isLoading && getSkeletons(view)}
        </div>
    );
});
