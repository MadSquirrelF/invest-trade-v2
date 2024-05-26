import { useTranslation } from 'react-i18next';
import {
    ChangeEvent, memo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfileCard, ProfileProgress } from '@/entities/Profile';
import { profileActions, profileReducer } from '../../model/slices/editableProfileCardSlice';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import {
    getProfileReadonlyInfo,
} from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { ReadOnlyInfo, ValidateProfileError } from '../../model/types/editableProfileCardSchema';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { Error } from '@/shared/ui/Error/Error';
import { HStack } from '@/shared/ui/Stack';
import styles from './EditableProfileCard.module.scss';
import { NotificationsActions } from '@/features/Notifications';
import { initAuthData } from '@/entities/User';
import {
    getProfileNewPassword,
    getProfileOldPassword,
    getProfilePasswordErrors,
    getProfileRepeatNewPassword,
} from '../../model/selectors/getProfilePassword/getProfilePassword';
import { updatePasswordData } from '../../model/services/updatePasswordData/updatePasswordData';

interface EditableProfileCardProps {
    className?: string;
    id: string;
}

const reducers: ReducerList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const formData = useSelector(getProfileForm);
    const oldPassword = useSelector(getProfileOldPassword);
    const newPassword = useSelector(getProfileNewPassword);
    const repeatNewPassword = useSelector(getProfileRepeatNewPassword);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonlyInfo = useSelector(getProfileReadonlyInfo);

    const passwordErrors = useSelector(getProfilePasswordErrors);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorsTranslations = {
        [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректно введен возраст'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательные поля'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
    };

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            firstname: value || '',
        }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            lastname: value || '',
        }));
    }, [dispatch]);

    const onChangeOldPassword = useCallback((value?: string) => {
        dispatch(profileActions.updateOldPassword(value || ''));
    }, [dispatch]);

    const onChangeNewPassword = useCallback((value?: string) => {
        dispatch(profileActions.updateNewPassword(value || ''));
    }, [dispatch]);

    const onChangeRepeatNewPassword = useCallback((value?: string) => {
        dispatch(profileActions.updateRepeatNewPassword(value || ''));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        const validateValue = value?.replace(/\D+/gm, '');
        dispatch(profileActions.updateProfile({
            age: Number(validateValue || 0),
        }));
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            city: value || '',
        }));
    }, [dispatch]);

    const onChangedescription = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            description: value || '',
        }));
    }, [dispatch]);

    const onChangeSex = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            sex: value || '',
        }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            username: value || '',
        }));
    }, [dispatch]);

    const onChangeEmail = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            email: value || '',
        }));
    }, [dispatch]);

    const onChangeAddress = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            address: value || '',
        }));
    }, [dispatch]);

    const onChangePhoneNumber = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(profileActions.updateProfile({
            phone_number: e.currentTarget.value || '',
        }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({
            avatar: value || '',
        }));
    }, [dispatch]);

    const onDeleteAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            avatar: value || '',
        }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({
            currency,
        }));
    }, [dispatch]);

    const onChangeCountries = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({
            country,
        }));
    }, [dispatch]);

    const onEditInfo = useCallback((type: ReadOnlyInfo) => {
        switch (type) {
        case ReadOnlyInfo.CONTACT:
            dispatch(profileActions.setReadonlyInfo(ReadOnlyInfo.CONTACT));
            break;
        case ReadOnlyInfo.PERSONAL:
            dispatch(profileActions.setReadonlyInfo(ReadOnlyInfo.PERSONAL));
            break;
        case ReadOnlyInfo.PASSWORD:
            dispatch(profileActions.setReadonlyInfo(ReadOnlyInfo.PASSWORD));
            break;
        case ReadOnlyInfo.LOCATION:
            dispatch(profileActions.setReadonlyInfo(ReadOnlyInfo.LOCATION));
            break;
        default:
            break;
        }
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onCancelPasswordEdit = useCallback(() => {
        dispatch(profileActions.cancelEditPassword());
    }, [dispatch]);

    const onSaveEdit = useCallback(() => {
        dispatch(updateProfileData());
        dispatch(initAuthData());
        dispatch(NotificationsActions.addNotification({
            type: 'success',
            label: 'Профиль',
            text: 'Данные успешно изменены',
        }));
    }, [dispatch]);

    const onSavePassword = useCallback(
        async () => {
            const result = await dispatch(updatePasswordData());

            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(initAuthData());
                dispatch(NotificationsActions.addNotification({
                    type: 'success',
                    label: 'Пароль',
                    text: 'Пароль успешно изменен',
                }));
            } else {
                dispatch(NotificationsActions.addNotification({
                    type: 'error',
                    label: 'Пароль',
                    text: 'Неверный пароль',
                }));
            }
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>

            {
                validateErrors?.length && validateErrors.map((err) => (
                    <Error
                        data-testid="EditableProfileCard.Error"
                        key={err}
                        error={validateErrorsTranslations[err]}
                    />
                ))
            }

            <HStack justify="start" align="start" max gap="50" className={styles.EditableProfileCard}>
                <ProfileCard
                    data={formData}
                    error={error}
                    isLoading={isLoading}
                    oldPassword={oldPassword}
                    newPassword={newPassword}
                    passwordErrors={passwordErrors}
                    onCancelPasswordEdit={onCancelPasswordEdit}
                    repeatNewPassword={repeatNewPassword}
                    onSavePassword={onSavePassword}
                    onChangeOldPassword={onChangeOldPassword}
                    onChangeNewPassword={onChangeNewPassword}
                    onChangeRepeatNewPassword={onChangeRepeatNewPassword}
                    readonlyInfo={readonlyInfo}
                    onChangeEmail={onChangeEmail}
                    onChangedescription={onChangedescription}
                    onChangeSex={onChangeSex}
                    onChangePhoneNumber={onChangePhoneNumber}
                    onChangeAge={onChangeAge}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCity={onChangeCity}
                    onChangeCountries={onChangeCountries}
                    onChangeCurrency={onChangeCurrency}
                    onEditInfo={onEditInfo}
                    onCancelEdit={onCancelEdit}
                    onSaveEdit={onSaveEdit}
                    onDeleteAvatar={onDeleteAvatar}
                    onChangeAddress={onChangeAddress}
                />
                <ProfileProgress
                    error={error}
                    isLoading={isLoading}
                />
            </HStack>

        </DynamicModuleLoader>

    );
});
