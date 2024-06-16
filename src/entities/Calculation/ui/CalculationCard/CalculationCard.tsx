/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CalculationCard.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';

import CopyIcon from '@/shared/assets/icons/copy-icon.svg';
import ArrowUp from '@/shared/assets/icons/arrow-up.svg';
import DeleteIcon from '@/shared/assets/icons/trash-icon.svg';
import { CalculationTypeComponent } from './CalculationTypeComponent/CalculationTypeComponent';
import { CalculationParamsComponent } from './CalculationParamsComponent/CalculationParamsComponent';
import { CalculationAddsComponent } from './CalculationAddsComponent/CalculationAddsComponent';
import { IStepper, Stepper } from '@/shared/ui/Stepper/Stepper';
import WindowIcon from '@/shared/assets/icons/window-square-icon.svg';
import ResizeIcon from '@/shared/assets/icons/resize-icon.svg';
import AddsIcon from '@/shared/assets/icons/adds-icon.svg';
import { BudgetType, Calculation, PlacesType } from '../../model/types/calculationSchema';
import HomeIcon from '@/shared/assets/icons/home-icon.svg';
import RoomIcon from '@/shared/assets/icons/room-icon.svg';
import OfficeIcon from '@/shared/assets/icons/office-icon.svg';
import LowMoneyIcon from '@/shared/assets/icons/low-money-icon.svg';
import MiddleMoneyIcon from '@/shared/assets/icons/avarage-money-icon.svg';
import MoneyBagIcon from '@/shared/assets/icons/money-bag-icon.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface CalculationCardProps {
  className?: string;
  calculation: Calculation;
  deleteCalculation: (calculation: Calculation) => void;
  copyCalculation: (calculation: Calculation) => void;
}

const steps: IStepper[] = [
    {
        id: 0,
        title: 'Тип окна',
        Icon: WindowIcon,
    },
    {
        id: 1,
        title: 'Параметры',
        Icon: ResizeIcon,
    },
    {
        id: 2,
        title: 'Дополнительно',
        Icon: AddsIcon,
    },
];

export const CalculationCard = memo((props: CalculationCardProps) => {
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState(true);

    const {
        calculation,
        className,
        deleteCalculation,
        copyCalculation,
    } = props;

    const dispatch = useAppDispatch();

    const [activeStep, setActiveStep] = useState(0);
    const [slideIn, setSlideIn] = useState(true);

    const changeCardView = () => {
        setCollapsed(!collapsed);
    };

    const handleArrowClickBack = useCallback(() => {
        setSlideIn(false);

        setTimeout(() => {
            setActiveStep(activeStep - 1);
            setSlideIn(true);
        }, 300);
    }, [activeStep]);

    const handleArrowClickParams = () => {
        setSlideIn(false);

        setTimeout(() => {
            setActiveStep(activeStep + 1);
            setSlideIn(true);
        }, 300);
    };

    const renderBlock = useCallback(
        (activeStep: number) => {
            switch (activeStep) {
            case 0:
                return (
                    <CalculationTypeComponent onChangeType={() => {}} type={calculation.type} />
                );
            case 1:
                return (
                    <CalculationParamsComponent
                        calculation={calculation}
                    />
                );
            case 2:
                return (
                    <CalculationAddsComponent calculation={calculation} />
                );
            default:
                return null;
            }
        },
        [calculation],
    );

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
        <VStack
            max
            gap={collapsed ? '32' : '50'}
            className={classNames(styles.CalculationCard, {}, [className, 'block'])}
        >
            <HStack justify="between" align="center" max gap="16">
                <HStack gap="32">
                    <Button
                        onClick={changeCardView}
                        theme={ThemeButton.SVG_CIRCLE}
                        className={classNames(styles.arrowBtn, { [styles.collapsed]: collapsed }, [])}
                    >
                        <ArrowUp />
                    </Button>

                    <HStack gap="16" align="start">
                        <calculation.icon className={styles.windowIconTest} />
                        <Text
                            gap="8"
                            title={`№${calculation.id} ${calculation.type.title}`}
                            text={`${calculation.height}x${calculation.width}`}
                            bold={TextBold.BOLD}
                            size={TextSize.M}
                        />
                        {renderPlace(calculation.place)}
                        {renderBudget(calculation.budget)}

                    </HStack>

                </HStack>

                <HStack gap="16">
                    <Button
                        onClick={() => copyCalculation(calculation)}
                        theme={ThemeButton.SVG_BTN}
                        className={styles.icon}
                    >
                        <CopyIcon />
                    </Button>
                    <Button
                        theme={ThemeButton.SVG_BTN}
                        onClick={() => deleteCalculation(calculation)}
                        className={styles.icon}
                    >
                        <DeleteIcon />
                    </Button>
                </HStack>

            </HStack>

            <CSSTransition
                in={collapsed}
                timeout={300}
                unmountOnExit
                classNames="slide-animation"
            >
                <HStack max gap="16" wrap justify="start">
                    {
                        calculation.type.sashes.map((sash, index) => (
                            <HStack key={index} justify="center" align="center" className={styles.infoBlock}>
                                <Text gap="0" text={sash} bold={TextBold.BOLD} size={TextSize.L} />
                            </HStack>
                        ))
                    }
                    {
                        calculation.adds.map((add, index) => (
                            <HStack key={index} justify="center" align="center" className={styles.infoBlock}>
                                <Text gap="0" text={add.title} bold={TextBold.BOLD} size={TextSize.L} />
                            </HStack>
                        ))
                    }
                </HStack>
            </CSSTransition>

            <CSSTransition
                in={!collapsed}
                timeout={300}
                unmountOnExit
                classNames="slide-animation"
            >
                <VStack max gap="50">
                    <Stepper currentStep={activeStep} steps={steps} />

                    <HStack max align="start" gap="50" justify="between">

                        <CSSTransition
                            in={slideIn}
                            timeout={300}
                            unmountOnExit
                            classNames="slide-animation"
                        >
                            {renderBlock(activeStep)}
                        </CSSTransition>

                        <VStack className={styles.schemaContainer}>
                            <calculation.icon className={styles.schema} />
                            <HStack justify="center" align="center" className={styles.width}>
                                <Text
                                    gap="0"
                                    bold={TextBold.BOLD}
                                    size={TextSize.L}
                                    isActive
                                    text={`${calculation.width}, мм`}
                                />

                            </HStack>
                            <HStack justify="center" align="center" className={styles.height}>
                                <Text
                                    gap="0"
                                    isActive
                                    size={TextSize.L}
                                    bold={TextBold.BOLD}
                                    text={`${calculation.height}, мм`}
                                />
                            </HStack>
                        </VStack>
                    </HStack>

                    <HStack max justify="start" gap="50">
                        <Button disabled={activeStep === 0} onClick={handleArrowClickBack} theme={ThemeButton.OUTLINE}>
                            Назад
                        </Button>

                        <Button onClick={handleArrowClickParams} theme={ThemeButton.DEFAULT}>
                            Далее
                        </Button>
                    </HStack>
                </VStack>
            </CSSTransition>

        </VStack>
    );
});
