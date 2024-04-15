/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ListIcon from '@/shared/assets/icons/list-icon.svg';
import GridIcon from '@/shared/assets/icons/grid-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import OrderUpIcon from '@/shared/assets/icons/sort-up-icon.svg';
import OrderDownIcon from '@/shared/assets/icons/sort-down-icon.svg';
import styles from './NewsOrderViewTabs.module.scss';
import { NewOrder, NewView } from '@/entities/new';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';

interface NewsOrderViewTabsProps {
  className?: string;
  view: NewView;
  order: NewOrder;
  onChangeOrder: (order: NewOrder) => void;
  onChangeView: (view: NewView) => void;
}

const OrderTypes = [
    {
        order: NewOrder.ASC,
        Icon: OrderUpIcon,
    },
    {
        order: NewOrder.DESC,
        Icon: OrderDownIcon,
    },
];

const viewTypes = [
    {
        view: NewView.FULL,
        Icon: ListIcon,
    },
    {
        view: NewView.SHORT,
        Icon: GridIcon,
    },
];

export const NewsOrderViewTabs = memo((props: NewsOrderViewTabsProps) => {
    const { t } = useTranslation();

    const {
        className, view, onChangeOrder, order, onChangeView,
    } = props;

    const onViewClick = (value: NewView) => () => {
        onChangeView?.(value);
    };

    const onOrderClick = (value: NewOrder) => () => {
        onChangeOrder?.(value);
    };

    return (
        <VStack gap="16" className={classNames(styles.NewsOrderViewTabs, {}, [className])}>
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
