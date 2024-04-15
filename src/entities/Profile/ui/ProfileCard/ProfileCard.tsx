/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { ChangeEventHandler, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProfileCard.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import { Profile } from '../../model/types/profile';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import DefaultAvatar from '@/shared/assets/icons/default-avatar.svg';
import CancelIcon from '@/shared/assets/icons/error-icon.svg';
import SaveIcon from '@/shared/assets/icons/done.svg';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { Error } from '@/shared/ui/Error/Error';
import { Loader, ThemeLoader } from '@/shared/ui/Loader/Loader';
import { convertDate } from '@/shared/lib/convertDate/convertDate';
import ImageIcon from '@/shared/assets/icons/image-icon.svg';
import TrashIcon from '@/shared/assets/icons/trash-icon.svg';
import EditIcon from '@/shared/assets/icons/edit-icon.svg';
import { Input } from '@/shared/ui/Input/Input';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonlyContactInfo?: boolean;
    readonlyLocationInfo?: boolean;
    readonlyPersonalInfo?: boolean;
    readonlyPasswordInfo?: boolean;
    onCancelEdit: () => void;
    onEditInfo: (type: 'contact' | 'personal' | 'password' | 'location') => void;
    onSaveEdit: () => void;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeSex?: (value: string) => void;
    onChangeDiscription?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountries?: (country: Country) => void;
    onChangeEmail?: (value: string) => void;
    onChangeAdress?: (value: string) => void;
    onChangePhoneNumber?: ChangeEventHandler<HTMLInputElement>;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        readonlyContactInfo,
        readonlyLocationInfo,
        readonlyPersonalInfo,
        readonlyPasswordInfo,
        onEditInfo,
        onChangeEmail,
        onChangePhoneNumber,
        onCancelEdit,
        onSaveEdit,
        onChangeAdress,
        onChangeAge,
        onChangeAvatar,
        onChangeSex,
        onChangeDiscription,
        onChangeCity,
        onChangeCountries,
        onChangeCurrency,
        onChangeFirstname,
        onChangeLastname,
        onChangeUsername,
    } = props;

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <VStack
                justify="center"
                max
                className={classNames('block', { [styles.loading]: true }, [className])}
            >
                <Loader theme={ThemeLoader.MAIN_LOADER} />
            </VStack>
        );
    }

    if (error) {
        return (
            <div className={classNames('block', {}, [className, styles.error])}>
                <Error error={t('Ошибка при загрузке профиля')} />
            </div>
        );
    }

    return (
        <VStack gap="32" className={classNames('block', {}, [className])}>
            <HStack max justify="between" align="center" className={styles.header}>
                <HStack gap="16">
                    <ProfileIcon className={styles.icon} />
                    <Text title={t('Настройки профиля')} gap="0" size={TextSize.L} />
                </HStack>

                <HStack gap="16">
                    <Text text={t('Аккаунт создан :')} gap="0" bold={TextBold.BOLD} size={TextSize.L} />
                    {
                        data?.createdAt && (
                            <p className={classNames('date', {}, [styles.createdAt])}>
                                {convertDate(data?.createdAt)}
                            </p>
                        )
                    }
                </HStack>
            </HStack>

            <HStack max gap="32" className={styles.avatarContainer}>
                <Avatar
                    size={200}
                    className={styles.avatar}
                >
                    <DefaultAvatar />
                </Avatar>

                <VStack gap="32" justify="start" align="start">
                    <HStack gap="16">
                        <Button theme={ThemeButton.OUTLINE_ACTIVE}>
                            <ImageIcon />
                            <span>{t('Сменить')}</span>
                        </Button>
                        <Button theme={ThemeButton.OUTLINE_ACTIVE}>
                            <TrashIcon />
                            <span>{t('Удалить')}</span>
                        </Button>
                    </HStack>

                    <VStack gap="8" align="start">
                        <Text text={t('Рекомендованный размер: 800x800 px')} gap="0" />
                        <Text text={t('Разрешенные форматы: JPG, PNG, JPEG, ICO')} gap="0" />
                        <Text text={t('Максимальный вес изображения: 10мб')} gap="0" />
                    </VStack>

                </VStack>

            </HStack>

            <VStack
                gap="32"
                align="start"
                max
                className={classNames(styles.infoBlock, { [styles.active]: !readonlyContactInfo }, [])}
            >
                <HStack max justify="between">
                    <Text
                        title={t('Личная информация')}
                        text={t('Данная информация видна только вам, мы не используем данные для рассылок')}
                        gap="8"
                        bold={TextBold.BOLD}
                        size={TextSize.M}
                    />

                    {
                        readonlyContactInfo ? (
                            <Button onClick={() => onEditInfo('contact')} theme={ThemeButton.OUTLINE}>
                                <EditIcon />
                                <span>{t('Редактировть')}</span>
                            </Button>
                        ) : (
                            <HStack gap="16">
                                <Button onClick={onCancelEdit} theme={ThemeButton.OUTLINE}>
                                    <CancelIcon />
                                    <span>{t('Отмена')}</span>
                                </Button>
                                <Button onClick={onSaveEdit} theme={ThemeButton.OUTLINE}>
                                    <SaveIcon />
                                    <span>{t('Сохранить')}</span>
                                </Button>
                            </HStack>
                        )
                    }

                </HStack>

                <HStack max gap="32" wrap>
                    <VStack align="start" gap="8">
                        <Text text={t('Никнейм')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.username}
                            placeholder={t('Никнейм')}
                            label=""
                            onChange={onChangeUsername}
                            readonly={readonlyContactInfo}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Имя')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.firstname}
                            placeholder={t('Имя')}
                            label=""
                            onChange={onChangeFirstname}
                            readonly={readonlyContactInfo}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Фамилия')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.lastname}
                            placeholder={t('Фамилия')}
                            label=""
                            onChange={onChangeLastname}
                            readonly={readonlyContactInfo}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Почта')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.email}
                            placeholder={t('Почта')}
                            label=""
                            onChange={onChangeEmail}
                            readonly={readonlyContactInfo}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Номер телефона')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            mask="+7 (999) 999-99-99"
                            placeholder="+7 (___) ___-__-__"
                            value={data?.phone_number}
                            id={t('Номер телефона')}
                            name={t('Номер телефона')}
                            onChangeMasked={onChangePhoneNumber}
                            readonly={readonlyContactInfo}
                        />
                    </VStack>
                </HStack>

            </VStack>

            <VStack
                gap="32"
                align="start"
                max
                className={classNames(styles.infoBlock, { [styles.active]: !readonlyLocationInfo }, [])}
            >
                <HStack max justify="between">
                    <Text
                        title={t('Местоположение')}
                        text={t('Укажите ваш адрес, чтобы ваша доставка прибыла вовремя')}
                        gap="8"
                        bold={TextBold.BOLD}
                        size={TextSize.M}
                    />

                    {
                        readonlyLocationInfo ? (
                            <Button onClick={() => onEditInfo('location')} theme={ThemeButton.OUTLINE}>
                                <EditIcon />
                                <span>{t('Редактировть')}</span>
                            </Button>
                        ) : (
                            <HStack gap="16">
                                <Button onClick={onCancelEdit} theme={ThemeButton.OUTLINE}>
                                    <CancelIcon />
                                    <span>{t('Отмена')}</span>
                                </Button>
                                <Button onClick={onSaveEdit} theme={ThemeButton.OUTLINE}>
                                    <SaveIcon />
                                    <span>{t('Сохранить')}</span>
                                </Button>
                            </HStack>
                        )
                    }
                </HStack>

                <HStack max gap="50">
                    <VStack align="start" gap="8">
                        <Text text={t('Страна')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountries}
                            readonly={readonlyLocationInfo}
                            className={styles.select}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Город')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.city}
                            placeholder={t('Город')}
                            label=""
                            onChange={onChangeCity}
                            readonly={readonlyLocationInfo}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Адрес доставки')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.address}
                            placeholder={t('Адрес доставки')}
                            label=""
                            onChange={onChangeAdress}
                            readonly={readonlyLocationInfo}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Валюта')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readonlyLocationInfo}
                            className={styles.select}
                        />
                    </VStack>
                </HStack>

            </VStack>

            <VStack gap="32" align="start" max className={styles.infoBlock}>
                <HStack max justify="between">
                    <Text
                        title={t('Расскажите о себе')}
                        text={t('Мы всегда рады постоянным клиентам!')}
                        gap="8"
                        bold={TextBold.BOLD}
                        size={TextSize.M}
                    />

                    {
                        readonlyPersonalInfo ? (
                            <Button onClick={() => onEditInfo('personal')} theme={ThemeButton.OUTLINE}>
                                <EditIcon />
                                <span>{t('Редактировть')}</span>
                            </Button>
                        ) : (
                            <HStack gap="16">
                                <Button onClick={onCancelEdit} theme={ThemeButton.OUTLINE}>
                                    <CancelIcon />
                                    <span>{t('Отмена')}</span>
                                </Button>
                                <Button onClick={onSaveEdit} theme={ThemeButton.OUTLINE}>
                                    <SaveIcon />
                                    <span>{t('Сохранить')}</span>
                                </Button>
                            </HStack>
                        )
                    }
                </HStack>

                <HStack max gap="50">
                    <VStack align="start" gap="8">
                        <Text text={t('Возраст')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.age}
                            placeholder={t('Возраст')}
                            label=""
                            onChange={onChangeAge}
                            readonly={readonlyPersonalInfo}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Пол')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.sex}
                            placeholder={t('Пол')}
                            label=""
                            onChange={onChangeSex}
                            readonly={readonlyPersonalInfo}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Немного о себе')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.discription}
                            placeholder={t('Немного о себе')}
                            label=""
                            onChange={onChangeDiscription}
                            readonly={readonlyPersonalInfo}
                        />
                    </VStack>
                </HStack>

            </VStack>

            <VStack gap="32" align="start" max className={styles.infoBlock}>
                <HStack max justify="between">
                    <Text
                        title={t('Пароль')}
                        text={t('Никому не сообщайте ваш пароль, наши сотрудники и так его знают!')}
                        gap="8"
                        bold={TextBold.BOLD}
                        size={TextSize.M}
                    />

                    {
                        readonlyPasswordInfo ? (
                            <Button onClick={() => onEditInfo('password')} theme={ThemeButton.OUTLINE}>
                                <EditIcon />
                                <span>{t('Редактировть')}</span>
                            </Button>
                        ) : (
                            <HStack gap="16">
                                <Button onClick={onCancelEdit} theme={ThemeButton.OUTLINE}>
                                    <CancelIcon />
                                    <span>{t('Отмена')}</span>
                                </Button>
                                <Button onClick={onSaveEdit} theme={ThemeButton.OUTLINE}>
                                    <SaveIcon />
                                    <span>{t('Сохранить')}</span>
                                </Button>
                            </HStack>
                        )
                    }
                </HStack>
            </VStack>

        </VStack>
    );
});
