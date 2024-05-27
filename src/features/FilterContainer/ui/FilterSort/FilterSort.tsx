/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './FilterSort.module.scss';
import OrderUpIcon from '@/shared/assets/icons/sort-up-icon.svg';
import OrderDownIcon from '@/shared/assets/icons/sort-down-icon.svg';
import ListIcon from '@/shared/assets/icons/list-icon.svg';
import GridIcon from '@/shared/assets/icons/grid-icon.svg';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { OrderType, ViewType } from '../../model/types';

interface FilterSortProps {
  className?: string;
  view: ViewType;
  order: OrderType;
  onChangeView: (value: ViewType) => void;
  onChangeOrder: (value: OrderType) => void;
}

const OrderTypes = [
    {
        order: OrderType.ASC,
        Icon: OrderUpIcon,
    },
    {
        order: OrderType.DESC,
        Icon: OrderDownIcon,
    },
];

const viewTypes = [
    {
        view: ViewType.FULL,
        Icon: ListIcon,
    },
    {
        view: ViewType.SHORT,
        Icon: GridIcon,
    },
];

export const FilterSort = memo((props: FilterSortProps) => {
    const { t } = useTranslation();

    const {
        className,
        onChangeView,
        onChangeOrder,
        view,
        order,
    } = props;

    const onViewClick = (value: ViewType) => () => {
        onChangeView?.(value);
    };

    const onOrderClick = (value: OrderType) => () => {
        onChangeOrder?.(value);
    };

    return (
        <VStack gap="16" className={classNames(styles.FilterSort, {}, [className])}>
            <HStack max gap="16">
                {
                    viewTypes.map((viewTypes) => (
                        <Button
                            theme={ThemeButton.SELECTOR}
                            key={viewTypes.view}
                            onClick={onViewClick(viewTypes.view)}
                            className={classNames(styles.viewSelect, { [styles.selected]: viewTypes.view === view })}
                        >
                            <viewTypes.Icon className={styles.icon} />
                        </Button>
                    ))
                }
            </HStack>
            <HStack max gap="16">
                {
                    OrderTypes.map((orderTypes) => (
                        <Button
                            theme={ThemeButton.SELECTOR}
                            key={orderTypes.order}
                            onClick={onOrderClick(orderTypes.order)}
                            className={classNames(styles.viewSelect, { [styles.selected]: orderTypes.order === order })}
                        >
                            <orderTypes.Icon className={styles.icon} />
                        </Button>
                    ))
                }
            </HStack>
        </VStack>
    );
});
