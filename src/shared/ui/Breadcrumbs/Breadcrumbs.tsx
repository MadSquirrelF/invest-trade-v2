/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useLocation } from 'react-router-dom';
import ArrowRight from 'shared/assets/icons/arrow-right.svg';
import styles from './Breadcrumbs.module.scss';
import { AppLink, AppLinkTheme } from '../AppLink/AppLink';

interface BreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs = memo(({ className }: BreadcrumbsProps) => {
    const { t } = useTranslation();

    const location = useLocation();

    const crumbs = location.pathname.split('/')
        .filter((crumb) => crumb !== '');

    return (
        <ul className={classNames(styles.Breadcrumbs, {}, [className])}>
            <AppLink
                className={styles.link}
                to="/"
                theme={AppLinkTheme.PRIMARY}
            >
                {t('Главная')}
            </AppLink>

            <ArrowRight className={styles.icon} />

            {crumbs.map((crumb) => (
                <li
                    className={styles.item}
                    key={crumb}
                >
                    <AppLink
                        className={styles.link}
                        to={`/${crumb}`}
                    >
                        {t(crumb)}
                    </AppLink>

                    <ArrowRight className={styles.icon} />

                </li>
            ))}
        </ul>
    );
});
