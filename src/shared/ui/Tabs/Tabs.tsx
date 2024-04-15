/* eslint-disable i18next/no-literal-string */
import { ReactNode, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Tabs.module.scss';
import { Button, ThemeButton } from '../Button/Button';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs = memo(({
    className, tabs, value, onTabClick,
}: TabsProps) => {
    const { t } = useTranslation();

    const clickHandle = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    return (
        <div className={classNames(styles.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Button
                    theme={ThemeButton.SELECTOR}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                    className={classNames(styles.tab, { [styles.selected]: tab.value === value })}
                >
                    {tab.content}
                </Button>
            ))}
        </div>
    );
});
