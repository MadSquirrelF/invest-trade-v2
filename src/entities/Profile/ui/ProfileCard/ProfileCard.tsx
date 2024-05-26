/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import {
    ChangeEventHandler, memo,
    useCallback,
    useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ProfileCard.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import { Profile } from '../../model/types/profile';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import CancelIcon from '@/shared/assets/icons/error-icon.svg';
import SaveIcon from '@/shared/assets/icons/done.svg';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { Error } from '@/shared/ui/Error/Error';
import { convertDate } from '@/shared/lib/convertDate/convertDate';
import ImageIcon from '@/shared/assets/icons/image-icon.svg';
import TrashIcon from '@/shared/assets/icons/trash-icon.svg';
import EditIcon from '@/shared/assets/icons/edit-icon.svg';
import { Input } from '@/shared/ui/Input/Input';

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { CopyButton } from '@/shared/ui/CopyButton/CopyButton';
import { AvatarModal } from '../AvatarModal/AvatarModal';
import { covertImageUrl } from '@/shared/lib/covertImageUrl/covertImageUrl';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { ReadOnlyInfo, uploadImage } from '@/features/editableProfileCard';
import { PasswordStrength } from '@/shared/ui/PasswordStrength/PasswordStrength';
import { ValidateRegistrationPasswordError } from '@/features/Auth';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    oldPassword?: string;
    newPassword?: string;
    repeatNewPassword?: string;
    readonlyInfo?: ReadOnlyInfo;
    passwordErrors?: ValidateRegistrationPasswordError[];
    onCancelEdit: () => void;
    onEditInfo: (type: ReadOnlyInfo) => void;
    onSaveEdit: () => void;
    onSavePassword: () => void;
    onCancelPasswordEdit: () => void;
    onDeleteAvatar: (value: string) => void;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeSex?: (value: string) => void;
    onChangedescription?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeAvatar: (value: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountries?: (country: Country) => void;
    onChangeEmail?: (value: string) => void;
    onChangeAddress?: (value: string) => void;
    onChangePhoneNumber?: ChangeEventHandler<HTMLInputElement>;
    onChangeOldPassword?: (value: string) => void;
    onChangeNewPassword?: (value: string) => void;
    onChangeRepeatNewPassword?: (value: string) => void;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { t } = useTranslation();
    const {
        className,
        data,
        error,
        oldPassword,
        newPassword,
        repeatNewPassword,
        isLoading,
        passwordErrors,
        onCancelPasswordEdit,
        readonlyInfo,
        onEditInfo,
        onSavePassword,
        onChangeOldPassword,
        onChangeNewPassword,
        onChangeRepeatNewPassword,
        onDeleteAvatar,
        onChangeEmail,
        onChangePhoneNumber,
        onCancelEdit,
        onSaveEdit,
        onChangeAddress,
        onChangeAge,
        onChangeAvatar,
        onChangeSex,
        onChangedescription,
        onChangeCity,
        onChangeCountries,
        onChangeCurrency,
        onChangeFirstname,
        onChangeLastname,
        onChangeUsername,
    } = props;

    const [isAvatarModal, setIsAvatarModal] = useState(false);

    const [meter, setMeter] = useState(false);

    const validatePasswordErrorsTranslations = {
        [ValidateRegistrationPasswordError.EMPTY_PASSWORD]: t(
            'Пароль пуст',
        ),
        [ValidateRegistrationPasswordError.NO_MATCH_PASSWORDS]: t('Пароли не совпадают'),
        [ValidateRegistrationPasswordError.TOO_SHORT_PASSWORD]: t('Пароль слишком короткий'),
        [ValidateRegistrationPasswordError.SERVER_ERROR]: t('Неверный старый пароль'),
    };

    const onCloseModalSuccess = useCallback((text: string, file?: File) => {
        setIsAvatarModal(false);

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const data = {
                file: formData,
                folder: 'users',
            };

            uploadImage(data);
        }

        onChangeAvatar(text);

        onSaveEdit();
    }, [onChangeAvatar, onSaveEdit]);

    const onCloseModalCancel = useCallback(() => {
        setIsAvatarModal(false);
        onCancelEdit();
    }, [onCancelEdit]);

    const onHandleDeleteAvatar = useCallback(() => {
        onDeleteAvatar('/uploads/users/default.svg');
        onSaveEdit();
    }, [onDeleteAvatar, onSaveEdit]);

    const onShowModal = useCallback(() => {
        setIsAvatarModal(true);
    }, []);

    if (isLoading) {
        return (
            <VStack gap="32" max className={classNames(styles.ProfileCard, {}, [className, 'block'])}>
                <HStack max justify="between" align="center" className={styles.header}>
                    <HStack gap="16">
                        <ProfileIcon className={styles.icon} />
                        <Text title={t('Настройки профиля')} gap="0" size={TextSize.L} />
                    </HStack>

                    <HStack gap="16">
                        <Text text={t('Аккаунт создан :')} gap="0" bold={TextBold.BOLD} size={TextSize.L} />
                        <Skeleton width="300px" height={30} border="20px" />
                    </HStack>
                </HStack>

                <HStack max gap="32" className={styles.avatarContainer}>
                    <Skeleton width={200} height={200} border="50%" />

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
                    className={classNames(styles.infoBlock, { [styles.active]: readonlyInfo === 'contact' }, [])}
                >
                    <HStack max justify="between">
                        <Text
                            title={t('Личная информация')}
                            text={t('Данная информация видна только вам, мы не используем данные для рассылок')}
                            gap="8"
                            bold={TextBold.BOLD}
                            size={TextSize.M}
                        />

                        <Skeleton width="150px" height={40} border="20px" />

                    </HStack>

                    <HStack max gap="32" wrap>
                        <VStack align="start" gap="8">
                            <Text text={t('Никнейм')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                        <VStack align="start" gap="8">
                            <Text text={t('Имя')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                        <VStack align="start" gap="8">
                            <Text text={t('Фамилия')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                        <VStack align="start" gap="8">
                            <Text text={t('Почта')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                        <VStack align="start" gap="8">
                            <Text text={t('Номер телефона')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                    </HStack>

                </VStack>

                <VStack
                    gap="32"
                    align="start"
                    max
                    className={classNames(styles.infoBlock, { [styles.active]: readonlyInfo === 'location' }, [])}
                >
                    <HStack max justify="between">
                        <Text
                            title={t('Местоположение')}
                            text={t('Укажите ваш адрес, чтобы ваша доставка прибыла вовремя')}
                            gap="8"
                            bold={TextBold.BOLD}
                            size={TextSize.M}
                        />

                        <Skeleton width="150px" height={40} border="20px" />
                    </HStack>

                    <HStack max gap="50" wrap>
                        <VStack align="start" gap="8">
                            <Text text={t('Страна')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                        <VStack align="start" gap="8">
                            <Text text={t('Город')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                        <VStack align="start" gap="8">
                            <Text text={t('Адрес доставки')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                        <VStack align="start" gap="8">
                            <Text text={t('Валюта')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                    </HStack>

                </VStack>

                <VStack
                    gap="32"
                    align="start"
                    max
                    className={classNames(styles.infoBlock, { [styles.active]: readonlyInfo === 'personal' }, [])}
                >
                    <HStack max justify="between">
                        <Text
                            title={t('Расскажите о себе')}
                            text={t('Мы всегда рады постоянным клиентам!')}
                            gap="8"
                            bold={TextBold.BOLD}
                            size={TextSize.M}
                        />

                        <Skeleton width="150px" height={40} border="20px" />
                    </HStack>

                    <HStack max gap="50" wrap>
                        <VStack align="start" gap="8">
                            <Text text={t('Возраст')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                        <VStack align="start" gap="8">
                            <Text text={t('Пол')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                        <VStack align="start" gap="8">
                            <Text text={t('Немного о себе')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Skeleton width="100%" height={20} border="20px" />
                        </VStack>
                    </HStack>

                </VStack>

                <VStack
                    gap="32"
                    align="start"
                    max
                    className={classNames(styles.infoBlock, { [styles.active]: readonlyInfo === 'password' }, [])}
                >
                    <HStack max justify="between">
                        <Text
                            title={t('Пароль')}
                            text={t('Никому не сообщайте ваш пароль, наши сотрудники и так его знают!')}
                            gap="8"
                            bold={TextBold.BOLD}
                            size={TextSize.M}
                        />

                        <Skeleton width="150px" height={40} border="20px" />
                    </HStack>
                </VStack>

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
        <VStack gap="32" max className={classNames(styles.ProfileCard, {}, [className, 'block'])}>
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
                    src={covertImageUrl(data?.avatar)}
                    className={styles.avatar}
                />

                <AvatarModal
                    isOpen={isAvatarModal}
                    onCloseSuccess={onCloseModalSuccess}
                    onCloseCancel={onCloseModalCancel}
                />

                <VStack gap="32" justify="start" align="start">
                    <HStack gap="16">
                        <Button onClick={onShowModal} theme={ThemeButton.OUTLINE_ACTIVE}>
                            <ImageIcon />
                            <span>{t('Сменить')}</span>
                        </Button>
                        <Button onClick={onHandleDeleteAvatar} theme={ThemeButton.OUTLINE_ACTIVE}>
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
                className={classNames(styles.infoBlock, { [styles.active]: readonlyInfo === 'contact' }, [])}
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
                        readonlyInfo !== 'contact' ? (
                            <Button onClick={() => onEditInfo(ReadOnlyInfo.CONTACT)} theme={ThemeButton.OUTLINE}>
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
                            readonly={readonlyInfo !== 'contact'}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Имя')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.firstname}
                            placeholder={t('Имя')}
                            label=""
                            onChange={onChangeFirstname}
                            readonly={readonlyInfo !== 'contact'}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Фамилия')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.lastname}
                            placeholder={t('Фамилия')}
                            label=""
                            onChange={onChangeLastname}
                            readonly={readonlyInfo !== 'contact'}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <HStack gap="4" align="center">
                            <Text text={t('Почта')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <CopyButton text={data?.email} />
                        </HStack>
                        <Input
                            value={data?.email}
                            placeholder={t('Почта')}
                            label=""
                            onChange={onChangeEmail}
                            readonly={readonlyInfo !== 'contact'}
                        />

                    </VStack>
                    <VStack align="start" gap="8">
                        <HStack gap="4" align="center">
                            <Text text={t('Номер телефона')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <CopyButton text={data?.phone_number} />
                        </HStack>
                        <Input
                            mask="+7 (999) 999-99-99"
                            placeholder="+7 (___) ___-__-__"
                            value={data?.phone_number}
                            id={t('Номер телефона')}
                            name={t('Номер телефона')}
                            onChangeMasked={onChangePhoneNumber}
                            readonly={readonlyInfo !== 'contact'}
                        />

                    </VStack>
                </HStack>

            </VStack>

            <VStack
                gap="32"
                align="start"
                max
                className={classNames(styles.infoBlock, { [styles.active]: readonlyInfo === 'location' }, [])}
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
                        readonlyInfo !== 'location' ? (
                            <Button onClick={() => onEditInfo(ReadOnlyInfo.LOCATION)} theme={ThemeButton.OUTLINE}>
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

                <HStack max gap="50" wrap>
                    <VStack align="start" gap="8">
                        <Text text={t('Страна')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountries}
                            readonly={readonlyInfo !== 'location'}
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
                            readonly={readonlyInfo !== 'location'}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Адрес доставки')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.address}
                            placeholder={t('Адрес доставки')}
                            label=""
                            onChange={onChangeAddress}
                            readonly={readonlyInfo !== 'location'}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Валюта')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readonly={readonlyInfo !== 'location'}
                            className={styles.select}
                        />
                    </VStack>
                </HStack>

            </VStack>

            <VStack
                gap="32"
                align="start"
                max
                className={classNames(styles.infoBlock, { [styles.active]: readonlyInfo === 'personal' }, [])}
            >
                <HStack max justify="between">
                    <Text
                        title={t('Расскажите о себе')}
                        text={t('Мы всегда рады постоянным клиентам!')}
                        gap="8"
                        bold={TextBold.BOLD}
                        size={TextSize.M}
                    />

                    {
                        readonlyInfo !== 'personal' ? (
                            <Button onClick={() => onEditInfo(ReadOnlyInfo.PERSONAL)} theme={ThemeButton.OUTLINE}>
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

                <HStack max gap="50" wrap>
                    <VStack align="start" gap="8">
                        <Text text={t('Возраст')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.age}
                            placeholder={t('Возраст')}
                            label=""
                            onChange={onChangeAge}
                            readonly={readonlyInfo !== 'personal'}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Пол')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.sex}
                            placeholder={t('Пол')}
                            label=""
                            onChange={onChangeSex}
                            readonly={readonlyInfo !== 'personal'}
                        />
                    </VStack>
                    <VStack align="start" gap="8">
                        <Text text={t('Немного о себе')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                        <Input
                            value={data?.description}
                            placeholder={t('Немного о себе')}
                            label=""
                            onChange={onChangedescription}
                            readonly={readonlyInfo !== 'personal'}
                        />
                    </VStack>
                </HStack>

            </VStack>

            <VStack
                gap="32"
                align="start"
                max
                className={classNames(styles.infoBlock, { [styles.active]: readonlyInfo === 'password' }, [])}
            >
                <HStack max justify="between">
                    <Text
                        title={t('Пароль')}
                        text={t('Никому не сообщайте ваш пароль, наши сотрудники и так его знают!')}
                        gap="8"
                        bold={TextBold.BOLD}
                        size={TextSize.M}
                    />

                    {
                        readonlyInfo !== 'password' ? (
                            <Button onClick={() => onEditInfo(ReadOnlyInfo.PASSWORD)} theme={ThemeButton.OUTLINE}>
                                <EditIcon />
                                <span>{t('Редактировть')}</span>
                            </Button>
                        ) : (
                            <HStack gap="16">
                                <Button onClick={onCancelPasswordEdit} theme={ThemeButton.OUTLINE}>
                                    <CancelIcon />
                                    <span>{t('Отмена')}</span>
                                </Button>
                                <Button onClick={onSavePassword} theme={ThemeButton.OUTLINE}>
                                    <SaveIcon />
                                    <span>{t('Сохранить')}</span>
                                </Button>
                            </HStack>
                        )
                    }
                </HStack>

                <CSSTransition
                    in={readonlyInfo === 'password'}
                    timeout={500}
                    unmountOnExit
                    classNames="slide-animation"
                >
                    <HStack max gap="50" wrap>
                        <VStack align="start" gap="8">
                            <Text text={t('Старый пароль')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Input
                                value={oldPassword}
                                placeholder={t('Старый пароль')}
                                label=""
                                autofocus
                                onChange={onChangeOldPassword}
                                isPassword
                                type="password"
                                readonly={readonlyInfo !== 'password'}
                            />
                        </VStack>
                        <VStack align="start" gap="8" className={styles.passwordWrapper}>
                            <Text text={t('Новый пароль')} gap="0" size={TextSize.L} bold={TextBold.LIGHT} />
                            <Input
                                value={newPassword}
                                placeholder={t('Новый пароль')}
                                onBlur={() => setMeter(false)}
                                onFocus={() => setMeter(true)}
                                label=""
                                isPassword
                                type="password"
                                onChange={onChangeNewPassword}
                                readonly={readonlyInfo !== 'password'}
                            />
                            <CSSTransition
                                in={meter}
                                timeout={300}
                                unmountOnExit
                                classNames="slide-animation"
                            >
                                <PasswordStrength password={newPassword || ''} className={styles.passwordPosition} />
                            </CSSTransition>
                        </VStack>
                        <VStack align="start" gap="8">
                            <Text
                                text={t('Повторите новый пароль')}
                                gap="0"
                                size={TextSize.L}
                                bold={TextBold.LIGHT}
                            />
                            <Input
                                value={repeatNewPassword}
                                placeholder={t('Повторите новый пароль')}
                                label=""
                                isPassword
                                type="password"
                                onChange={onChangeRepeatNewPassword}
                                readonly={readonlyInfo !== 'password'}
                            />
                        </VStack>
                    </HStack>
                </CSSTransition>
            </VStack>

            <CSSTransition
                in={!passwordErrors || passwordErrors?.length > 0}
                timeout={300}
                unmountOnExit
                classNames="slide-animation"
            >
                <VStack max gap="32">
                    {
                        passwordErrors?.length && passwordErrors.map((err) => (
                            <Error
                                key={err}
                                error={validatePasswordErrorsTranslations[err]}
                            />
                        ))
                    }
                </VStack>

            </CSSTransition>

        </VStack>
    );
});
