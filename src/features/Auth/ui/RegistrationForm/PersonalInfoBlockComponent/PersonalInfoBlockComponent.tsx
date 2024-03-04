/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import {
    ChangeEvent, ChangeEventHandler, memo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import InputMask from 'react-input-mask';
import { useSelector } from 'react-redux';
import { ValidateRegistrationPersonalDataError } from '../../../model/types/registrationSchema';
import { getRegistrationFirstname, getRegistrationLastname, getRegistrationPhoneNumber } from '../../../model/selectors/getRegistration/getRegistration';
import styles from './PersonalInfoBlockComponent.module.scss';

interface PersonalInfoBlockComponentProps {
  className?: string;
  onChangeFirstname: (value: string) => void;
  onChangeLastname: (value: string) => void;
  personalInfoErrors?: ValidateRegistrationPersonalDataError[];
}

export const PersonalInfoBlockComponent = memo((props: PersonalInfoBlockComponentProps) => {
    const { t } = useTranslation();
    const {
        onChangeFirstname, onChangeLastname, className, personalInfoErrors,
    } = props;

    const [value, setValue] = useState('');

    const firstname = useSelector(getRegistrationFirstname);

    const lastname = useSelector(getRegistrationLastname);

    const phone = useSelector(getRegistrationPhoneNumber);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
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

            <InputMask
                mask="+7 (999) 999-99-99"
                value={value}
                onChange={onChangeInput}
            >
                <Input
                    label={t('Номер телефона *')}
                    placeholder="+7 (___) ___-__-__"
                    type="text"
                />
            </InputMask>
            <div>{value}</div>

            <Text
                text={t('* Номер телефона указывать при регистрации не обязательно. Вы можете указать его после регистрации в своем личном кабинете, для того чтобы нам было удобнее связаться с вами для уточнения деталей заказа.')}
                gap="0"
            />
        </VStack>
    );
});
