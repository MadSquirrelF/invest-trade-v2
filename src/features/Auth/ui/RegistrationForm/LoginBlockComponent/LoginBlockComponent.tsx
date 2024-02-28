/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Input } from 'shared/ui/Input/Input';
import styles from './LoginBlockComponent.module.scss';

interface LoginBlockComponentProps {
  className?: string;
}

export const LoginBlockComponent = memo(({ className }: LoginBlockComponentProps) => {
    const { t } = useTranslation();
    return (
        <VStack max className={classNames(styles.LoginBlockComponent, {}, [className])}>
            <Input
                autofocus
                label={t('Логин')}
                placeholder={t('Придумайте ваш логин')}
                type="text"
                required
            />

            <Input
                label={t('Почта')}
                placeholder={t('Введите почту')}
                type="text"
                required
            />
        </VStack>
    );
});
