/* eslint-disable i18next/no-literal-string */
import {
    memo, MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { getScrollSaveByPath, ScrollSaveActions } from '@/features/ScrollSave';
import { useInfinityScroll } from '@/shared/lib/hooks/useInfinityScroll/useInfinityScroll';
import styles from './Page.module.scss';
import { Footer } from '../../../Footer';
import ArrowUp from '@/shared/assets/icons/arrow-up.svg';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Notifications } from '@/features/Notifications';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollSaveByPath(state, pathname),
    );

    const onClick = () => {
        wrapperRef.current.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useInfinityScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(ScrollSaveActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 500);

    return (
        <main
            ref={wrapperRef}
            className={classNames(styles.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}

            {
                onScrollEnd ? <div className={styles.trigger} ref={triggerRef} /> : null
            }

            <Notifications />

            <Button
                onClick={onClick}
                theme={ThemeButton.UP}
            >
                <ArrowUp />
            </Button>

            <Footer />
        </main>
    );
});
