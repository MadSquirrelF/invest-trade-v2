/* eslint-disable react/no-array-index-key */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CalculationResult.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import DeleteIcon from '@/shared/assets/icons/trash-icon.svg';
import PriceIcon from '@/shared/assets/icons/cost-icon.svg';
import PriceOneIcon from '@/shared/assets/icons/price-one-icon.svg';
import { BudgetType, Calculation, PlacesType } from '../../model/types/calculationSchema';
import HomeIcon from '@/shared/assets/icons/home-icon.svg';
import RoomIcon from '@/shared/assets/icons/room-icon.svg';
import OfficeIcon from '@/shared/assets/icons/office-icon.svg';
import LowMoneyIcon from '@/shared/assets/icons/low-money-icon.svg';
import MiddleMoneyIcon from '@/shared/assets/icons/avarage-money-icon.svg';
import MoneyBagIcon from '@/shared/assets/icons/money-bag-icon.svg';
import { calculationActions } from '../../model/slice/calculationSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface CalculationResultProps {
  className?: string;
  price: number;
  calculations: Calculation[];
}

export const CalculationResult = memo((props: CalculationResultProps) => {
    const { t } = useTranslation();
    const { className, price, calculations } = props;

    const dispatch = useAppDispatch();

    const handleClearCalcs = () => {
        dispatch(calculationActions.clearCalculations());
    };

    const renderPlace = useCallback(
        (place: PlacesType) => {
            switch (place) {
            case PlacesType.HOUSE:
                return (
                    <HomeIcon className={styles.menuIcon} />
                );

            case PlacesType.OFFICE:
                return (
                    <OfficeIcon className={styles.menuIcon} />
                );
            case PlacesType.ROOM:
                return (
                    <RoomIcon className={styles.menuIcon} />
                );
            }
        },
        [],
    );

    const renderBudget = useCallback(
        (budget: BudgetType) => {
            switch (budget) {
            case BudgetType.CHEAP:
                return (
                    <LowMoneyIcon className={styles.menuIcon} />
                );

            case BudgetType.MIDDLE:
                return (
                    <MiddleMoneyIcon className={styles.menuIcon} />
                );
            case BudgetType.EXPENSIVE:
                return (
                    <MoneyBagIcon className={styles.menuIcon} />
                );
            }
        },
        [],
    );

    return (
        <VStack align="start" gap="50" className={classNames(styles.CalculationResult, {}, ['block'])}>

            <VStack align="start" max gap="16">
                <Text gap="0" size={TextSize.M} isActive bold={TextBold.BOLD} title="Расчет стоимости" />

                <HStack max justify="between" gap="50" className={styles.resultClearContainer}>
                    <span>Вы выбрали :</span>

                    <Button onClick={handleClearCalcs} theme={ThemeButton.CLEAR_COMMENT}>
                        <DeleteIcon />
                        Отчистить расчет
                    </Button>
                </HStack>
            </VStack>

            <VStack max gap="32" align="start">
                {
                    calculations.map((calculation) => (
                        <VStack align="start" max gap="16">
                            <HStack max gap="16" align="start">
                                <Text
                                    gap="8"
                                    key={calculation.id}
                                    title={`№${calculation.id} ${calculation.type.title}`}
                                    text={`${calculation.height}x${calculation.width}`}
                                />
                                {renderPlace(calculation.place)}
                                {renderBudget(calculation.budget)}
                            </HStack>
                            <HStack max gap="16" wrap justify="start">
                                {
                                    calculation.type.sashes.map((sash, index) => (
                                        <HStack
                                            key={index}
                                            justify="center"
                                            align="center"
                                            className={styles.infoBlock}
                                        >
                                            <Text gap="0" text={sash} bold={TextBold.BOLD} size={TextSize.S} />
                                        </HStack>
                                    ))
                                }
                                {
                                    calculation.adds.map((add, index) => (
                                        <HStack
                                            key={index}
                                            justify="center"
                                            align="center"
                                            className={styles.infoBlock}
                                        >
                                            <Text gap="0" text={add.title} bold={TextBold.BOLD} size={TextSize.S} />
                                        </HStack>
                                    ))
                                }
                            </HStack>
                            <HStack gap="10" justify="start" align="center">
                                <PriceOneIcon className={styles.iconPrice} />
                                <Text
                                    gap="0"
                                    text={`${String(calculation.price)} руб`}
                                    size={TextSize.L}
                                    bold={TextBold.BOLD}
                                    isActive
                                />
                            </HStack>

                        </VStack>

                    ))
                }

            </VStack>

            <VStack max gap="16">
                <HStack max justify="between">
                    <HStack gap="8" align="center">
                        <span>Всего окон :</span>
                        <Text gap="0" title={String(calculations.length)} />
                    </HStack>

                    <HStack gap="10" align="center">
                        <PriceIcon className={styles.iconPrice} />
                        <Text gap="0" text={`${String(price)} руб`} size={TextSize.L} bold={TextBold.BOLD} isActive />
                    </HStack>

                </HStack>

                <Button theme={ThemeButton.DEFAULT} className={styles.getResultBtn}>
                    Получить расчет
                </Button>
            </VStack>

        </VStack>
    );
});
