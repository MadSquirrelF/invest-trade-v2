/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input/Input';
import { Error } from '@/shared/ui/Error/Error';
import { ValidateRegistrationEmailError } from '../../../model/types/registrationSchema';
import styles from './LoginBlockComponent.module.scss';
import {
    getRegistrationEmail,
    getRegistrationUsername,
} from '../../../model/selectors/getRegistration/getRegistration';

interface LoginBlockComponentProps {
  className?: string;
  onChangeEmail: (value: string) => void;
  onChangeLogin: (value: string) => void;
  emailErrors?: ValidateRegistrationEmailError[];
}

export const LoginBlockComponent = memo((props: LoginBlockComponentProps) => {
    const { t } = useTranslation();

    const email = useSelector(getRegistrationEmail);
    const login = useSelector(getRegistrationUsername);

    const validateEmailErrorsTranslations = {
        [ValidateRegistrationEmailError.EMPTY_DATA]: t(
            'Логин и почта - обязательные поля',
        ),
        [ValidateRegistrationEmailError.NOT_VALID_EMAIL]: t('Такой почты не существует'),
        [ValidateRegistrationEmailError.TOO_SHORT_LOGIN]: t('Поле логин* должен иметь мин. 3 символа'),
    };

    const {
        className,
        onChangeEmail,
        onChangeLogin,
        emailErrors,
    } = props;

    return (
        <VStack max className={classNames(styles.LoginBlockComponent, {}, [className])}>
            <Input
                autofocus
                label={t('Логин')}
                placeholder={t('Введите логин')}
                onChange={onChangeLogin}
                value={login}
                type="text"
                required
                className={styles.input}
            />

            <Input
                label={t('Почта')}
                placeholder={t('Введите почту')}
                type="text"
                value={email}
                onChange={onChangeEmail}
                required
                className={styles.input}
            />

            {
                emailErrors?.length ? emailErrors.map((err) => (
                    <Error
                        key={err}
                        error={validateEmailErrorsTranslations[err]}
                    />
                )) : null
            }
        </VStack>
    );
});
