/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as VKID from '@vkid/sdk';
import { SmartCaptcha } from '@yandex/smart-captcha';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Error } from '@/shared/ui/Error/Error';
import { Loader, ThemeLoader } from '@/shared/ui/Loader/Loader';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail';
import { loginByEmail } from '../../model/services/loginByEmail';
import styles from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getRouteRegistration } from '@/shared/const/router';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { NotificationsActions } from '@/features/Notifications';

export interface LoginFormProps {
 className?: string;
 onSuccess: () => void;
}

const initialReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { i18n, t } = useTranslation();

    // VKID.Config.set({
    //     app: "",
    //     redirectUrl: getRouteMain(),
    // });

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const forceUpdate = useForceUpdate();

    const isEmailInvalid = !email || !email.length;

    const isPasswordInvalid = !password || !password.length;

    const [checked, setChecked] = useState(false);

    const [token, setToken] = useState<string>('');

    const [submitEnabled, setSubmitEnabled] = useState(false);

    const handleToken = (token: string) => {
        setToken(token);

        if (token && token.length > 0) {
            setSubmitEnabled(true);
        }
    };

    const handleChange = () => {
        setChecked(!checked);
    };

    const navigateToRegistration = useCallback(
        () => {
            onSuccess();

            navigate(getRouteRegistration());
        },
        [navigate, onSuccess],
    );

    const onChangeEmail = useCallback((value: string) => {
        dispatch(loginActions.setEmail(value.trim()));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value.trim()));
    }, [dispatch]);

    const onLoginVKClick = useCallback(
        () => {
            VKID.Auth.login();
        },
        [],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByEmail({ email, password, token }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
            dispatch(NotificationsActions.addNotification({
                type: 'success',
                label: 'Авторизация',
                text: 'Вы успешно вошли в аккаунт',
            }));
        }
    }, [dispatch, email, password, token, onSuccess, forceUpdate]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <form className={classNames(styles.LoginForm, {}, [className])}>
                <Text
                    title={t('Вход на сайт')}
                    bold={TextBold.BOLD}
                    size={TextSize.L}
                    gap="16"
                    className={styles.title}
                    text={t('Для того, чтобы перейти к личным данным нужно войти')}
                />

                <VStack gap="8" max className={styles.apiBtnContainer}>
                    <Button disabled theme={ThemeButton.VK} onClick={onLoginVKClick} className={styles.apiAuthBtn}>
                        <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.54648 4.54648C3 6.09295 3 8.58197 3 13.56V14.44C3 19.418 3 21.907 4.54648 23.4535C6.09295 25 8.58197 25 13.56 25H14.44C19.418 25 21.907 25 23.4535 23.4535C25 21.907 25
                                    19.418 25 14.44V13.56C25 8.58197 25 6.09295 23.4535 4.54648C21.907 3 19.418 3 14.44 3H13.56C8.58197 3 6.09295 3 4.54648 4.54648ZM6.79999 10.15C6.91798 15.8728 9.92951 19.31 14.8932 19.31H15.1812V16.05C16.989 16.2332 18.3371
                                    17.5682 18.8875 19.31H21.4939C20.7869 16.7044 18.9535 15.2604 17.8141 14.71C18.9526 14.0293 20.5641 12.3893 20.9436 10.15H18.5722C18.0747 11.971 16.5945 13.6233 15.1803 13.78V10.15H12.7711V16.5C11.305 16.1337 9.39237 14.3538 9.314 10.15H6.79999Z"
                                fill="white"
                            />
                        </svg>
                        <span>Войти через VK ID</span>
                    </Button>
                    <Button disabled theme={ThemeButton.YANDEX} className={styles.apiAuthBtn}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z" fill="#FC3F1D" />
                            <path d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z" fill="#fff" />
                        </svg>
                        <span>Войти через Яндекс ID</span>
                    </Button>
                </VStack>

                <hr className={classNames(styles.orSignIn, { [styles.orSignInRus]: i18n.language === 'ru' }, [])} />

                {
                    error && (
                        <Error error={error} className={styles.msgError} />
                    )
                }
                <Input
                    autofocus
                    label={t('Почта')}
                    placeholder={t('Введите вашу почту')}
                    type="text"
                    required
                    onChange={onChangeEmail}
                    value={email}
                    className={styles.input}
                />
                <Input
                    label={t('Пароль')}
                    placeholder={t('Введите ваш пароль')}
                    isPassword
                    isForgetPassword
                    type="password"
                    className={styles.input}
                    onChange={onChangePassword}
                    required
                    value={password}
                />

                <HStack max align="start" className={styles.captcha}>
                    <SmartCaptcha
                        onSuccess={handleToken}
                        language={i18n.language === 'ru' ? 'ru' : 'en'}
                        sitekey="ysc1_EHY5MdaMoXTQyt6JAz7eIKKffgSVknjsNxbZQ5TY71ef0a6d"
                    />
                </HStack>

                <Checkbox
                    label={t('Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и пользовательским соглашением')}
                    checked={checked}
                    id="loginCheck"
                    onToggle={handleChange}
                />

                <Button
                    disabled={isLoading || isEmailInvalid || isPasswordInvalid || !checked || !submitEnabled}
                    className={styles.loginBtn}
                    theme={ThemeButton.DEFAULT}
                    onClick={onLoginClick}
                >
                    {
                        isLoading ? <Loader theme={ThemeLoader.BTN_LOADER} /> : <span>{t('Войти')}</span>
                    }
                </Button>
                <HStack max justify="center" align="center" gap="4">
                    <Text title={t('Еще нет аккаунта?')} bold={TextBold.MEDIUM} size={TextSize.XS} gap="0" />

                    <Button
                        theme={ThemeButton.CLEAR}
                        className={styles.registration}
                        onClick={navigateToRegistration}
                    >
                        {t('Зарегестрироваться')}
                    </Button>
                </HStack>

            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
