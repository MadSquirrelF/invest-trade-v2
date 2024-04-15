import { useTranslation } from 'react-i18next';
import { CSSProperties, ReactNode, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  children: ReactNode;
  size?: number;
}

export const Avatar = ({
    className, size, children,
}: AvatarProps) => {
    const { t } = useTranslation();

    const cls = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    return (
        <div style={cls} className={classNames(styles.Avatar, {}, [className])}>
            {children}
        </div>
    );
};
