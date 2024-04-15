/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProfileProgress.module.scss';
import { Text } from '@/shared/ui/Text/Text';
import { VStack } from '@/shared/ui/Stack';
import { CircleProgressBar } from '@/shared/ui/CircleProgressBar/CircleProgressBar';

interface ProfileProgressProps {
  className?: string;
}

export const ProfileProgress = memo(({ className }: ProfileProgressProps) => {
    const { t } = useTranslation();
    return (
        <VStack max gap="32" className={classNames(styles.ProfileProgress, {}, [className, 'block'])}>
            <Text title={t('Заполните свой профиль')} gap="0" />

            <CircleProgressBar
                percentage={52}
                circleWidth={140}
                strokeWidth={18}
                radius={60}
                isPercentageShown
            />
        </VStack>
    );
});
