/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProductListItem.module.scss';
import { ViewType } from '@/features/FilterContainer';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface ProductsListItemSkeletonProps {
  className?: string;
  view: ViewType;
}

export const ProductsListItemSkeleton = memo(({ className, view }: ProductsListItemSkeletonProps) => {
    const { t } = useTranslation();
    return (
        <VStack
            gap="0"
            align="start"
            justify="between"
            className={classNames(styles.ProductListItem, {}, [className, styles[view]])}
        >

            <Skeleton width="100px" height="50px" className={styles.brandContainer} />

            <HStack max justify="center" align="center" className={styles.imageContainer}>
                <Skeleton width="100%" height="250px" border="20px" />
            </HStack>

            <VStack align="start" gap="32" justify="start" className={styles.content}>
                <VStack max align="start" gap="10">
                    <Skeleton width="50%" height="20px" border="20px" />
                    <Skeleton width="20%" height="10px" border="20px" />
                </VStack>

                <Skeleton width="100%" height="60px" border="20px" />

                <HStack max justify="between" align="center">
                    <VStack max gap="10" align="start">
                        <Skeleton width="20%" height="10px" border="20px" />
                        <Skeleton width="40%" height="20px" border="20px" />
                    </VStack>

                    <Skeleton width="200px" height="40px" border="10px" />
                </HStack>
            </VStack>
        </VStack>
    );
});
