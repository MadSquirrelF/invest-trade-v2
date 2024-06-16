/* eslint-disable no-fallthrough */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable react/no-array-index-key */
/* eslint-disable i18next/no-literal-string */
import {
    ChangeEvent, memo, useCallback,
    useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CalculationParamsComponent.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input/Input';
import { Sash, SashSelect } from '@/entities/Sash';
import { Toggle } from '@/shared/ui/Toggle/Toggle';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import HomeIcon from '@/shared/assets/icons/home-icon.svg';
import RoomIcon from '@/shared/assets/icons/room-icon.svg';
import OfficeIcon from '@/shared/assets/icons/office-icon.svg';
import LowMoneyIcon from '@/shared/assets/icons/low-money-icon.svg';
import MiddleMoneyIcon from '@/shared/assets/icons/avarage-money-icon.svg';
import MoneyBagIcon from '@/shared/assets/icons/money-bag-icon.svg';
import { RangeInput } from '@/shared/ui/RangeInput/RangeInput';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import {
    BudgetType, Calculation, HandleType, PlacesType,
} from '../../../model/types/calculationSchema';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { calculationActions } from '../../../model/slice/calculationSlice';
import OneStv from '@/shared/assets/calculation/1stv/1stv.svg';
import OneStvLh from '@/shared/assets/calculation/1stv/1stv+lh.svg';
import OneStvRh from '@/shared/assets/calculation/1stv/1stv+rh.svg';
import OneStvLhTop from '@/shared/assets/calculation/1stv/1stv+lh+top.svg';
import OneStvRhTop from '@/shared/assets/calculation/1stv/1stv+rh+top.svg';
import OneStvLhTopLeft from '@/shared/assets/calculation/1stv/1stv+lh+top+left.svg';
import OneStvLhTopRight from '@/shared/assets/calculation/1stv/1stv+rh+top+right.svg';

interface CalculationParamsComponentProps {
  className?: string;
  calculation: Calculation;
}

export const CalculationParamsComponent = memo((props: CalculationParamsComponentProps) => {
    const { t } = useTranslation();
    const {
        className,
        calculation,
    } = props;

    const dispatch = useAppDispatch();

    const renderIcon = useCallback((sash: Sash, handle: HandleType) => {
        switch (sash) {
        case Sash.DEAF:
            return OneStv;

        case Sash.FOLDING:
            switch (handle) {
            case HandleType.LEFT:
                return OneStvLhTop;

            case HandleType.RIGHT:
                return OneStvRhTop;
            }

            return OneStvLhTop;

        case Sash.ROTARY:
            switch (handle) {
            case HandleType.LEFT:
                return OneStvLh;

            case HandleType.RIGHT:
                return OneStvRh;
            }

            return OneStvLh;

        case Sash.SWINGOUT:
            switch (handle) {
            case HandleType.LEFT:
                return OneStvLhTopLeft;

            case HandleType.RIGHT:
                return OneStvLhTopRight;
            }

            return OneStvLhTopLeft;
        }
    }, []);

    const onChangePlace = useCallback((value: PlacesType) => {
        dispatch(calculationActions.setPlace({
            id: calculation.id,
            place: value,
        }));
    }, [calculation.id, dispatch]);

    const onChangeBudget = useCallback((value: BudgetType) => {
        dispatch(calculationActions.setBudget({
            id: calculation.id,
            budget: value,
        }));
    }, [calculation.id, dispatch]);

    const onChangeHandle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newHandle = event.currentTarget.checked ? HandleType.RIGHT : HandleType.LEFT;
        dispatch(calculationActions.setHandle({
            id: calculation.id,
            handle: newHandle,
        }));
    }, [calculation.id, dispatch]);

    const onChangeSash = useCallback((idSash: number, sash: Sash) => {
        dispatch(calculationActions.setSash({
            id: calculation.id,
            idSash,
            sash,
        }));
    }, [calculation.id, dispatch]);

    const onChangeHeight = useCallback((value: string) => {
        const validateValue = value.replace(/\D+/gm, '');
        dispatch(calculationActions.setHeight({
            id: calculation.id,
            height: Number(validateValue || 0),
        }));
    }, [calculation.id, dispatch]);

    const onChangeWidth = useCallback((value: string) => {
        const validateValue = value.replace(/\D+/gm, '');
        dispatch(calculationActions.setWidth({
            id: calculation.id,
            width: Number(validateValue || 0),
        }));
    }, [calculation.id, dispatch]);

    const onChangeHeightEvent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const validateValue = e.currentTarget.value.replace(/\D+/gm, '');
        dispatch(calculationActions.setHeight({
            id: calculation.id,
            height: Number(validateValue || 0),
        }));
    }, [calculation.id, dispatch]);

    const onChangeWidthEvent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const validateValue = e.currentTarget.value.replace(/\D+/gm, '');
        dispatch(calculationActions.setWidth({
            id: calculation.id,
            width: Number(validateValue || 0),
        }));
    }, [calculation.id, dispatch]);

    useEffect(() => {
        dispatch(calculationActions.setIcon({
            id: calculation.id,
            icon: renderIcon(calculation.type.sashes[0], calculation.handle),
        }));
    }, [calculation.handle, calculation.id, calculation.type.sashes, dispatch, renderIcon]);

    return (
        <VStack
            align="start"
            justify="start"
            gap="50"
            max
            className={classNames(styles.CalculationParamsComponent, {}, [className])}
        >
            <HStack max gap="16">
                <Input
                    placeholder="От 900 до 2700"
                    label="Ширина, мм"
                    onChange={onChangeWidth}
                    maxLength={4}
                    minLength={3}
                    value={calculation.width}
                />
                <Input
                    placeholder="От 500 до 2000"
                    label="Высота, мм"
                    onChange={onChangeHeight}
                    maxLength={4}
                    minLength={3}
                    value={calculation.height}
                />
            </HStack>
            <VStack max gap="16">
                <RangeInput
                    title="Ширина, мм"
                    max={2700}
                    min={400}
                    step={1}
                    value={calculation.width}
                    onChange={onChangeWidthEvent}
                />
                <RangeInput
                    title="Высота, мм"
                    max={2000}
                    min={400}
                    step={1}
                    value={calculation.height}
                    onChange={onChangeHeightEvent}
                />
            </VStack>

            <HStack align="start" justify="between" max gap="32">
                <VStack align="start" max gap="32">
                    {
                        calculation.type.sashes.map((sash, index) => (
                            <SashSelect
                                id={index}
                                className={styles.select}
                                value={sash}
                                onChange={onChangeSash}
                                key={index}
                                label={`Створка №${index + 1}`}
                            />
                        ))
                    }

                </VStack>
                <VStack align="start" gap="16" max>
                    <Text gap="0" size={TextSize.S} textPrimary bold={TextBold.MEDIUM} title="Место" />
                    <VStack gap="10" max>
                        <Button
                            onClick={() => onChangePlace(PlacesType.HOUSE)}
                            disabled={calculation.place === PlacesType.HOUSE}
                            className={classNames(
                                styles.radioBtn,
                                { [styles.active]: calculation.place === PlacesType.HOUSE },
                                [],
                            )}
                            theme={ThemeButton.OUTLINE_ACTIVE}
                        >
                            <HomeIcon />
                            Дом
                        </Button>
                        <Button
                            onClick={() => onChangePlace(PlacesType.OFFICE)}
                            disabled={calculation.place === PlacesType.OFFICE}
                            className={classNames(
                                styles.radioBtn,
                                { [styles.active]: calculation.place === PlacesType.OFFICE },
                                [],
                            )}
                            theme={ThemeButton.OUTLINE_ACTIVE}
                        >
                            <OfficeIcon />
                            Офис
                        </Button>
                        <Button
                            onClick={() => onChangePlace(PlacesType.ROOM)}
                            disabled={calculation.place === PlacesType.ROOM}
                            className={classNames(
                                styles.radioBtn,
                                { [styles.active]: calculation.place === PlacesType.ROOM },
                                [],
                            )}
                            theme={ThemeButton.OUTLINE_ACTIVE}
                        >
                            <RoomIcon />
                            Квартира
                        </Button>

                    </VStack>
                </VStack>
                <VStack align="start" gap="16" max>
                    <Text gap="0" size={TextSize.S} textPrimary bold={TextBold.MEDIUM} title="Бюджет" />
                    <VStack gap="10" max>
                        <Button
                            onClick={() => onChangeBudget(BudgetType.CHEAP)}
                            disabled={calculation.budget === BudgetType.CHEAP}
                            className={classNames(
                                styles.radioBtn,
                                { [styles.active]: calculation.budget === BudgetType.CHEAP },
                                [],
                            )}
                            theme={ThemeButton.OUTLINE_ACTIVE}
                        >
                            <LowMoneyIcon />
                            Подешевле
                        </Button>
                        <Button
                            onClick={() => onChangeBudget(BudgetType.MIDDLE)}
                            disabled={calculation.budget === BudgetType.MIDDLE}
                            className={classNames(
                                styles.radioBtn,
                                { [styles.active]: calculation.budget === BudgetType.MIDDLE },
                                [],
                            )}
                            theme={ThemeButton.OUTLINE_ACTIVE}
                        >
                            <MiddleMoneyIcon />
                            Цена/Кач
                        </Button>
                        <Button
                            onClick={() => onChangeBudget(BudgetType.EXPENSIVE)}
                            disabled={calculation.budget === BudgetType.EXPENSIVE}
                            className={classNames(
                                styles.radioBtn,
                                { [styles.active]: calculation.budget === BudgetType.EXPENSIVE },
                                [],
                            )}
                            theme={ThemeButton.OUTLINE_ACTIVE}
                        >
                            <MoneyBagIcon />
                            Любой
                        </Button>

                    </VStack>
                </VStack>
            </HStack>

            {
                calculation.handle !== HandleType.NULL ? (
                    <VStack gap="16" align="start">
                        <Text gap="0" size={TextSize.S} textPrimary bold={TextBold.MEDIUM} title="Расположение ручки" />

                        <HStack gap="16" justify="start">
                            <Text
                                gap="0"
                                isActive={calculation.handle === HandleType.LEFT}
                                text="Слева"
                                textPrimary
                                size={TextSize.L}
                                bold={TextBold.BOLD}
                            />
                            <Toggle onChange={onChangeHandle} />
                            <Text
                                gap="0"
                                size={TextSize.L}
                                isActive={calculation.handle === HandleType.RIGHT}
                                text="Справа"
                                textPrimary
                                bold={TextBold.BOLD}
                            />
                        </HStack>

                    </VStack>
                ) : null
            }

        </VStack>
    );
});
