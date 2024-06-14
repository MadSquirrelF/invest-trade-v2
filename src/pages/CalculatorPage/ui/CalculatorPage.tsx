/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import styles from './CalculatorPage.module.scss';
import ArrowUp from '@/shared/assets/icons/arrow-up.svg';
import WindowIconTest from '@/shared/assets/icons/WindowIconTest.svg';

import DeleteIcon from '@/shared/assets/icons/trash-icon.svg';
import CopyIcon from '@/shared/assets/icons/copy-icon.svg';
import PriceIcon from '@/shared/assets/icons/cost-icon.svg';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import OneStvWindowImage from '@/shared/assets/images/calc-type-window-1stv.png';
import TwoStvWindowImage from '@/shared/assets/images/calc-type-window-2stv.png';
import ThreeStvWindowImage from '@/shared/assets/images/calc-type-window-3stv.png';
import DoorWindowImage from '@/shared/assets/images/calc-type-window-door.png';
import DoorOneStvWindowImage from '@/shared/assets/images/calc-type-window-door-1stv.png';
import DoorTwoStvWindowImage from '@/shared/assets/images/calc-type-window-door-2stv.png';
import CalcWindowSchemaImage from '@/shared/assets/images/calc-window-schema.png';

interface CalculatorPageProps {
  className?: string;
}

const typeOfWindow = [{
    title: '1 створка',
    icon: OneStvWindowImage,
},
{
    title: '2 створки',
    icon: TwoStvWindowImage,
},
{
    title: '3 створка',
    icon: ThreeStvWindowImage,
},
{
    title: 'Балконная дверь',
    icon: DoorWindowImage,
},
{
    title: 'Дверь + 1 створка',
    icon: DoorOneStvWindowImage,
},
{
    title: 'Дверь + 2 створка',
    icon: DoorTwoStvWindowImage,
}];

const CalculatorPage = memo(({ className }: CalculatorPageProps) => {
    const { t } = useTranslation();
    return (
        <Page>
            <Breadcrumbs />

            <HStack max justify="between" align="start" gap="32">
                <VStack gap="50" className={classNames(styles.calculator, {}, [className, 'block'])}>
                    <HStack justify="between" align="center" max gap="16">
                        <HStack gap="32">
                            <Button theme={ThemeButton.SVG_CIRCLE}>
                                <ArrowUp />
                            </Button>

                            <HStack gap="16" align="start">
                                <WindowIconTest className={styles.windowIconTest} />
                                <Text
                                    gap="8"
                                    title="№1 Одностворчатое окно + дверь"
                                    text="800x1200"
                                    bold={TextBold.BOLD}
                                    size={TextSize.M}
                                />
                            </HStack>

                        </HStack>

                        <HStack gap="16">
                            <Button
                                theme={ThemeButton.SVG_BTN}
                                className={styles.icon}
                                helper
                                helperText="Скопировать расчет"
                            >
                                <CopyIcon />
                            </Button>
                            <Button
                                theme={ThemeButton.SVG_BTN}
                                className={styles.icon}
                                helper
                                helperText="Удалить расчет"
                            >
                                <DeleteIcon />
                            </Button>
                        </HStack>

                    </HStack>

                    <HStack max gap="50" justify="between">
                        <VStack gap="50">
                            <HStack gap="10" max>
                                <HStack justify="center" align="center" className={styles.step}>
                                    <span className={styles.stepCount}>1</span>
                                </HStack>
                                <Text gap="0" title="Тип окна" isActive />
                            </HStack>

                            <HStack wrap gap="16">
                                {
                                    typeOfWindow.map((window, index) => (
                                        <VStack gap="16" align="center" justify="center" className={styles.tab}>
                                            <HStack className={styles.imageContainer}>
                                                <img
                                                    src={window.icon}
                                                    alt={window.title}
                                                    draggable={false}
                                                    width={150}
                                                    height={150}
                                                    className={styles.image}
                                                />
                                            </HStack>

                                            <Text
                                                gap="0"
                                                text={window.title}
                                                bold={TextBold.BOLD}
                                                size={TextSize.L}
                                            />
                                        </VStack>
                                    ))
                                }
                            </HStack>

                            <HStack max justify="start" gap="50">
                                <Button theme={ThemeButton.OUTLINE}>
                                    Назад
                                </Button>

                                <Button theme={ThemeButton.DEFAULT}>
                                    Далее
                                </Button>
                            </HStack>
                        </VStack>
                        <VStack className={styles.schemaContainer}>
                            <img
                                src={CalcWindowSchemaImage}
                                alt="test"
                                draggable={false}
                                width={300}
                                height={450}
                                className={styles.image}
                            />
                        </VStack>
                    </HStack>

                </VStack>
                <VStack align="start" gap="32" className={classNames(styles.resultBlock, {}, ['block'])}>
                    <Text gap="0" size={TextSize.M} isActive bold={TextBold.BOLD} title="Расчет стоимости" />

                    <HStack max justify="between" gap="50" className={styles.resultClearContainer}>
                        <span>Вы выбрали :</span>

                        <Button theme={ThemeButton.CLEAR_COMMENT}>
                            <DeleteIcon />
                            Отчистить расчет
                        </Button>
                    </HStack>

                    <VStack max>
                        <Text gap="8" title="№1 Одностворчатое окно + дверь" text="800x1200" />
                    </VStack>

                    <HStack max justify="between">
                        <HStack gap="8" align="center">
                            <span>Всего окон :</span>
                            <Text gap="0" title="1" />
                        </HStack>

                        <HStack gap="10" align="center">
                            <PriceIcon className={styles.iconPrice} />
                            <Text gap="0" text="15000 рублей" size={TextSize.L} bold={TextBold.BOLD} isActive />
                        </HStack>

                    </HStack>
                </VStack>
            </HStack>

        </Page>
    );
});

export default CalculatorPage;
