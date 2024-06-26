/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './PasswordStrength.module.scss';
import { VStack } from '../Stack/VStack/VStack';
import { Text, TextBold, TextSize } from '../Text/Text';
import Dot from '@/shared/assets/icons/dot.svg';
import Done from '@/shared/assets/icons/done.svg';

const PasswordStrenthArray = [
    'Минимум 6 символов',
    'Слабый пароль',
    'Средний пароль',
    'Хороший пароль',
    'Надежный пароль',
];

const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
const TenCharsOrMore = /.{10,}/g; // ten characters or more
const SixCharsOrMore = /.{10,}/g; // six characters or more

interface PasswordStrengthProps {
  password: string;
  className: string;
}

export const PasswordStrength = memo(({ className, password }: PasswordStrengthProps) => {
    const { t } = useTranslation();

    const passwordTracker = {
        uppercase: password.match(atLeastOneUppercase),
        lowercase: password.match(atLeastOneLowercase),
        number: password.match(atLeastOneNumeric),
        specialChar: password.match(atLeastOneSpecialChar),
        TenCharsOrGreater: password.match(TenCharsOrMore),
        SixCharsOrMore: password.match(SixCharsOrMore),
    };

    const passwordStrength = Object.values(passwordTracker).filter(
        (value) => value,
    ).length;

    const renderStrength = useCallback(
        (passwordStrength: number) => {
            switch (passwordStrength) {
            case 0:
                return PasswordStrenthArray[0];
            case 1:
                return PasswordStrenthArray[0];
            case 2:
                return PasswordStrenthArray[1];
            case 3:
                return PasswordStrenthArray[2];
            case 4:
                return PasswordStrenthArray[3];
            case 5:
                return PasswordStrenthArray[4];
            case 6:
                return PasswordStrenthArray[4];
            default:
                return PasswordStrenthArray[0];
            }
        },
        [],
    );

    return (
        <VStack gap="16" align="start" className={classNames(styles.PasswordStrength, {}, [className])}>

            <Text
                title={renderStrength(passwordStrength)}
                gap="0"
                bold={TextBold.BOLD}
                size={TextSize.S}
            />
            <div className={styles.steps}>
                <span className={classNames(styles.step, { [styles.active]: passwordStrength >= 2 }, [])} />
                <span className={classNames(styles.step, { [styles.active]: passwordStrength >= 3 }, [])} />
                <span className={classNames(styles.step, { [styles.active]: passwordStrength >= 4 }, [])} />
                <span className={classNames(styles.step, { [styles.active]: passwordStrength >= 5 }, [])} />
            </div>

            <Text
                text={t('Лучше всего иметь:')}
                gap="0"
                bold={TextBold.BOLD}
                size={TextSize.L}
            />
            <ul className={styles.list}>
                <li className={styles.item}>
                    {
                        passwordTracker.uppercase
                         && passwordTracker.lowercase
                            ? <Done className={styles.done} />
                            : <Dot className={styles.dot} />
                    }
                    {t('Заглавные и стандартные символы')}
                </li>
                <li className={styles.item}>
                    {
                        passwordTracker.specialChar
                            ? <Done className={styles.done} />
                            : <Dot className={styles.dot} />
                    }
                    {t('Символы (#$%^)')}
                </li>
                <li className={styles.item}>
                    {
                        passwordTracker.TenCharsOrGreater
                            ? <Done className={styles.done} />
                            : <Dot className={styles.dot} />
                    }
                    {t('Длинный пароль')}
                </li>
                <li className={styles.item}>
                    {
                        passwordTracker.number
                            ? <Done className={styles.done} />
                            : <Dot className={styles.dot} />
                    }
                    {t('Цифры (0-9)')}
                </li>
            </ul>
        </VStack>
    );
});
