/* eslint-disable react/no-array-index-key */
/* eslint-disable i18next/no-literal-string */
import {
    ChangeEvent, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './CalculationAddsComponent.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Toggle } from '@/shared/ui/Toggle/Toggle';
import { Text } from '@/shared/ui/Text/Text';
import ProtectionIcon from '@/shared/assets/icons/protection-icon.svg';
import StealIcon from '@/shared/assets/icons/steal-icon.svg';
import BlackIcon from '@/shared/assets/icons/black-window-icon.svg';
import ChildIcon from '@/shared/assets/icons/child-icon.svg';
import MosquitoNetIcon from '@/shared/assets/icons/mosquito-net-icon.svg';
import RainIcon from '@/shared/assets/icons/rain-icon.svg';
import SetupIcon from '@/shared/assets/icons/setup-icon.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Calculation } from '../../../model/types/calculationSchema';
import { IAdds } from '@/entities/Product';
import { calculationActions } from '../../../model/slice/calculationSlice';

interface CalculationAddsComponentProps {
  className?: string;
  calculation: Calculation;
}

const addsArray: IAdds[] = [
    {
        title: 'Повышенная прочность стекла',
        description: 'Такое окно почти невозможно разбить',
        price: 5000,
        icon: ProtectionIcon,
    },
    {
        title: 'Взломостойкость',
        description: 'Ставим специальную невзламываемую фурнитуру',
        price: 10000,
        icon: StealIcon,
    },
    {
        title: 'Зеркальная тонировка',
        description: 'Никто снаружи не увидит, что происходит в доме',
        price: 2000,
        icon: BlackIcon,
    },
    {
        title: 'Детские замки',
        description: 'Ребенок не сможет сам открыть окно',
        price: 1500,
        icon: ChildIcon,
    },
    {
        title: 'Москитные сетки',
        description: 'Ни один комар не помешает вашим делам',
        price: 1000,
        icon: MosquitoNetIcon,
    },
    {
        title: 'Наружный отлив',
        description: 'Стекающая по отливу вода не попадет в фасад',
        price: 4500,
        icon: RainIcon,
    },
    {
        title: 'Монтаж окна',
        description: 'Установим полностью весь комплект после доставки',
        price: 15000,
        icon: SetupIcon,
    },
];

export const CalculationAddsComponent = memo((props: CalculationAddsComponentProps) => {
    const { t } = useTranslation();

    const [toggled, setToggled] = useState(false);

    const { className, calculation } = props;

    const dispatch = useAppDispatch();

    const onChangeAdd = useCallback((add: IAdds, checked: boolean) => {
        if (checked) {
            dispatch(calculationActions.setAdd({
                id: calculation.id,
                add,
            }));
        } else {
            dispatch(calculationActions.removeAdd({
                id: calculation.id,
                add,
            }));
        }
    }, [calculation.id, dispatch]);

    return (
        <VStack
            align="start"
            justify="start"
            gap="50"
            max
            className={classNames(styles.CalculationAddsComponent, {}, [className])}
        >
            {
                addsArray.map((add, index) => (
                    <HStack key={index} max gap="16">
                        <Toggle
                            value={add.title}
                            onChange={
                                (event: ChangeEvent<HTMLInputElement>) => onChangeAdd(
                                    add,
                                    event?.currentTarget.checked,
                                )
                            }
                        />
                        <HStack gap="16" max>
                            <add.icon className={classNames(
                                styles.icon,
                                { [styles.active]: !!calculation.adds.find((obj) => obj.title === add.title) },
                            )}
                            />
                            <Text
                                gap="4"
                                title={add.title}
                                text={add.description}
                            />
                        </HStack>
                    </HStack>
                ))
            }

        </VStack>
    );
});
