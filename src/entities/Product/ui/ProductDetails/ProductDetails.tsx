/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getProductDetailsData,
    getProductDetailsError,
    getProductDetailsIsLoading,
} from '../../model/selectors/productDetails';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { productDetailsReducer } from '../../model/slice/productDetailsSlice';
import {
    Text, TextAlign, TextBold, TextSize,
} from '@/shared/ui/Text/Text';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchProductBySlug } from '../../model/services/fetchProductById/fetchProductById';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Stars } from '@/shared/ui/Stars/Stars';
import styles from './ProductDetails.module.scss';
import EyeIcon from '@/shared/assets/icons/icon-opened-eye.svg';
import DoneIcon from '@/shared/assets/icons/done.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import CartIcon from '@/shared/assets/icons/cart-icon.svg';
import { BrandType } from '../../model/types/productSchema';
import SchternLogo from '@/shared/assets/images/Schtern.svg';
import MacoLogo from '@/shared/assets/images/MACO.svg';
import RingerLogo from '@/shared/assets/images/RINGER.svg';
import ShareIcon from '@/shared/assets/icons/share-icon.svg';
import FavoriteIcon from '@/shared/assets/icons/favorite-icon.svg';
import PriceIcon from '@/shared/assets/icons/cost-icon.svg';
import BgWave from '@/shared/assets/images/bg-wave.svg';
import StarRatingImage from '@/shared/assets/images/Star-rating.svg';
import { Counter } from '@/shared/ui/Counter/Counter';

interface ProductDetailsProps {
  className?: string;
  slug: string;
}

const reducers: ReducerList = {
    productDetails: productDetailsReducer,
};

export const ProductDetails = memo((props: ProductDetailsProps) => {
    const { t } = useTranslation();

    const { className, slug } = props;

    const dispatch = useAppDispatch();

    const isLoading = useSelector(getProductDetailsIsLoading);
    const product = useSelector(getProductDetailsData);
    const error = useSelector(getProductDetailsError);

    useInitialEffect(() => dispatch(fetchProductBySlug(slug)));

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

    return (

        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>

            <HStack max gap="50" align="start">

                <VStack gap="32">
                    <HStack className={styles.posterContainer}>
                        <HStack justify="center" align="center" className={styles.brandContainer}>
                            {product?.brand ? renderBrand(product?.brand) : null}
                        </HStack>
                        <img
                            src={`${__API_IMAGE__}${product?.poster}`}
                            alt={product?.slug}
                            draggable={false}
                            width={600}
                            height={600}
                            className={styles.poster}
                        />
                    </HStack>
                    <VStack max align="center" justify="center" gap="32" className={styles.ratingCard}>

                        <BgWave className={styles.bgWave} />

                        <VStack justify="center" align="center" className={styles.iconContainer}>
                            <StarRatingImage className={styles.starIcon} />
                        </VStack>

                        <Text
                            gap="0"
                            align={TextAlign.CENTER}
                            size={TextSize.L}
                            text="Как бы вы оценили данный товар?"
                        />

                        <Stars size={50} rating={0} isRating />

                        <VStack max gap="16">
                            <Button disabled theme={ThemeButton.DEFAULT} className={styles.ratingBtn}>
                                Оценить
                            </Button>

                            <Button theme={ThemeButton.CLEAR} className={styles.cancelBtn}>
                                Нет, спасибо!
                            </Button>
                        </VStack>

                    </VStack>
                </VStack>

                <VStack max gap="32" align="start">
                    <HStack max gap="32" justify="between">
                        <Text
                            title={product?.title}
                            gap="0"
                            size={TextSize.XXL}
                            bold={TextBold.BOLD}
                        />

                        <HStack gap="8">

                            <PriceIcon className={styles.priceIcon} />
                            <Text
                                gap="16"
                                text={`${String(product?.price)} руб`}
                                bold={TextBold.BOLD}
                                size={TextSize.XXL}
                            />
                        </HStack>

                    </HStack>

                    <HStack max justify="start" gap="32" className={styles.border}>
                        <Stars size={30} isRating={false} rating={product?.rating || 0} />
                        <HStack gap="8">
                            <EyeIcon className={styles.eyeIcon} />
                            <Text
                                gap="0"
                                text={String(product?.view_count)}
                                size={TextSize.XXL}
                                bold={TextBold.BOLD}
                            />
                        </HStack>
                        <HStack gap="8">
                            <DoneIcon
                                className={classNames(
                                    styles.availableIcon,
                                    { [styles.available]: product?.is_available },
                                    [],
                                )}
                            />
                            <Text
                                gap="0"
                                text={product?.is_available ? 'В наличии' : 'Нет в наличии'}
                                size={TextSize.L}
                                bold={TextBold.BOLD}
                            />
                        </HStack>
                    </HStack>

                    <HStack max gap="16" justify="start">
                        <Counter />
                        <Button theme={ThemeButton.DEFAULT} className={styles.buyNow}>
                            Купить сейчас
                        </Button>
                        <Button theme={ThemeButton.OUTLINE}>
                            <CartIcon />
                            Добавить в корзину
                        </Button>

                        <Button type="button" theme={ThemeButton.SVG_CIRCLE} className={styles.btn}>
                            <FavoriteIcon />
                        </Button>
                        <Button type="button" theme={ThemeButton.SVG_CIRCLE} className={styles.btn}>
                            <ShareIcon />
                        </Button>
                    </HStack>

                    <Text gap="16" title="Описание товара :" text={product?.description} size={TextSize.XL} />

                    <VStack max align="start" gap="32">
                        <Text gap="0" text="Характеристики :" bold={TextBold.BOLD} size={TextSize.XL} />

                        <VStack max gap="16" className={styles.details}>
                            {
                                product?.details.map((item, index) => (
                                    <HStack key={index} max justify="between">
                                        <Text gap="0" isActive text={item.name} size={TextSize.XL} />
                                        <Text gap="0" text={item.value} size={TextSize.XL} />
                                    </HStack>
                                ))
                            }
                        </VStack>

                    </VStack>

                </VStack>

            </HStack>

        </DynamicModuleLoader>

    );
});
