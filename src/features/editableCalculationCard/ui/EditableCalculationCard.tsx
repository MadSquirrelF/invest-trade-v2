/* eslint-disable object-shorthand */
/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    CalculationCard,
    CalculationResult,
    getCalculationData,
    calculationReducer,
    getCalculationPrice,
    calculationActions,
    getCalculationError,
    Calculation,
} from '@/entities/Calculation';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import PlusIcon from '@/shared/assets/icons/plus-icon.svg';
import styles from './EditableCalculationCard.module.scss';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { NotificationsActions } from '@/features/Notifications';

interface EditableCalculationCardProps {
  className?: string;
}

const reducers: ReducerList = {
    calculation: calculationReducer,
};

export const EditableCalculationCard = memo(({ className }: EditableCalculationCardProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const calculations = useSelector(getCalculationData);
    const price = useSelector(getCalculationPrice);
    const error = useSelector(getCalculationError);

    const createCalculation = useCallback(() => {
        if (calculations.length < 4) {
            dispatch(calculationActions.createCalculation());
        } else {
            dispatch(NotificationsActions.addNotification({
                type: 'error',
                label: 'Добавление окна',
                text: 'Привышен лимит количества из 4 расчетов',
            }));
        }
    }, [calculations.length, dispatch]);

    const copyCalculation = useCallback((calculation: Calculation) => {
        if (calculations.length < 4) {
            dispatch(calculationActions.copyCalculation(calculation));
        } else {
            dispatch(NotificationsActions.addNotification({
                type: 'error',
                label: 'Копирование окна',
                text: 'Привышен лимит количества из 4 расчетов',
            }));
        }
    }, [calculations.length, dispatch]);

    const deleteCalculation = useCallback(
        (calculation: Calculation) => {
            dispatch(calculationActions.deleteCalculation(calculation));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <HStack max justify="between" align="start" gap="32">
                <VStack max gap="50">
                    <VStack max gap="50">
                        {
                            calculations.map((calculation, index) => (
                                <CalculationCard
                                    key={calculation.id}
                                    copyCalculation={copyCalculation}
                                    deleteCalculation={deleteCalculation}
                                    calculation={calculation}
                                />
                            ))
                        }

                    </VStack>
                    <Button onClick={createCalculation} theme={ThemeButton.OUTLINE} className={styles.addBtn}>
                        <PlusIcon />
                        Добавить новое окно
                    </Button>

                </VStack>

                <CalculationResult price={price} calculations={calculations} />

            </HStack>
        </DynamicModuleLoader>

    );
});
