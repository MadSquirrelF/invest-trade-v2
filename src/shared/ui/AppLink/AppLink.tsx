import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  DEFAULT = 'default',
  RED = 'red',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
}

export const AppLink = forwardRef((props : AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const {
        to, className, children, theme = AppLinkTheme.PRIMARY, ...otherProps
    } = props;
    return (
        <Link ref={ref} to={to} className={classNames(styles.AppLink, {}, [className, styles[theme]])} {...otherProps}>
            {children}
        </Link>
    );
});
