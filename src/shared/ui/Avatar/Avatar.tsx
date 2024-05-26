import { useTranslation } from 'react-i18next';
import { CSSProperties, ReactNode, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    size?: number;
    src?: string
    alt?: string;
    children?: ReactNode;
  }

export const Avatar = ({
    className, src, size, alt, children,
}: AvatarProps) => {
    const { t } = useTranslation();

    const cls = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    if (children) {
        return (
            <div style={cls} className={classNames(styles.Avatar, {}, [className])}>
                {children}
            </div>
        );
    }

    return (
        <img draggable={false} src={src} alt={alt} style={cls} className={classNames(styles.Avatar, {}, [className])} />
    );
};
