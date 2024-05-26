/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProfileProgress.module.scss';
import {
    Text, TextAlign, TextBold, TextSize,
} from '@/shared/ui/Text/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import DoneIcon from '@/shared/assets/icons/done.svg';
import CloseIcon from '@/shared/assets/icons/error-icon.svg';
import { CircleProgressBar } from '@/shared/ui/CircleProgressBar/CircleProgressBar';
import { getProfileData } from '@/features/editableProfileCard';
import { Error } from '@/shared/ui/Error/Error';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface ProfileProgressProps {
  className?: string;
  error?: string;
  isLoading?: boolean;
}

export const ProfileProgress = memo(({ className, error, isLoading }: ProfileProgressProps) => {
    const { t } = useTranslation();

    const data = useSelector(getProfileData);

    const checkAddress = (country?: string, city?: string, address?: string) => {
        if (country === '' || country === undefined) {
            return false;
        }
        if (city === '' || city === undefined) {
            return false;
        }
        if (address === '' || address === undefined) {
            return false;
        }
        return true;
    };

    const checkAbout = (age?: number, sex?: string, description?: string) => {
        if (sex === '' || sex === undefined) {
            return false;
        } if (age === 1 || age === undefined) {
            return false;
        } if (description === '' || description === undefined) {
            return false;
        }

        return true;
    };

    const profileTracker = {
        account: data !== undefined,
        avatar: data?.avatar !== '/uploads/users/default.svg',
        number: data?.phone_number !== '',
        address: checkAddress(data?.country, data?.city, data?.address),
        about: checkAbout(data?.age, data?.sex, data?.description),
    };

    const profileProgress = Object.values(profileTracker).filter(
        (value) => value,
    ).length;

    if (error) {
        return (
            <VStack
                align="center"
                justify="start"
                max
                gap="32"
                className={classNames(styles.ProfileProgress, {}, [className])}
            >
                <Text align={TextAlign.CENTER} title={t('Заполните свой профиль')} gap="0" />

                <CircleProgressBar
                    percentage={100}
                    circleWidth={140}
                    strokeWidth={18}
                    radius={60}
                    isLoading
                    isPercentageShown
                />
                <Error error="Ошибка загрузки профиля" />
            </VStack>
        );
    }

    return (
        <VStack
            align="center"
            justify="start"
            max
            gap="32"
            className={classNames(styles.ProfileProgress, {}, [className])}
        >
            <Text align={TextAlign.CENTER} title={t('Заполните свой профиль')} gap="0" />

            <CircleProgressBar
                percentage={profileProgress * 20}
                circleWidth={140}
                strokeWidth={18}
                radius={60}
                isPercentageShown
            />

            {
                isLoading ? (
                    <VStack
                        max
                        align="start"
                        justify="start"
                        gap="16"
                    >
                        <Skeleton width="100%" height={20} border="10px" />
                        <Skeleton width="100%" height={20} border="10px" />
                        <Skeleton width="100%" height={20} border="10px" />
                        <Skeleton width="100%" height={20} border="10px" />
                        <Skeleton width="100%" height={20} border="10px" />
                    </VStack>
                ) : (
                    <VStack
                        align="start"
                        justify="start"
                        gap="16"
                    >

                        <HStack gap="16" justify="start" align="center">
                            {
                                profileTracker.account
                                    ? <DoneIcon className={styles.done} />
                                    : <CloseIcon className={styles.close} />
                            }

                            <Text
                                text={t('Создать аккаунт')}
                                bold={TextBold.BOLD}
                                size={TextSize.L}
                                textPrimary={profileTracker.account}
                                className={styles.text}
                                gap="0"
                            />
                            <Text
                                text={profileTracker.account ? '20%' : '+20%'}
                                bold={TextBold.BOLD}
                                size={TextSize.M}
                                isActive={!profileTracker.account}
                                gap="0"
                            />
                        </HStack>
                        <HStack gap="16" justify="start" align="center">
                            {
                                profileTracker.avatar
                                    ? <DoneIcon className={styles.done} />
                                    : <CloseIcon className={styles.close} />
                            }
                            <Text
                                text={t('Выбрать фото')}
                                bold={TextBold.BOLD}
                                size={TextSize.L}
                                textPrimary={profileTracker.avatar}
                                gap="0"
                            />
                            <Text
                                text={profileTracker.avatar ? '20%' : '+20%'}
                                bold={TextBold.BOLD}
                                size={TextSize.M}
                                isActive={!profileTracker.avatar}
                                gap="0"
                            />
                        </HStack>
                        <HStack gap="16" justify="start" align="center">
                            {
                                profileTracker.number
                                    ? <DoneIcon className={styles.done} />
                                    : <CloseIcon className={styles.close} />
                            }
                            <Text
                                text={t('Добавьте номер')}
                                bold={TextBold.BOLD}
                                size={TextSize.L}
                                textPrimary={profileTracker.number}
                                className={styles.text}
                                gap="0"
                            />
                            <Text
                                text={profileTracker.number ? '20%' : '+20%'}
                                bold={TextBold.BOLD}
                                size={TextSize.M}
                                isActive={!profileTracker.number}
                                gap="0"
                            />
                        </HStack>
                        <HStack gap="16" justify="start" align="center">
                            {
                                profileTracker.address
                                    ? <DoneIcon className={styles.done} />
                                    : <CloseIcon className={styles.close} />
                            }
                            <Text
                                text={t('Добавьте доставку')}
                                bold={TextBold.BOLD}
                                size={TextSize.L}
                                textPrimary={profileTracker.address}
                                className={styles.text}
                                gap="0"
                            />
                            <Text
                                text={profileTracker.address ? '20%' : '+20%'}
                                bold={TextBold.BOLD}
                                size={TextSize.M}
                                isActive={!profileTracker.address}
                                gap="0"
                            />
                        </HStack>
                        <HStack gap="16" justify="start" align="center">
                            {
                                profileTracker.about
                                    ? <DoneIcon className={styles.done} />
                                    : <CloseIcon className={styles.close} />
                            }
                            <Text
                                text={t('Расскажите о себе')}
                                bold={TextBold.BOLD}
                                size={TextSize.L}
                                textPrimary={profileTracker.about}
                                className={styles.text}
                                gap="0"
                            />
                            <Text
                                text={profileTracker.about ? '20%' : '+20%'}
                                bold={TextBold.BOLD}
                                size={TextSize.M}
                                isActive={!profileTracker.about}
                                gap="0"
                            />
                        </HStack>

                    </VStack>
                )
            }

        </VStack>
    );
});
