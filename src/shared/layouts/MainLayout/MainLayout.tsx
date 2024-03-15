import { memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const {
        className, content, header, sidebar,
    } = props;

    return (
        <div className={classNames(styles.MainLayout, {}, [className])}>
            {header}
            <div className="content-page">
                {sidebar}
                {content}
            </div>

        </div>
    );
});
