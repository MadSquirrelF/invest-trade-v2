/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input/Input';
import Logo from '@/shared/assets/icons/logo.svg';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import MessageSend from '@/shared/assets/images/message-send.svg';
import Vk from '@/shared/assets/icons/vk.svg';
import Telegram from '@/shared/assets/icons/telegram.svg';
import Instagram from '@/shared/assets/icons/inst.svg';
import MessageSendDark from '@/shared/assets/images/message-send-dark.svg';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import styles from './Footer.module.scss';

interface FooterProps {
  className?: string;
}

export const Footer = memo(({ className }: FooterProps) => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    const [email, setEmail] = useState('');

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    const isEmailInvalid = !email || !email.length;

    const onChangeEmail = useCallback((value: string) => {
        setEmail(value.trim());
    }, []);

    return (
        <VStack max justify="end" className={classNames(styles.Footer, {}, [className])}>
            <HStack max align="start" className={styles.wrapper}>
                <VStack max>

                    <HStack max gap="32" className={classNames(styles.box, {}, [styles.logoWrapper])} justify="between">
                        <Logo className={styles.logo} />
                        <Text
                            text="“Обеспечить оконных производителей надежными и долговечными комплектующими, способствуя созданию комфортных и безопасных условий для жизни людей.”"
                            gap="0"
                            size={TextSize.M}
                            className={styles.missionText}
                        />
                    </HStack>

                    <HStack gap="16" max justify="start" align="start" className={classNames(styles.box, {}, [styles.linksWrapper])}>
                        <VStack max justify="start" gap="16" align="start">
                            <Text
                                bold={TextBold.MEDIUM}
                                size={TextSize.M}
                                title={t('Ресурсы')}
                                gap="16"
                            />

                            <AppLink to="/">
                                Почему инвест-трейд?
                            </AppLink>
                            <AppLink to="/">
                                Блог
                            </AppLink>

                        </VStack>
                        <VStack max gap="16" align="start">
                            <Text
                                bold={TextBold.MEDIUM}
                                size={TextSize.M}
                                title={t('Компания')}
                                gap="16"
                            />
                            <AppLink to="/">
                                О компании
                            </AppLink>
                            <AppLink to="/">
                                Магазин
                            </AppLink>
                            <AppLink to="/">
                                FAQ
                            </AppLink>
                            <AppLink to="/">
                                Котакты
                            </AppLink>
                            <AppLink to="/">
                                Новости
                            </AppLink>
                            <AppLink to="/">
                                Отзывы
                            </AppLink>
                        </VStack>
                        <VStack max gap="16" align="start">
                            <Text
                                bold={TextBold.MEDIUM}
                                size={TextSize.M}
                                title={t('Социальные сети')}
                                gap="16"
                            />
                            <HStack max gap="8">
                                <AppLink to="/">
                                    <Vk className={styles.social} />
                                </AppLink>
                                <AppLink to="/">
                                    <Telegram className={styles.social} />
                                </AppLink>
                                <AppLink to="/">
                                    <Instagram className={styles.social} />
                                </AppLink>
                            </HStack>

                        </VStack>
                    </HStack>

                </VStack>
                <VStack max className={styles.contact} gap="32">
                    <Text className={styles.add} gap="0" />
                    <Text
                        title="Есть вопросы? Не стесняйтесь написать нам!"
                        gap="16"
                        size={TextSize.XL}
                        bold={TextBold.BOLD}
                        text="Мы рады, что вы решили связаться с нами. Наша команда всегда на связи для ответа. Мы свяжемся с вами как можно скорее после получения вашей почты."
                    />
                    <form
                        className={styles.form}
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <Input required value={email} onChange={onChangeEmail} placeholder="Введите вашу почту" label="Email" />
                        <Checkbox
                            label="Продолжая, вы соглашаетесьсо сбором и обработкой персональных данных и пользовательским соглашением"
                            checked={checked}
                            onToggle={handleChange}
                        />
                        <Button disabled={isEmailInvalid || !checked} type="submit" theme={ThemeButton.DEFAULT}>Отправить</Button>
                    </form>

                </VStack>
            </HStack>
            <HStack max justify="start" align="center" gap="16" className={styles.links}>
                {
                    theme === Theme.LIGHT
                        ? <MessageSend className={styles.sendMessage} />
                        : <MessageSendDark className={styles.sendMessage} />
                }

                <p className={styles.link}>© 2024. Все права защищены</p>
                <AppLink to="/" className={styles.link}>
                    Политика конфиденциальности
                </AppLink>
                <AppLink to="/" className={styles.link}>
                    Условия использования
                </AppLink>
                <AppLink to="/" className={styles.link}>
                    Политика Cookie
                </AppLink>
                <AppLink to="/" className={styles.link}>
                    Поддержка
                </AppLink>

            </HStack>
        </VStack>
    );
});
