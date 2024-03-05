/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { ChangeEventHandler, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { Error } from 'shared/ui/Error/Error';
import InputMask from 'react-input-mask';
import { ValidateRegistrationPersonalDataError } from '../../../model/types/registrationSchema';
import { getRegistrationFirstname, getRegistrationLastname } from '../../../model/selectors/getRegistration/getRegistration';
import styles from './PersonalInfoBlockComponent.module.scss';

interface PersonalInfoBlockComponentProps {
  className?: string;
  onChangeFirstname: (value: string) => void;
  onChangeLastname: (value: string) => void;
  phone: string;
  onChangePhone: ChangeEventHandler<HTMLInputElement>;
  personalInfoErrors?: ValidateRegistrationPersonalDataError[];
}

export const PersonalInfoBlockComponent = memo((props: PersonalInfoBlockComponentProps) => {
    const { t } = useTranslation();
    const {
        onChangeFirstname, onChangePhone, phone, onChangeLastname, className, personalInfoErrors,
    } = props;

    const firstname = useSelector(getRegistrationFirstname);

    const lastname = useSelector(getRegistrationLastname);

    const validatePersonalDataErrorsTranslations = {
        [ValidateRegistrationPersonalDataError.EMPTY_DATA]: t(
            'Имя и фамилия - обязательные поля',
        ),
        [ValidateRegistrationPersonalDataError.NOT_VALID_PHONE_NUMBER]: t(
            'Номер телефона указан неправильно',
        ),
        [ValidateRegistrationPersonalDataError.TOO_SHORT_FIRSTNAME]: t('Поле Имя* должно иметь мин. 3 символа'),
        [ValidateRegistrationPersonalDataError.TOO_SHORT_LASTNAME]: t('Поле Фамилия* должно иметь мин. 3 символа'),
    };

    return (
        <VStack max className={classNames(styles.PersonalInfoBlockComponent, {}, [className])}>

            <HStack max gap="32">
                <Input
                    autofocus
                    label={t('Имя')}
                    placeholder={t('Введите имя')}
                    type="text"
                    onChange={onChangeFirstname}
                    value={firstname}
                    required
                />
                <Input
                    label={t('Фамилия')}
                    placeholder={t('Введите фамилию')}
                    value={lastname}
                    onChange={onChangeLastname}
                    type="text"
                    required
                />
            </HStack>

            <div className={styles.FieldBox}>
                <label
                    htmlFor={t('Номер телефона')}
                    className={styles.label}
                >
                    Номер телефона
                </label>
                <div className={styles.InputWrapper}>
                    <InputMask
                        mask="+7 (999) 999-99-99"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        id={t('Номер телефона')}
                        name={t('Номер телефона')}
                        onChange={onChangePhone}
                        className={styles.input}
                    />
                </div>

            </div>

            <Text
                text={t('* Номер телефона указывать при регистрации не обязательно. Вы можете указать его после регистрации в своем личном кабинете, для того чтобы нам было удобнее связаться с вами для уточнения деталей заказа.')}
                gap="0"
                className={styles.hint}
            />

            {
                personalInfoErrors?.length ? personalInfoErrors.map((err) => (
                    <Error
                        key={err}
                        error={validatePersonalDataErrorsTranslations[err]}
                    />
                )) : null
            }

        </VStack>
    );
});
