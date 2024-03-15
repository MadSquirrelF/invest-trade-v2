/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Error } from '@/shared/ui/Error/Error';
import { Loader, ThemeLoader } from '@/shared/ui/Loader/Loader';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import Google from '@/shared/assets/icons/google.svg';
import { HStack } from '@/shared/ui/Stack';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail';
import { loginByEmail } from '../../model/services/loginByEmail';
import styles from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getRouteRegistration } from '@/shared/const/router';

export interface LoginFormProps {
 className?: string;
 onSuccess: () => void;
}

const initialReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const forceUpdate = useForceUpdate();

    const isEmailInvalid = !email || !email.length;

    const isPasswordInvalid = !password || !password.length;

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

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByEmail({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
        }
    }, [dispatch, email, password, onSuccess, forceUpdate]);

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
                <Button theme={ThemeButton.GOOGLE} className={styles.google}>
                    <Google />
                    <span>Sign in with Google</span>
                </Button>
                <hr className={styles.orSignIn} />

                {
                    error && (
                        <Error error={error} className={styles.msgError} />
                    )
                }
                <Input
                    autofocus
                    label={t('Почта')}
                    placeholder={t('Введите почту')}
                    type="text"
                    required
                    onChange={onChangeEmail}
                    value={email}
                />
                <Input
                    label={t('Пароль')}
                    placeholder={t('Введите пароль')}
                    isPassword
                    isForgetPassword
                    type="password"
                    className={styles.password}
                    onChange={onChangePassword}
                    required
                    value={password}
                />

                <Button
                    disabled={isLoading || isEmailInvalid || isPasswordInvalid}
                    className={styles.loginBtn}
                    theme={ThemeButton.DEFAULT}
                    onClick={onLoginClick}
                >
                    {
                        isLoading ? <Loader theme={ThemeLoader.BTN_LOADER} /> : <span>{t('Войти')}</span>
                    }
                </Button>
                <HStack max justify="center" align="center" gap="4">
                    <Text title={t('Еще не аккаунта?')} bold={TextBold.MEDIUM} size={TextSize.XS} gap="0" />

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
