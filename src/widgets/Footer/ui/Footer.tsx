/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Input } from 'shared/ui/Input/Input';
import Logo from 'shared/assets/icons/logo.svg';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Text, TextBold, TextSize } from 'shared/ui/Text/Text';
import MessageSend from 'shared/assets/images/message-send.svg';
import MessageSendDark from 'shared/assets/images/message-send-dark.svg';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { SizeL } from 'shared/ui/Text/Text.stories';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
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
            <HStack max>
                <VStack max>

                    <HStack max gap="32" className={styles.box} justify="between">
                        <Logo className={styles.logo} />
                        <Text
                            text="“Обеспечить оконных производителей надежными и долговечными комплектующими, способствуя созданию комфортных и безопасных условий для жизни людей.”"
                            gap="0"
                            size={TextSize.M}
                            className={styles.missionText}
                        />
                    </HStack>

                    <HStack gap="16" max justify="start" className={styles.box}>
                        <VStack max justify="start" gap="16" align="start">
                            <Text
                                bold={TextBold.MEDIUM}
                                size={TextSize.S}
                                title={t('Ресурсы')}
                                gap="8"
                            />

                            <AppLink to="/">
                                Почему инвест-трейд?
                            </AppLink>
                            <AppLink to="/">
                                Блог
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
                                size={TextSize.S}
                                title={t('Компания')}
                                gap="8"
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
                        </VStack>
                        <VStack max gap="16" align="start">
                            <Text
                                bold={TextBold.MEDIUM}
                                size={TextSize.S}
                                title={t('Социальные сети')}
                                gap="8"
                            />
                            <AppLink to="/">
                                Вконтакте
                            </AppLink>
                            <AppLink to="/">
                                Инстаграмм
                            </AppLink>
                            <AppLink to="/">
                                Телеграмм
                            </AppLink>
                            <AppLink to="/">
                                Почта
                            </AppLink>
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

                <Text
                    bold={TextBold.MEDIUM}
                    size={TextSize.M}
                    text={t('© 2024. Все права защищены')}
                    gap="0"
                    className={styles.link}
                />
                <AppLink to="/" className={styles.link}>
                    Поддержка
                </AppLink>
                <AppLink to="/" className={styles.link}>
                    Политика конфиденциальности
                </AppLink>
                <AppLink to="/" className={styles.link}>
                    Условия использования
                </AppLink>
                <AppLink to="/" className={styles.link}>
                    Политика Cookie
                </AppLink>

            </HStack>
        </VStack>
    );
});
