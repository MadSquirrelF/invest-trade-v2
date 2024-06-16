/* eslint-disable react/no-array-index-key */
/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CalculationTypeComponent.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import {
    Text, TextAlign, TextBold, TextSize,
} from '@/shared/ui/Text/Text';
import OneStvWindowImage from '@/shared/assets/images/calc-type-window-1stv.png';
import TwoStvWindowImage from '@/shared/assets/images/calc-type-window-2stv.png';
import ThreeStvWindowImage from '@/shared/assets/images/calc-type-window-3stv.png';
import DoorWindowImage from '@/shared/assets/images/calc-type-window-door.png';
import DoorOneStvWindowImage from '@/shared/assets/images/calc-type-window-door-1stv.png';
import DoorTwoStvWindowImage from '@/shared/assets/images/calc-type-window-door-2stv.png';
import { WindowType } from '../../../model/types/calculationSchema';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Sash } from '@/entities/Sash';

interface CalculationTypeComponentProps {
  className?: string;
  type: WindowType;
  onChangeType: (type: string) => void;
}

const typeOfWindow: WindowType[] = [{
    title: 'Одностворчатое окно',
    poster: OneStvWindowImage,
    price: 20000,
    sashes: [
        Sash.DEAF,
    ],
},
{
    title: 'Двустворчатое окно',
    poster: TwoStvWindowImage,
    price: 25000,
    sashes: [
        Sash.DEAF, Sash.DEAF,
    ],
},
{
    title: 'Трехстворчатое окно',
    poster: ThreeStvWindowImage,
    price: 30000,
    sashes: [
        Sash.DEAF, Sash.DEAF, Sash.DEAF,
    ],
},
{
    title: 'Балконная дверь',
    poster: DoorWindowImage,
    price: 15000,
    sashes: [],
},
{
    title: 'Одностворчатое окно + дверь',
    poster: DoorOneStvWindowImage,
    price: 35000,
    sashes: [
        Sash.DEAF,
    ],
},
{
    title: 'Двустворчатое окно + дверь',
    poster: DoorTwoStvWindowImage,
    price: 40000,
    sashes: [
        Sash.DEAF,
        Sash.DEAF,
    ],
}];

export const CalculationTypeComponent = memo(({ className, type, onChangeType }: CalculationTypeComponentProps) => {
    const { t } = useTranslation();
    return (

        <VStack gap="50">
            <HStack wrap gap="16">
                {
                    typeOfWindow.map((window, index) => (
                        <Button key={index} theme={ThemeButton.CLEAR}>
                            <VStack
                                gap="16"
                                align="center"
                                justify="center"
                                className={classNames(
                                    styles.tab,
                                    { [styles.selected]: window.title === type.title },
                                    [],
                                )}
                            >
                                <HStack className={styles.imageContainer}>
                                    <img
                                        src={window.poster}
                                        alt={window.title}
                                        draggable={false}
                                        width={150}
                                        height={150}
                                        className={styles.image}
                                    />
                                </HStack>

                                <Text
                                    gap="0"
                                    align={TextAlign.CENTER}
                                    text={window.title}
                                    bold={TextBold.BOLD}
                                    size={TextSize.L}
                                />
                            </VStack>
                        </Button>

                    ))
                }
            </HStack>

        </VStack>

    );
});
