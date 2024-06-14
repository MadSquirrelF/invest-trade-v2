/* eslint-disable no-useless-escape */
/* eslint-disable i18next/no-literal-string */
import {
    memo, MutableRefObject, ReactNode, UIEvent, useEffect, useRef,
    useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
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
import HelpIcon from '@/shared/assets/icons/help-icon.svg';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Notifications } from '@/features/Notifications';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteHelp } from '@/shared/const/router';
import { Cookie } from '@/shared/ui/Cookie/Cookie';

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

    const [isCookieVisible, setIsCookieVisible] = useState(false);
    const [isUpVisible, setIsUpVisible] = useState(false);

    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollSaveByPath(state, pathname),
    );

    useEffect(() => {
        const scrollThreshold = 300;
        let currentWrapperRef: HTMLDivElement | null = null;

        const handleScroll = () => {
            if (currentWrapperRef && currentWrapperRef.scrollTop >= scrollThreshold) {
                setIsUpVisible(true);
            } else {
                setIsUpVisible(false);
            }
        };

        if (wrapperRef.current) {
            currentWrapperRef = wrapperRef.current;
            currentWrapperRef.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (currentWrapperRef) {
                currentWrapperRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        const popStatus = localStorage.getItem('pop_status');
        if (popStatus !== '1') {
            setIsCookieVisible(true);
            localStorage.setItem('pop_status', '1');
        }
    }, []);

    const acceptCookie = () => {
        // Устанавливаем cookie в браузере
        document.cookie = 'cookieAccepted=true; path=/; max-age=31536000';
        setIsCookieVisible(false);
    };

    const rejectCookie = () => {
        // Удаляем cookie из браузера
        document.cookie = 'cookieAccepted=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        setIsCookieVisible(false);
    };

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

            <CSSTransition
                in={isUpVisible}
                timeout={300}
                unmountOnExit
                classNames="slide-animation"
            >

                <Button
                    onClick={onClick}
                    theme={ThemeButton.UP}
                    className={styles.up}
                >
                    <ArrowUp />
                </Button>
            </CSSTransition>

            <AppLink to={getRouteHelp()}>
                <Button theme={ThemeButton.HELP} className={styles.help}>
                    <HelpIcon />
                    Помощь
                </Button>
            </AppLink>

            <CSSTransition
                in={isCookieVisible}
                timeout={300}
                unmountOnExit
                classNames="slide-animation"
            >

                <Cookie rejectCookie={rejectCookie} acceptCookie={acceptCookie} />
            </CSSTransition>

            <Footer />
        </main>
    );
});
