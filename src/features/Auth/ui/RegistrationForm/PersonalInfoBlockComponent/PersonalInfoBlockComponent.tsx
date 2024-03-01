/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { HStack, VStack } from 'shared/ui/Stack';
import styles from './PersonalInfoBlockComponent.module.scss';

interface PersonalInfoBlockComponentProps {
  className?: string;
}

export const PersonalInfoBlockComponent = memo(({ className }: PersonalInfoBlockComponentProps) => {
    const { t } = useTranslation();
    return (
        <VStack max className={classNames(styles.PersonalInfoBlockComponent, {}, [className])}>

            <HStack max gap="32">
                <Input
                    autofocus
                    label={t('Имя')}
                    placeholder={t('Введите имя')}
                    type="text"
                    required
                />
                <Input
                    label={t('Фамилия')}
                    placeholder={t('Введите фамилию')}
                    type="text"
                    required
                />
            </HStack>

            <Input
                label={t('Номер телефона')}
                placeholder={t('Введите номер телефона')}
                type="text"
                required
            />
        </VStack>
    );
});
