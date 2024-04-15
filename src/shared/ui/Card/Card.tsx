/* eslint-disable i18next/no-literal-string */
import { HTMLAttributes, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card = memo((props: CardProps) => {
    const { t } = useTranslation();
    const { className, children, ...otherProps } = props;
    return (
        <div className={classNames(styles.Card, {}, [className])} {...otherProps}>
            {children}
        </div>
    );
});
