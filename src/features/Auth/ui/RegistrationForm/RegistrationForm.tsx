/* eslint-disable no-useless-escape */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import PasswordBg from '@/shared/assets/images/password-bg.svg';
import PasswordBgDark from '@/shared/assets/images/password-bg-dark.svg';
import PersonalInfoBg from '@/shared/assets/images/personalInfoBg.svg';
import PersonalInfoBgDark from '@/shared/assets/images/personalInfoBgDark.svg';
import LoginMailBg from '@/shared/assets/images/LoginMainBg.svg';
import LoginMailBgDark from '@/shared/assets/images/LoginMainBgDark.svg';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Error } from '@/shared/ui/Error/Error';
import { Loader, ThemeLoader } from '@/shared/ui/Loader/Loader';
import { registrationByEmail } from '../../model/services/registrationByEmail';
import { validateEmails } from '../../model/services/validateEmail/validateEmail';
import { validatePassword } from '../../model/services/validatePassword/validatePassword';
import { registrationActions, registrationReducer } from '../../model/slice/registrationSlice';
import styles from './RegistrationForm.module.scss';
import { LoginBlockComponent } from './LoginBlockComponent/LoginBlockComponent';
import { PasswordBlockComponent } from './PasswordBlockComponent/PasswordBlockComponent';
import { PersonalInfoBlockComponent } from './PersonalInfoBlockComponent/PersonalInfoBlockComponent';
import {
    getRegistrationEmail,
    getRegistrationEmailValidateErrors,
    getRegistrationError,
    getRegistrationFirstname,
    getRegistrationIsLoading,
    getRegistrationLastname,
    getRegistrationPassword,
    getRegistrationPasswordValidateErrors,
    getRegistrationPersonalDataValidateErrors,
    getRegistrationRepeatPassword,
    getRegistrationUsername,
} from '../../model/selectors/getRegistration/getRegistration';
import { validatePersonalData } from '../../model/services/validatePersonalData/validatePersonalData';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { NotificationsActions } from '@/features/Notifications';
import Mail from '@/shared/assets/icons/mail.svg';
import Password from '@/shared/assets/icons/password.svg';
import PersonalInfo from '@/shared/assets/icons/personal-info.svg';
import { IStepper, Stepper } from '@/shared/ui/Stepper/Stepper';

interface RegistrationFormProps {
  className?: string;
}

const initialReducers: ReducerList = {
    registrationForm: registrationReducer,
};

const steps: IStepper[] = [
    {
        id: 0,
        title: 'Логин и почта',
        Icon: Mail,
    },
    {
        id: 1,
        title: 'Придумайте пароль',
        Icon: Password,
    },
    {
        id: 2,
        title: 'Персональные данные',
        Icon: PersonalInfo,
    },
];

export const RegistrationForm = memo(({ className }: RegistrationFormProps) => {
    const { t } = useTranslation('registration');

    const { theme } = useTheme();

    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const [token, setToken] = useState<string>('');
    const [submitEnabled, setSubmitEnabled] = useState(false);

    const [checked, setChecked] = useState(false);

    const [slideIn, setSlideIn] = useState(true);
    const [phone_number, setPhone] = useState('');

    const dispatch = useAppDispatch();
    const forceUpdate = useForceUpdate();

    const email = useSelector(getRegistrationEmail);
    const username = useSelector(getRegistrationUsername);
    const password = useSelector(getRegistrationPassword);
    const error = useSelector(getRegistrationError);
    const isLoading = useSelector(getRegistrationIsLoading);

    const firstname = useSelector(getRegistrationFirstname);
    const lastname = useSelector(getRegistrationLastname);

    const repeatPassword = useSelector(getRegistrationRepeatPassword);
    const validatePasswordErrors = useSelector(getRegistrationPasswordValidateErrors);
    const validateEmailErrors = useSelector(getRegistrationEmailValidateErrors);
    const validatePersonalDataErrors = useSelector(getRegistrationPersonalDataValidateErrors);

    const handleChangeCheckBox = useCallback(() => {
        setChecked(!checked);
    }, [checked]);

    const handleToken = (token: string) => {
        setToken(token);

        if (token && token.length > 0) {
            setSubmitEnabled(true);
        }
    };

    const handleArrowClickBack = useCallback(() => {
        setSlideIn(false);

        setTimeout(() => {
            setActiveStep(activeStep - 1);
            setSlideIn(true);
        }, 300);
    }, [activeStep]);

    const handleArrowClickPassword = () => {
        const errors = validatePassword(password, repeatPassword);

        if (errors.length === 0) {
            setSlideIn(false);

            setTimeout(() => {
                setActiveStep(activeStep + 1);
                setSlideIn(true);
            }, 300);
        }

        return dispatch(registrationActions.setPasswordValidErrors(errors));
    };

    const handleArrowClickEmail = () => {
        const errors = validateEmails(username, email);

        if (errors.length === 0) {
            setSlideIn(false);

            setTimeout(() => {
                setActiveStep(activeStep + 1);
                setSlideIn(true);
            }, 300);
        }

        return dispatch(registrationActions.setEmailValidErrors(errors));
    };

    const onRegistrationClick = useCallback(async () => {
        const errors = validatePersonalData(firstname, lastname, phone_number);

        if (errors.length === 0 && token) {
            const result = await dispatch(registrationByEmail({
                email, password, username, firstname, lastname, phone_number, token,
            }));
            if (result.meta.requestStatus === 'fulfilled') {
                navigate(-1);
                forceUpdate();
                dispatch(NotificationsActions.addNotification({
                    type: 'success',
                    label: 'Регистрация',
                    text: 'Вы успешно создали аккаунт!',
                }));
            }
        }

        return dispatch(registrationActions.setPersonalDataValidErrors(errors));
    }, [firstname, lastname, phone_number, token, dispatch, email, password, username, navigate, forceUpdate]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(registrationActions.setPassword((value.trim())));
    }, [dispatch]);

    const onChangeRepeatPassword = useCallback((value: string) => {
        dispatch(registrationActions.setRepeatPassword((value.trim())));
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(registrationActions.setEmail((value.trim())));
    }, [dispatch]);

    const onChangeLogin = useCallback((value: string) => {
        dispatch(registrationActions.setUsername((value.trim())));
    }, [dispatch]);

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(registrationActions.setFirstname((value.trim())));
    }, [dispatch]);

    const onChangeLastname = useCallback((value: string) => {
        dispatch(registrationActions.setLastname((value.trim())));
    }, [dispatch]);

    const onChangePhone = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }, []);

    const renderBlock = useCallback(
        (activeStep: number) => {
            switch (activeStep) {
            case 0:
                return (
                    <LoginBlockComponent
                        onChangeEmail={onChangeEmail}
                        onChangeLogin={onChangeLogin}
                        emailErrors={validateEmailErrors}
                    />
                );
            case 1:
                return (
                    <PasswordBlockComponent
                        onChangePassword={onChangePassword}
                        onChangeRepeatPassword={onChangeRepeatPassword}
                        passwordErrors={validatePasswordErrors}
                    />
                );
            case 2:
                return (
                    <PersonalInfoBlockComponent
                        onChangeFirstname={onChangeFirstname}
                        onChangeLastname={onChangeLastname}
                        phone={phone_number}
                        handleToken={handleToken}
                        onChangePhone={onChangePhone}
                        personalInfoErrors={validatePersonalDataErrors}
                        handleChangeCheckBox={handleChangeCheckBox}
                        checkedCheckBox={checked}
                    />
                );
            default:
                return null;
            }
        },
        [checked, handleChangeCheckBox, onChangeEmail, onChangeFirstname, onChangeLastname, onChangeLogin, onChangePassword, onChangePhone, onChangeRepeatPassword, phone_number, validateEmailErrors, validatePasswordErrors, validatePersonalDataErrors],
    );

    const renderImage = useCallback(
        (activeStep: number) => {
            switch (activeStep) {
            case 0:
                switch (theme) {
                case Theme.LIGHT:
                    return <LoginMailBg className={styles.bgImage} />;
                case Theme.DARK:
                    return <LoginMailBgDark className={styles.bgImage} />;
                default:
                    return <LoginMailBgDark className={styles.bgImage} />;
                }

            case 1:
                switch (theme) {
                case Theme.LIGHT:
                    return <PasswordBg className={styles.bgImage} />;
                case Theme.DARK:
                    return <PasswordBgDark className={styles.bgImage} />;
                default:
                    return <PasswordBg className={styles.bgImage} />;
                }
            case 2:
                switch (theme) {
                case Theme.LIGHT:
                    return <PersonalInfoBg className={styles.bgImage} />;
                case Theme.DARK:
                    return <PersonalInfoBgDark className={styles.bgImage} />;
                default:
                    return <PersonalInfoBg className={styles.bgImage} />;
                }
            default:
                return null;
            }
        },
        [theme],
    );

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>

            <HStack justify="between" className={classNames('', {}, [className])}>
                <CSSTransition
                    in={slideIn}
                    timeout={300}
                    unmountOnExit
                    classNames="slide-animation"
                >
                    {renderImage(activeStep)}
                </CSSTransition>

                <VStack justify="between" gap="32" className={styles.RegistrationForm}>
                    <Stepper currentStep={activeStep} steps={steps} />

                    <CSSTransition
                        in={slideIn}
                        timeout={300}
                        unmountOnExit
                        classNames="slide-animation"
                    >
                        {renderBlock(activeStep)}
                    </CSSTransition>

                    {
                        error && (
                            <Error error={error} />
                        )
                    }

                    {
                        activeStep === 2 && (
                            <Button
                                disabled={isLoading || !submitEnabled}
                                className={styles.regBtn}
                                onClick={onRegistrationClick}
                                theme={ThemeButton.DEFAULT}
                            >
                                {
                                    isLoading ? <Loader theme={ThemeLoader.BTN_LOADER} /> : (
                                        <span>
                                            {t('Зарегестрироваться')}
                                        </span>
                                    )
                                }

                            </Button>
                        )
                    }

                    <HStack gap="32" max justify={activeStep === 0 ? 'end' : 'between'}>
                        {
                            activeStep !== 0 && (
                                <Button
                                    disabled={activeStep === 0}
                                    theme={ThemeButton.OUTLINE}
                                    onClick={() => handleArrowClickBack()}
                                >
                                    {t('Назад')}
                                </Button>
                            )
                        }

                        {
                            activeStep !== 2 && (
                                <Button
                                    theme={ThemeButton.DEFAULT}
                                    onClick={activeStep === 0 ? () => handleArrowClickEmail() : () => handleArrowClickPassword()}
                                >
                                    {t('Далее')}
                                </Button>
                            )
                        }

                    </HStack>

                </VStack>

            </HStack>
        </DynamicModuleLoader>
    );
});
