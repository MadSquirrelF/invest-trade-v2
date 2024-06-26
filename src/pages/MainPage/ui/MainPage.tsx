/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import {
    Text, TextAlign, TextBold, TextSize,
} from '@/shared/ui/Text/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import Window from '@/shared/assets/images/window-main.svg';
import ArrowRight from '@/shared/assets/icons/arrow-right.svg';
import Newspaper from '@/shared/assets/images/newspaper.svg';
import Man from '@/shared/assets/images/man.svg';
import Roof from '@/shared/assets/images/roof.svg';
import Frame from '@/shared/assets/images/frame.svg';
import Calculator from '@/shared/assets/images/calc.svg';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import styles from './MainPage.module.scss';
import { Page } from '@/widgets/Page';
import { useNewlastsList } from '@/features/NewLastList';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Error } from '@/shared/ui/Error/Error';
import { convertDate } from '@/shared/lib/convertDate/convertDate';
import { getRouteNews } from '@/shared/const/router';
import { Slider } from '@/features/Slider';
import { SlideSchema } from '@/entities/Slide';

import ManhattanBg from '@/shared/assets/images/bg-hm.jpg';
import AcademBg from '@/shared/assets/images/plan1.webp';
import PremiumBg from '@/shared/assets/images/XXL.webp';

const testSlide: SlideSchema[] = [
    {
        _id: '1',
        title: 'ЖК МАНХЕТТЕН',
        description: 'В ЦЕЛОМ ЖК «МАНХЭТТЕН» ПРЕДПОЛАГАЕТ 15 ЖИЛЫХ ДОМОВ. МЫ ПОМОГАЕМ ЖИЛЬЦАМ И ЗАСТРОЙЩИКАМ С УСТАНОВКОЙ ОКОН.',
        poster: ManhattanBg,
        link: 'gfdgsdfg',
    },
    {
        _id: '2',
        title: 'ПАРКОВЫЙ ПРЕМИУМ',
        description: 'ПЛАНИРУЕТСЯ К ПОСТРОЙКЕ БОЛЬШАЯ ДЕТСКАЯ ПЛОЩАДКА С ИГРОВЫМИ ФОРМАМИ. ЧЕРЕЗ НАШИ ОКНА РОДИТЕЛИ СМОГУТ ОТЧЕТЛИВО НАБЛЮДАТЬ ЗА ИГРОЙ СВОИХ ДЕТЕЙ.',
        poster: PremiumBg,
        link: 'gfdgsdfg',
    },
    {
        _id: '3',
        title: 'АКАДЕМ-РИВЕРСАЙД',
        description: 'НОВЫЙ МИКРОРАЙОН УДАЧНО РАСПОЛОЖЕН ВДОЛЬ УНИВЕРСИТЕТСКОЙ НАБЕРЕЖНОЙ ВБЛИЗИ СОСНОВОГО БОРА. НАШИ НОВЫЕ И НАДЕЖНЫЕ ОКНА ОБЕСПЕЧАТ ЖИЛЬЦАМ ПОТРЯСАЮЩИЙ ВИД.',
        poster: AcademBg,
        link: 'gfdgsdfg',
    },
];

const MainPage = () => {
    const { t } = useTranslation('main');

    const { isLoading, data: news, error } = useNewlastsList(1);

    return (
        <Page>
            <Text gap="16" title={t('Главная страница')} size={TextSize.L} bold={TextBold.MEDIUM} />
            <Slider slides={testSlide} />
            <HStack gap="32" align="start" max justify="between" className={styles.wrapper}>
                <HStack gap="32" justify="between" align="start" wrap className={styles.container}>
                    <HStack gap="16" justify="between" align="center" max className={classNames(styles.block, {}, [])}>
                        <VStack gap="16">
                            <Text
                                gap="16"
                                title={t('Ваш партнер в оконном бизнесе!')}
                                // eslint-disable-next-line max-len
                                text={t('Мы являемся официальным поставщиком оборудования и материалов для производства пластиковых и алюминиевых конструкций')}
                                size={TextSize.XXL}
                                bold={TextBold.BOLD}
                                className={styles.title}
                            />
                        </VStack>
                        <Window className={styles.window} />

                    </HStack>
                    <HStack gap="32" align="start" max className={styles.containerSmall} justify="between">
                        <AppLink to="/" className={classNames(styles.block, {}, [styles.small])}>
                            <Text
                                gap="16"
                                title={t('Онлайн калькулятор')}
                                text={t('Узнайте точную стоимость установки окон с учетом ваших потребностей и бюджета!')}
                                size={TextSize.L}
                                bold={TextBold.BOLD}
                            />

                            <Button type="button" theme={ThemeButton.SVG_CIRCLE}>
                                <ArrowRight />
                            </Button>

                            <Calculator className={styles.iconAbsolute} />
                        </AppLink>

                        <AppLink to={getRouteNews()} className={classNames(styles.block, {}, [styles.small])}>

                            <VStack align="start" justify="start" max gap="16">
                                <Text
                                    gap="16"
                                    title={t('Последние новости')}
                                    size={TextSize.L}
                                    align={TextAlign.LEFT}
                                    bold={TextBold.BOLD}
                                />
                                {
                                    isLoading ? (
                                        <Skeleton width="100%" height={20} border="20px" />
                                    ) : error ? (
                                        <Error error={t('Не удалось получить новости')} />

                                    ) : !news ? (
                                        <Error error={t('Не удалось получить новости')} />
                                    ) : (

                                        <VStack align="start" max gap="32">
                                            <Text
                                                gap="0"
                                                text={news[0].title}
                                                size={TextSize.L}
                                                align={TextAlign.LEFT}
                                                bold={TextBold.BOLD}
                                            />

                                            <Text
                                                gap="0"
                                                text={convertDate(news[0].createdAt)}
                                                size={TextSize.M}
                                                align={TextAlign.LEFT}
                                                bold={TextBold.BOLD}
                                                className="date"
                                            />

                                        </VStack>

                                    )
                                }
                            </VStack>

                            <Button type="button" theme={ThemeButton.SVG_CIRCLE}>
                                <ArrowRight />
                            </Button>

                            <Newspaper className={styles.iconAbsolute} />
                        </AppLink>
                    </HStack>

                </HStack>

                <VStack align="start" gap="16" max className={classNames(styles.block, {}, [styles.big])}>

                    <Text
                        // eslint-disable-next-line max-len
                        gap="16"
                        title={t('Всё для оконного бизнеса теперь в сети!')}
                        text={t('Оформляйте заказ с вашего компьютера, планшета или телефона, наши менеджеры свяжутся с вами для уточнения деталей')}
                        size={TextSize.XL}
                        bold={TextBold.BOLD}
                    />

                    <Frame className={styles.frame} />
                    <Man className={styles.man} />
                    <Roof className={styles.roof} />

                    <Button type="button" theme={ThemeButton.DEFAULT} className={styles.orderBtn}>{t('Заказать')}</Button>
                </VStack>

            </HStack>
        </Page>
    );
};

export default MainPage;
