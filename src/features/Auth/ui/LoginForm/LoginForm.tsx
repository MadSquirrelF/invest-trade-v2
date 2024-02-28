/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Error } from 'shared/ui/Error/Error';
import { Loader, ThemeLoader } from 'shared/ui/Loader/Loader';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Text, TextBold, TextSize } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import Google from 'shared/assets/icons/google.svg';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail';
import { loginByEmail } from '../../model/services/loginByEmail';
import styles from './LoginForm.module.scss';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

export interface LoginFormProps {
 className?: string;
 onSuccess: () => void;
}

const initialReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const isEmailInvalid = !email || !email.length;
    const isPasswordInvalid = !password || !password.length;

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
        }
    }, [onSuccess, dispatch, password, email]);

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
                <Button theme={ThemeButton.OUTLINE} className={styles.google}>
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
                <span className={styles.account}>
                    {t('Еще не аккаунта?')}
                    <AppLink
                        theme={AppLinkTheme.DEFAULT}
                        className="link"
                        to="/"
                    >
                        {t('Зарегестрироваться')}
                    </AppLink>
                </span>

            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
