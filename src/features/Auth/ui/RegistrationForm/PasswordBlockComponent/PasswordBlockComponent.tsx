/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input/Input';
import { Error } from '@/shared/ui/Error/Error';
import { ValidateRegistrationPasswordError } from '../../../model/types/registrationSchema';
import { getRegistrationPassword, getRegistrationRepeatPassword } from '../../../model/selectors/getRegistration/getRegistration';
import styles from './PasswordBlockComponent.module.scss';
import { PasswordStrength } from '@/shared/ui/PasswordStrength/PasswordStrength';

interface PasswordBlockComponentProps {
  className?: string;
  onChangePassword?: (value: string) => void;
  onChangeRepeatPassword?: (value: string) => void;
  passwordErrors?: ValidateRegistrationPasswordError[];
}

export const PasswordBlockComponent = memo((props: PasswordBlockComponentProps) => {
    const { t } = useTranslation();

    const {
        className,
        onChangePassword,
        onChangeRepeatPassword,
        passwordErrors,
    } = props;

    const validatePasswordErrorsTranslations = {
        [ValidateRegistrationPasswordError.EMPTY_PASSWORD]: t(
            'Пароль пуст',
        ),
        [ValidateRegistrationPasswordError.NO_MATCH_PASSWORDS]: t('Пароли не совпадают'),
        [ValidateRegistrationPasswordError.TOO_SHORT_PASSWORD]: t('Пароль слишком короткий'),
        [ValidateRegistrationPasswordError.SERVER_ERROR]: t('Неверный старый пароль'),
    };

    const password = useSelector(getRegistrationPassword);
    const repeatPassword = useSelector(getRegistrationRepeatPassword);

    const [meter, setMeter] = useState(false);

    return (

        <VStack max className={classNames(styles.PasswordBlockComponent, {}, [className])}>

            <HStack max className={styles.passwordWrapper}>
                <Input
                    autofocus
                    onBlur={() => setMeter(false)}
                    onFocus={() => setMeter(true)}
                    label={t('Пароль')}
                    placeholder={t('Введите пароль')}
                    isPassword
                    type="password"
                    required
                    className={styles.input}
                    value={password}
                    onChange={onChangePassword}
                />
                <CSSTransition
                    in={meter}
                    timeout={300}
                    unmountOnExit
                    classNames="slide-animation"
                >
                    <PasswordStrength password={password} className={styles.passwordPosition} />
                </CSSTransition>

            </HStack>

            <Input
                label={t('Повторите пароль')}
                placeholder={t('Повторно введите пароль')}
                isPassword
                value={repeatPassword}
                onChange={onChangeRepeatPassword}
                type="password"
                required
                className={styles.input}
            />

            {
                passwordErrors?.length ? passwordErrors.map((err) => (
                    <Error
                        key={err}
                        error={validatePasswordErrorsTranslations[err]}
                    />
                )) : null
            }
        </VStack>
    );
});
