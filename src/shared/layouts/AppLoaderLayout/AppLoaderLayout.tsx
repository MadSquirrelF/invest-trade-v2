/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { MainLayout } from '../MainLayout/MainLayout';
import styles from './AppLoaderLayout.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export const AppLoaderLayout = memo(() => (
    <MainLayout
        header={(
            <HStack max justify="between" className={styles.header}>
                <HStack gap="32">
                    <Skeleton width={40} height={40} border="50%" />
                    <Skeleton width={175} height={30} border="10px" />
                </HStack>
                <HStack gap="32">
                    <Skeleton width={40} height={40} border="10px" />
                    <Skeleton width={40} height={40} border="10px" />
                    <Skeleton width={100} height={40} border="10px" />
                    <Skeleton width={100} height={40} border="10px" />
                </HStack>
            </HStack>
        )}
        content={(
            <VStack max gap="16" justify="start" align="start" className={styles.content}>
                <Skeleton width="20%" height={32} border="10px" />
                <Skeleton width="100%" height="70%" border="20px" />
                <Skeleton width="100%" height="70%" border="20px" />
            </VStack>
        )}
        sidebar={(
            <VStack justify="between" className={styles.sidebar}>
                <VStack gap="32">
                    <Skeleton width={40} height={50} border="10px" />
                    <Skeleton width={40} height={50} border="10px" />
                    <Skeleton width={40} height={50} border="10px" />
                </VStack>

                <VStack gap="32">
                    <Skeleton width={40} height={40} border="10px" />
                    <Skeleton width={40} height={40} border="10px" />
                </VStack>

            </VStack>
        )}
    />
));
