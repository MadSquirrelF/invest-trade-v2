/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { useSelector } from 'react-redux';
import styles from './Sidebar.module.scss';
import { getSidebarItems } from '../model/selectors/getSidebarItems';

interface SidebarProps {
  className?: string;
  collapsed: boolean;
}

export const Sidebar = memo(({ className, collapsed }: SidebarProps) => {
    const { t } = useTranslation();

    const sidebarItemsList = useSelector(getSidebarItems);
    return (
        <aside
            data-testid="side_id"
            className={classNames(
                styles.Sidebar,
                { [styles.collapsed]: collapsed },
                [className],
            )}
        >
            <div className={styles.switchers}>
                <LangSwitcher className={styles.lang} />
                <ThemeSwitcher short={collapsed} />
            </div>
        </aside>
    );
});
