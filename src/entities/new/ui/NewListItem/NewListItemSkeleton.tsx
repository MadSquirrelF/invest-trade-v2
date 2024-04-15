/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NewListItem.module.scss';
import { NewView } from '../../model/types/newSchema';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';

interface NewListItemSkeletonProps {
  className?: string;
  view: NewView;
}

export const NewListItemSkeleton = memo(({ view, className }: NewListItemSkeletonProps) => {
    const { t } = useTranslation();

    return (
        <HStack align="start" gap="32" className={classNames(styles.NewListItem, {}, [className, styles[view]])}>

            <VStack max align="start" gap="32" justify="between" className={styles.text}>
                <Skeleton width="100%" height={70} border="10px" />
                <Skeleton width="100%" height={110} border="10px" />
                <Skeleton width="30%" height={30} border="10px" />
            </VStack>

            <HStack gap="16">
                <Skeleton width={45} height={45} border="50%" />
                <Skeleton width={45} height={45} border="50%" />
            </HStack>

        </HStack>

    );
});
