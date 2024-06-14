/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Cookie.module.scss';
import CookieIcon from '@/shared/assets/images/cookie_icon.svg';
import { HStack } from '../Stack';
import { Text, TextBold } from '../Text/Text';
import { Button, ThemeButton } from '../Button/Button';

interface CookieProps {
  className?: string;
  acceptCookie: () => void;
  rejectCookie: () => void;
}

export const Cookie = memo((props: CookieProps) => {
    const { t } = useTranslation();

    const { className, acceptCookie, rejectCookie } = props;

    return (
        <HStack gap="32" className={classNames(styles.Cookie, { }, [className])}>
            <CookieIcon className={styles.icon} />

            <Text
                gap="0"
                bold={TextBold.BOLD}
                text="Мы используем cookies для быстрой
                 и удобной работы сайта. Продолжая использовать наш сайт, вы даете согласие
                  на обработку файлов cookie и принимаете условия обработки персональных данных."
            />

            <HStack max gap="16" justify="end">
                <Button onClick={acceptCookie} theme={ThemeButton.DEFAULT}>
                    {t('Принять все')}
                </Button>
                <Button onClick={rejectCookie} theme={ThemeButton.OUTLINE}>
                    {t('Отклонить')}
                </Button>
            </HStack>

        </HStack>
    );
});
