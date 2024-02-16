/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';

import { Page } from 'widgets/Page/Page';
import { Text, TextBold, TextSize } from 'shared/ui/Text/Text';
import { Breadcrumbs } from 'shared/ui/Breadcrumbs/Breadcrumbs';
import { HStack, VStack } from 'shared/ui/Stack';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import bannerLight from 'shared/assets/images/aboutPage-banner.png';
import bannerDark from 'shared/assets/images/aboutPage-banner-dark.png';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
    const { t } = useTranslation('about');

    const { theme } = useTheme();
    return (
        <Page>
            <Breadcrumbs />
            <VStack max gap="32" className={classNames('block', {}, [])}>
                <VStack max align="start" gap="32" className={styles.steps}>
                    <Text
                        gap="16"
                        title={t('Делаем окна, которые служат до 50 лет')}
                        text={t('ИНВЕСТ-ТРЕЙД – это поставщик оконного профиля из ПВХ и алюминия, оконной фурнитуры и комплектующих, оборудования для производства окон.')}
                        size={TextSize.XXL}
                        bold={TextBold.BOLD}
                        className={styles.title}
                    />
                    <Button type="button" theme={ThemeButton.DEFAULT}>
                        {t('Подробнее')}
                    </Button>
                </VStack>
                <HStack max justify="between" align="start" className={styles.info}>
                    <Text
                        gap="16"
                        title={t('О компании')}
                        size={TextSize.XL}
                        bold={TextBold.BOLD}
                    />

                    <VStack gap="32" className={styles.text}>
                        <Text
                            gap="16"
                            text={t('Уже более 10 лет мы помогаем создать уют в домах наших клиентов. С каждым годом мы улучшаем свой сервис на основе ваших отзывов, и делаем все, чтобы вам было приятно с нами работать.')}
                            size={TextSize.XL}
                            bold={TextBold.BOLD}
                        />
                        <Text
                            gap="16"
                            text={t('В нашем уютном коллективе только истинные специалисты, которые подберут идеально решение и расшифруют все технические нюансы на понятном вам языке.')}
                            size={TextSize.XL}
                            bold={TextBold.BOLD}
                        />
                        <Text
                            gap="16"
                            text={t('Для наших клиентов мы, предлагаем полный комплекс услуг: начиная от поставки и наладки оборудования до снабжения всеми необходимыми для производства материалами и комплектующими, включая отработанную технологию производства.')}
                            size={TextSize.XL}
                            bold={TextBold.BOLD}
                        />
                    </VStack>

                </HStack>
                <HStack max justify="between" align="start" className={styles.info}>
                    <Text
                        gap="16"
                        title={t('Наша миссия')}
                        size={TextSize.XL}
                        bold={TextBold.BOLD}
                    />

                    <VStack gap="32" className={styles.text}>
                        <Text
                            gap="16"
                            text={t('“Обеспечить оконных производителей надежными и долговечными комплектующими, способствуя созданию комфортных и безопасных условий для жизни людей.”')}
                            size={TextSize.XL}
                            bold={TextBold.BOLD}
                        />
                    </VStack>

                </HStack>

                <img
                    src={theme === Theme.LIGHT ? bannerLight : bannerDark}
                    alt={t('Мы рады помочь вам с установкой профилей!Мы работаем со строительными компаниями и выполняет остекление корпоративных заказов под ключ.')}
                    draggable={false}
                    width="100%"
                    height="auto"
                    className={styles.banner}
                />

            </VStack>

        </Page>
    );
};

export default AboutPage;
