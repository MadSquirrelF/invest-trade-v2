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
    getProfileReadonlyContactInfo,
    getProfileReadonlyLocationInfo,
    getProfileReadonlyPasswordInfo,
    getProfileReadonlyPersonalInfo,
} from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { ValidateProfileError } from '../../model/types/editableProfileCardSchema';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { Error } from '@/shared/ui/Error/Error';
import { VStack } from '@/shared/ui/Stack';

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
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonlyContactInfo = useSelector(getProfileReadonlyContactInfo);
    const readonlyLocationInfo = useSelector(getProfileReadonlyLocationInfo);
    const readonlyPersonalInfo = useSelector(getProfileReadonlyPersonalInfo);
    const readonlyPasswordInfo = useSelector(getProfileReadonlyPasswordInfo);
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

    const onChangeDiscription = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            discription: value || '',
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

    const onChangeAdress = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            address: value || '',
        }));
    }, [dispatch]);

    const onChangePhoneNumber = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(profileActions.updateProfile({
            phone_number: e.currentTarget.value || '',
        }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
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

    const onEditInfo = useCallback((type: 'contact' | 'personal' | 'password' | 'location') => {
        switch (type) {
        case 'contact':
            dispatch(profileActions.setReadonlyContactInfo(false));
            break;
        case 'personal':
            dispatch(profileActions.setReadonlyPersonalInfo(false));
            break;
        case 'password':
            dispatch(profileActions.setReadonlyPasswordInfo(false));
            break;
        case 'location':
            dispatch(profileActions.setReadonlyLocationInfo(false));
            break;
        default:
            break;
        }
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSaveEdit = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

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

            <VStack justify="between" align="start" max gap="50">
                <ProfileCard
                    data={formData}
                    error={error}
                    isLoading={isLoading}
                    readonlyLocationInfo={readonlyLocationInfo}
                    readonlyContactInfo={readonlyContactInfo}
                    readonlyPersonalInfo={readonlyPersonalInfo}
                    readonlyPasswordInfo={readonlyPasswordInfo}
                    onChangeEmail={onChangeEmail}
                    onChangeDiscription={onChangeDiscription}
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
                    onChangeAdress={onChangeAdress}
                />
                <ProfileProgress />
            </VStack>

        </DynamicModuleLoader>

    );
});
