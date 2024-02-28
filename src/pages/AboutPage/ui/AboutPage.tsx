/* eslint-disable i18next/no-literal-string */
/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';

import { Page } from 'widgets/Page/Page';
import {
    Text, TextAlign, TextBold, TextSize,
} from 'shared/ui/Text/Text';
import { Breadcrumbs } from 'shared/ui/Breadcrumbs/Breadcrumbs';
import { HStack, VStack } from 'shared/ui/Stack';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import bannerLight from 'shared/assets/images/aboutPage-banner.png';
import bannerDark from 'shared/assets/images/aboutPage-banner-dark.png';
import Line from 'shared/assets/images/about-line.svg';
import LineVertical from 'shared/assets/images/about-line-vertical.svg';
import { Theme, useTheme } from 'app/providers/ThemeProvider';

import Delivery from 'shared/assets/icons/delivery.svg';
import Window from 'shared/assets/icons/window.svg';
import Box from 'shared/assets/icons/box.svg';
import Planet from 'shared/assets/icons/planet.svg';
import SetUp from 'shared/assets/images/set up.png';
import Warehouse from 'shared/assets/images/warehouse.png';
import DeliveryImage from 'shared/assets/images/delivery.png';
import Russia from 'shared/assets/images/RussiaMap.png';
import { Footer } from 'widgets/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import MACO from 'shared/assets/images/MACO.svg';
import SCHTERN from 'shared/assets/images/Schtern.svg';
import RINGER from 'shared/assets/images/RINGER.svg';
import { useSelector } from 'react-redux';
import { getWidth } from 'features/SizeSave';
import CountUp from 'react-countup';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.scss';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
    const { t } = useTranslation('about');

    const { theme } = useTheme();

    const width = useSelector(getWidth);

    return (
        <Page>
            <Breadcrumbs />
            <VStack max gap="32" align="start" className={classNames('block', {}, [])}>
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
                    <div className={styles.lineContainer}>
                        <Line className={styles.line} />
                        <LineVertical className={styles.lineVertical} />
                        <div className={classNames(styles.box, {}, [styles.first])}>
                            <VStack align="start" gap="32" className={styles.boxWrapper}>
                                <div className={styles.square}>
                                    <div className={styles.center} />
                                </div>
                                <Text
                                    gap="16"
                                    title={t(' год')}
                                    text={t('Дата открытия компании в Челябинске!')}
                                    size={TextSize.L}
                                    bold={TextBold.BOLD}
                                >
                                    <CountUp
                                        start={1000}
                                        end={2008}
                                        duration={2}
                                        delay={0}
                                        className="count"
                                    />
                                </Text>
                                <span className={styles.number}>1</span>
                            </VStack>

                        </div>
                        <div className={classNames(styles.box, {}, [styles.second])}>
                            <VStack align="start" gap="32" className={styles.boxWrapper}>
                                <div className={styles.square}>
                                    <div className={styles.center} />
                                </div>
                                <Text
                                    gap="16"
                                    title={t('+ лет')}
                                    text={t('Гарантированный срок службы профиля!')}
                                    size={TextSize.L}
                                    bold={TextBold.BOLD}
                                >
                                    <CountUp
                                        start={1}
                                        end={50}
                                        duration={2}
                                        delay={0}
                                        className="count"
                                    />
                                </Text>
                                <span className={styles.number}>2</span>
                            </VStack>

                        </div>
                        <div className={classNames(styles.box, {}, [styles.third])}>
                            <VStack align="start" gap="32" className={styles.boxWrapper}>
                                <div className={styles.square}>
                                    <div className={styles.center} />
                                </div>
                                <HStack gap="8" align="start" justify="center">
                                    <Text
                                        gap="16"
                                        title={t('+ клиентов')}
                                        text={t('Довольных нашей работой и желающих стать нашими партнерами')}
                                        size={TextSize.L}
                                        bold={TextBold.BOLD}
                                    >
                                        <CountUp
                                            start={100}
                                            end={1000}
                                            duration={2}
                                            delay={0}
                                            className="count"
                                        />
                                    </Text>
                                </HStack>

                                <span className={styles.number}>3 </span>
                            </VStack>

                        </div>
                    </div>

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

                <div className={styles.work}>
                    <Text
                        gap="0"
                        title={t('Как мы работаем')}
                        size={TextSize.M}
                        bold={TextBold.BOLD}
                    />
                </div>

                <HStack max gap="32" justify="between" className={styles.info}>
                    <h2 className="title">
                        {t('Если вам нужна помощь с данными вопросами, ')}
                        <span className="titleBlue">{t('скорее обращайтесь к нам!')}</span>
                    </h2>
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

                    </VStack>
                </HStack>

                <VerticalTimeline lineColor="var(--active-color-default)">
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'var(--bg-secondary)' }}
                        iconStyle={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        icon={<Delivery />}
                    >
                        <img className={styles.TimeLineImg} src={DeliveryImage} alt="GDFS" width="100%" height="auto" draggable={false} />
                        <Text
                            title="Доставка"
                            text="Наша компания заботится о своих клиентах и предлагает различные способы доставки. Вы можете выбрать стандартную доставку, которая осуществляется в течение нескольких дней, или экспресс-доставку, если Вам необходимо получить окна как можно быстрее. Также доступна вечерняя доставка и самовывоз со склада. Наши опытные специалисты аккуратно и бережно доставят Ваши окна, чтобы они прослужили Вам долгие годы и обеспечивали комфорт в доме или офисе. Выбирайте нас, и мы поможем Вам создать светлое и теплое пространство!"
                            size={TextSize.L}
                            bold={TextBold.BOLD}
                            gap="16"
                        />
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'var(--bg-secondary)' }}
                        iconStyle={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        icon={<Window />}
                    >
                        <img className={styles.TimeLineImg} src={Warehouse} alt="GDFS" width="100%" height="auto" draggable={false} />
                        <Text
                            title="Всегда под рукой"
                            text="У нас на складе всегда в наличии широкий ассортимент оконных конструкций различных размеров и конфигураций. Мы следим за тем, чтобы наши клиенты могли быстро и удобно подобрать подходящие окна для своего дома или офиса."
                            size={TextSize.L}
                            bold={TextBold.BOLD}
                            gap="16"
                        />
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'var(--bg-secondary)' }}
                        iconStyle={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        icon={<Box />}
                    >
                        <img className={styles.TimeLineImg} src={SetUp} alt="Полная комплектация" width="100%" height="auto" draggable={false} />
                        <Text
                            title="Полная комплектация"
                            text="Наша компания заботится о своих клиентах и предлагает различные способы доставки. Вы можете выбрать стандартную доставку, которая осуществляется в течение нескольких дней, или экспресс-доставку, если Вам необходимо получить окна как можно быстрее. Также доступна вечерняя доставка и самовывоз со склада. Наши опытные специалисты аккуратно и бережно доставят Ваши окна, чтобы они прослужили Вам долгие годы и обеспечивали комфорт в доме или офисе. Выбирайте нас, и мы поможем Вам создать светлое и теплое пространство!"
                            size={TextSize.L}
                            bold={TextBold.BOLD}
                            gap="32"
                        />
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'var(--bg-secondary)' }}
                        iconStyle={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        icon={<Planet />}
                    >
                        <img className={styles.TimeLineImg} src={Russia} alt="По всей России" width="100%" height="auto" draggable={false} />
                        <Text
                            title="По всей России"
                            text="Наша компания заботится о своих клиентах и предлагает различные способы доставки. Вы можете выбрать стандартную доставку, которая осуществляется в течение нескольких дней, или экспресс-доставку, если Вам необходимо получить окна как можно быстрее. Также доступна вечерняя доставка и самовывоз со склада. Наши опытные специалисты аккуратно и бережно доставят Ваши окна, чтобы они прослужили Вам долгие годы и обеспечивали комфорт в доме или офисе. Выбирайте нас, и мы поможем Вам создать светлое и теплое пространство!"
                            size={TextSize.L}
                            bold={TextBold.BOLD}
                            gap="32"
                        />
                    </VerticalTimelineElement>
                </VerticalTimeline>

                <VStack max gap="32" align="start" justify="center">
                    <Text
                        gap="16"
                        title={t('Наши партнеры')}
                        text={t('Мы работаем с крупнейшими компаниями нашей страны, и благодаря их опыту ежедневно совершенствуем свои решения')}
                        size={TextSize.L}
                        align={TextAlign.LEFT}
                        bold={TextBold.BOLD}
                    />
                    <Swiper
                        // eslint-disable-next-line no-nested-ternary
                        slidesPerView={width < 800 ? 1 : width < 1200 ? 2 : 3}
                        spaceBetween={30}
                        loop
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <MACO />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SCHTERN />
                        </SwiperSlide>
                        <SwiperSlide>
                            <RINGER />
                        </SwiperSlide>
                        <SwiperSlide>
                            <MACO />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SCHTERN />
                        </SwiperSlide>
                        <SwiperSlide>
                            <RINGER />
                        </SwiperSlide>

                    </Swiper>

                </VStack>

            </VStack>
            <Footer />

        </Page>
    );
};

export default AboutPage;
