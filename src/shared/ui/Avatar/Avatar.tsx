import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  size?: number;
  src?: string
  alt?: string;
}

export const Avatar = ({
    className, src, size, alt,
}: AvatarProps) => {
    const { t } = useTranslation();

    const cls = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    return (
        <img src={src} alt={alt} style={cls} className={classNames(styles.Avatar, {}, [className])} />
    );
};
