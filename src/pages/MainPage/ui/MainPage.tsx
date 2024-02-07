/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { Text, TextBold, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';
import { HStack, VStack } from 'shared/ui/Stack';
import Window from 'shared/assets/images/window-main.svg';
import ArrowRight from 'shared/assets/icons/arrow-right.svg';
import BackgroundLightBoard from 'shared/assets/images/background-light-board.svg';
import CircleLoad from 'shared/assets/icons/svg_load.svg';
import Newspaper from 'shared/assets/images/newspaper.svg';
import Calculator from 'shared/assets/images/calc.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import styles from './MainPage.module.scss';

const MainPage = () => {
    const { t } = useTranslation('main');
    return (
        <Page>
            <Text gap="16" title={t('Главная страница')} size={TextSize.L} bold={TextBold.BOLD} />
            <HStack gap="32" align="start" max justify="start" className={styles.wrapper}>
                <VStack gap="32" max align="start">
                    <HStack gap="16" align="start" max className={styles.block}>

                        <VStack gap="16" max align="start">

                            <h1 className="title">
                                Ваш партнер
                                <span className="titleBlue"> в оконном бизнесе!</span>
                            </h1>

                            <Text
                                gap="16"
                                // eslint-disable-next-line max-len
                                text={t('Мы являемся официальным поставщиком оборудования и материалов для производства пластиковых и алюминиевых конструкций')}
                                size={TextSize.XL}
                                bold={TextBold.BOLD}
                            />

                        </VStack>

                        <Window className={styles.windowIcon} />
                    </HStack>
                    <HStack gap="32" align="start" max>
                        <VStack gap="16" max align="start" justify="between" className={styles.blockSmall}>
                            <VStack gap="16" max align="start">

                                <Text
                                    gap="16"
                                    title={t('Онлайн калькулятор')}
                                    text={t('Узнайте точную стоимость установки окон с учетом ваших потребностей и бюджета!')}
                                    size={TextSize.XL}
                                    bold={TextBold.BOLD}
                                    className={styles.calc}
                                />
                            </VStack>

                            <Calculator className={styles.OutsideIcon} />

                            <Button type="button" theme={ThemeButton.SVG_CIRCLE}>
                                <ArrowRight />
                            </Button>

                        </VStack>
                        <VStack gap="16" max align="start" justify="between" className={styles.blockSmall}>
                            <VStack gap="16" max align="start">

                                <Text
                                    gap="16"
                                    title={t('Последние новости')}
                                    text={t('1 февраля 2024')}
                                    size={TextSize.XL}
                                    bold={TextBold.BOLD}
                                    className={styles.news}
                                />
                            </VStack>

                            <Newspaper className={styles.OutsideIcon} />

                            <Button type="button" theme={ThemeButton.SVG_CIRCLE}>
                                <ArrowRight />
                            </Button>

                        </VStack>
                    </HStack>
                </VStack>
                <VStack className={styles.blockBig} gap="16" align="start" max>
                    <h2 className="subtitle">
                        Всё для оконного бизнеса теперь в сети!
                    </h2>

                    <BackgroundLightBoard className={styles.bigBoardBg} />

                    <HStack max gap="8" align="start" justify="start">
                        <CircleLoad className={styles.circleSvgLoader} />
                        <Text
                        // eslint-disable-next-line max-len
                            gap="16"
                            text={t('Оформляйте заказ с вашего компьютера, планшета или телефона, наши менеджеры свяжутся с вами для уточнения деталей')}
                            size={TextSize.XL}
                            bold={TextBold.BOLD}
                        />
                        <Button type="button" theme={ThemeButton.DEFAULT} className={styles.orderBtn}>Заказать</Button>
                    </HStack>

                </VStack>

            </HStack>

        </Page>
    );
};

export default MainPage;
