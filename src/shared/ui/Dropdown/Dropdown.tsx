/* eslint-disable react/no-array-index-key */
/* eslint-disable i18next/no-literal-string */
import { Menu } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from '@/shared/types/ui';
import styles from './Dropdown.module.scss';
import { Button, ThemeButton } from '../Button/Button';
import { AppLink } from '../AppLink/AppLink';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
  className?: string;
  children?: ReactNode;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': styles.optionsBottomLeft,
    'bottom right': styles.optionsBottomRight,
    'top right': styles.optionsTopRight,
    'top left': styles.optionsTopLeft,
};

export function Dropdown(props: DropdownProps) {
    const {
        className, items, children, trigger, direction = 'bottom right',
    } = props;

    const menuClasses = [
        mapDirectionClass[direction],
    ];

    return (
        <Menu as="div" className={classNames(styles.Dropdown, {}, [className])}>
            <Menu.Button className={styles.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
                {
                    children && (
                        <div className={styles.header}>
                            {children}
                        </div>
                    )
                }
                {
                    items.map((item, index) => {
                        const content = ({ active }: {active: boolean }) => (
                            <Button
                                theme={ThemeButton.CLEAR}
                                onClick={item.onClick}
                                className={classNames(styles.item, { [styles.active]: active })}
                            >
                                {item.content}
                            </Button>
                        );

                        if (item.href) {
                            return (
                                <Menu.Item
                                    as={AppLink}
                                    to={item.href}
                                    key={index}
                                    disabled={item.disabled}
                                    refName="href"
                                >
                                    {content}
                                </Menu.Item>
                            );
                        }

                        return (
                            <Menu.Item as={Fragment} key={index} disabled={item.disabled}>
                                {content}
                            </Menu.Item>
                        );
                    })
                }

            </Menu.Items>
        </Menu>
    );
}
