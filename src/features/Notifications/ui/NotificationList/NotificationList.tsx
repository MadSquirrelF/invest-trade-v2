/* eslint-disable i18next/no-literal-string */
import { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NotificationList.module.scss';

interface NotificationListProps {
  className?: string;
  children: ReactNode
}

export const NotificationList = memo(({ className, children }: NotificationListProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.NotificationList, {}, [className])}>
            {children}
        </div>
    );
});
