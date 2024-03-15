/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../../model/types/sidebar';
import styles from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
  pathname: string;
}

export const SidebarItem = memo(({ item, collapsed, pathname }: SidebarItemProps) => {
    const { t } = useTranslation();

    return (
        <HStack max gap="10" className={classNames(styles.item, { [styles.collapsed]: collapsed })}>
            <AppLink
                to={item.path}
                className={classNames(styles.link, { [styles.active]: pathname === item.path })}
            >
                <item.Icon className={styles.icon} />
                <p className={styles.text}>
                    {t(item.text)}
                </p>
            </AppLink>

        </HStack>
    );
});
