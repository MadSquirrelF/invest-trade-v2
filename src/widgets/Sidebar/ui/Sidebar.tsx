/* eslint-disable i18next/no-literal-string */
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { VStack } from 'shared/ui/Stack';
import { useLocation } from 'react-router-dom';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import styles from './Sidebar.module.scss';
import { getSidebarItems } from '../model/selectors/getSidebarItems';
import { SidebarItem } from './SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string;
  collapsed: boolean;
}

export const Sidebar = memo(({ className, collapsed }: SidebarProps) => {
    const { t } = useTranslation();

    const sidebarItemsList = useSelector(getSidebarItems);

    const { pathname } = useLocation();

    const itemsList = useMemo(() => sidebarItemsList.map(((item) => (
        <SidebarItem key={item.path} item={item} collapsed={collapsed} pathname={pathname} />
    ))), [collapsed, sidebarItemsList, pathname]);

    return (
        <aside
            data-testid="side_id"
            className={classNames(
                styles.Sidebar,
                { [styles.collapsed]: collapsed },
                [className],
            )}
        >

            <VStack role="navigation" align="center" max gap="10">
                {itemsList}
            </VStack>

            <div className={styles.utils}>
                <LangSwitcher className={styles.lang} />
                <ThemeSwitcher />
            </div>

        </aside>
    );
});
