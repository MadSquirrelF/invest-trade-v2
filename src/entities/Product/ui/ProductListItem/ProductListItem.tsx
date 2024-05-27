/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable i18next/no-literal-string */
import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProductListItem.module.scss';
import { ViewType } from '@/features/FilterContainer';
import { BrandType, Product } from '../../model/types/productSchema';
import { HStack, VStack } from '@/shared/ui/Stack';
import {
    Text, TextAlign, TextBold, TextSize,
} from '@/shared/ui/Text/Text';
import FavoriteIcon from '@/shared/assets/icons/favorite-icon.svg';
import ShareIcon from '@/shared/assets/icons/share-icon.svg';
import ArrowRight from '@/shared/assets/icons/arrow-right.svg';
import { convertDate } from '@/shared/lib/convertDate/convertDate';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteMain } from '@/shared/const/router';
import SchternLogo from '@/shared/assets/images/Schtern.svg';
import MacoLogo from '@/shared/assets/images/MACO.svg';
import RingerLogo from '@/shared/assets/images/RINGER.svg';

interface ProductListItemProps {
  className?: string;
  product: Product;
  view: ViewType;
  target?: HTMLAttributeAnchorTarget;
}

export const ProductListItem = memo((props: ProductListItemProps) => {
    const { t } = useTranslation();

    const {
        className, product, view, target,
    } = props;

    const renderBrand = useCallback(
        (brand: BrandType) => {
            switch (brand) {
            case BrandType.RINGER:
                return <RingerLogo className={styles.brandLogo} />;
            case BrandType.SCHTERN:
                return <SchternLogo className={styles.brandLogo} />;
            case BrandType.MACO:
                return <MacoLogo className={styles.brandLogo} />;
            }
        },
        [],
    );

    if (view === ViewType.FULL) {
        return (
            <HStack
                gap="32"
                align="start"
                className={classNames(styles.ProductListItem, {}, [className, styles[view]])}
            >
                <img
                    src={`${__API_IMAGE__}${product.poster}`}
                    alt={product.title}
                    title={product.title}
                    height="100%"
                    width="450px"
                    className={styles.image}
                    draggable={false}
                />
                <VStack align="start" gap="32" justify="between" className={styles.text}>
                    <Text
                        title={product.title}
                        align={TextAlign.LEFT}
                        text={product.description}
                        gap="16"
                        bold={TextBold.BOLD}
                        size={TextSize.XL}
                    />
                    <Text
                        text={convertDate(product.createdAt)}
                        gap="0"
                        className={styles.date}
                        align={TextAlign.LEFT}
                        bold={TextBold.BOLD}
                        size={TextSize.L}
                    />
                </VStack>

                <HStack gap="16">
                    <Button type="button" theme={ThemeButton.SVG_CIRCLE} className={styles.btn}>
                        <ShareIcon />
                    </Button>
                    <Button type="button" theme={ThemeButton.SVG_CIRCLE} className={styles.btn}>
                        <AppLink
                            target={target}
                            to={getRouteMain()}
                        >
                            <ArrowRight className={styles.btnIcon} />
                        </AppLink>
                    </Button>
                </HStack>
            </HStack>
        );
    }

    return (
        <VStack
            gap="0"
            align="start"
            justify="between"
            className={classNames(styles.ProductListItem, {}, [className, styles[view]])}
        >
            <HStack className={styles.favoriteContainer}>
                <Button theme={ThemeButton.SVG_CIRCLE}>
                    <FavoriteIcon />
                </Button>
            </HStack>

            <HStack justify="center" align="center" className={styles.brandContainer}>
                {renderBrand(product.brand)}
            </HStack>
            <HStack max justify="center" align="center" className={styles.imageContainer}>
                <img
                    src={`${__API_IMAGE__}${product.poster}`}
                    alt={product.title}
                    title={product.title}
                    height="20%"
                    width="100%"
                    className={styles.poster}
                    draggable={false}
                />
            </HStack>

            <VStack align="start" gap="32" justify="start" className={styles.content}>
                <Text
                    title={product.title}
                    align={TextAlign.LEFT}
                    text={product.category}
                    gap="8"
                    bold={TextBold.BOLD}
                    size={TextSize.M}
                />
                <Text
                    align={TextAlign.LEFT}
                    text={product.description}
                    gap="8"
                    bold={TextBold.BOLD}
                    size={TextSize.M}
                />

                <HStack max justify="between" align="center">
                    <VStack gap="4" align="start">
                        <Text
                            align={TextAlign.LEFT}
                            text={t('Цена :')}
                            bold={TextBold.MEDIUM}
                            size={TextSize.M}
                            gap="0"
                        />
                        <Text
                            align={TextAlign.LEFT}
                            text={`${String(product.price)} руб`}
                            bold={TextBold.BOLD}
                            size={TextSize.XL}
                            gap="0"
                        />
                    </VStack>

                    <Button theme={ThemeButton.DEFAULT}>
                        {t('В корзину')}
                    </Button>
                </HStack>
            </VStack>
        </VStack>
    );
});
