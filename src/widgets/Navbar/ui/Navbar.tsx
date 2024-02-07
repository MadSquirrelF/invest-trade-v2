/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import Logo from 'shared/assets/icons/logo.svg';
import MenuIcon from 'shared/assets/icons/menu-burger-icon.svg';
import CartIcon from 'shared/assets/icons/cart-icon.svg';
import BellIcon from 'shared/assets/icons/bell-icon.svg';
import LikeIcon from 'shared/assets/icons/like-save-icon.svg';
import { memo, useCallback, useState } from 'react';

import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/Auth/ui/LoginModal/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, userActions } from 'entities/User';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { HStack } from 'shared/ui/Stack';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import LogoutIcon from 'shared/assets/icons/logout-icon.svg';
import Settings from 'shared/assets/icons/settings.svg';
import Help from 'shared/assets/icons/help.svg';
import HistoryOrder from 'shared/assets/icons/order-history.svg';
import { Text, TextBold, TextSize } from 'shared/ui/Text/Text';
import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
  onToggle?: () => void;
}

export const Navbar = memo(({ className, onToggle }: NavbarProps) => {
    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <header className={classNames(styles.Navbar, {}, [className])}>

                <div className={styles.wrapperLeft}>
                    <Button theme={ThemeButton.SVG_BTN} onClick={onToggle}>
                        <MenuIcon />
                    </Button>
                    <Logo className={styles.logo} />
                </div>
                <div className={styles.wrapperRight}>
                    <div className={styles.contacts}>
                        <a href="#">+7 (982) 325-63-78</a>
                        <a href="#">mail@invest-trade.biz</a>
                    </div>
                    <Button type="button" theme={ThemeButton.SVG_BG} className={styles.likeBtn}>
                        <LikeIcon />
                        <div className={styles.likeCount}>
                            <span>2</span>
                        </div>
                    </Button>
                    <Button type="button" theme={ThemeButton.SVG_BG}>
                        <BellIcon />
                    </Button>
                    <Button type="button" theme={ThemeButton.CART}>
                        <span>{t('Корзина')}</span>
                        <CartIcon />
                    </Button>
                    <Dropdown
                        direction="bottom left"
                        className={styles.dropdown}
                        items={[
                            {
                                content: (
                                    <HStack max justify="start" gap="10">
                                        <Settings />
                                        <span>{t('Настройки и приватность')}</span>
                                    </HStack>

                                ),
                                onClick: onLogout,
                            },
                            {
                                content: (
                                    <HStack max justify="start" gap="10">
                                        <Help />
                                        <span>{t('Помощь')}</span>
                                    </HStack>

                                ),
                                onClick: onLogout,
                            },
                            {
                                content: (
                                    <HStack max justify="start" gap="10">
                                        <HistoryOrder />
                                        <span>{t('История заказов')}</span>
                                    </HStack>

                                ),
                                onClick: onLogout,
                            },
                            {
                                content: (
                                    <HStack max justify="start" gap="10">
                                        <LogoutIcon />
                                        <span>{t('Выйти')}</span>
                                    </HStack>

                                ),
                                onClick: onLogout,
                            },
                        ]}
                        trigger={<Avatar size={41} className={styles.avatarBtn} src={authData.avatar} />}
                    >
                        <HStack max justify="start" gap="16" className={styles.header}>
                            <Avatar size={35} className={styles.avatar} src={authData.avatar} />
                            <Text
                                bold={TextBold.BOLD}
                                size={TextSize.S}
                                gap="4"
                                title={`${authData.lastname} ${authData.firstname}`}
                                text="Дизайнер и программист сайта “Инвест-трейд”"
                            />
                        </HStack>
                    </Dropdown>
                </div>

            </header>
        );
    }

    return (
        <header className={classNames(styles.Navbar, {}, [className])}>
            <div className={styles.wrapperLeft}>
                <Button theme={ThemeButton.SVG_BTN} onClick={onToggle}>
                    <MenuIcon />
                </Button>
                <Logo className={styles.logo} />
            </div>
            <div className={styles.wrapperRight}>
                <div className={styles.contacts}>
                    <a href="#">+7 (982) 325-63-78</a>
                    <a href="#">mail@invest-trade.biz</a>
                </div>
                <Button type="button" theme={ThemeButton.SVG_BG} className={styles.likeBtn}>
                    <LikeIcon />
                    <div className={styles.likeCount}>
                        <span>2</span>
                    </div>
                </Button>
                <Button type="button" theme={ThemeButton.SVG_BG}>
                    <BellIcon />
                </Button>
                <Button type="button" theme={ThemeButton.CART}>
                    <span>{t('Корзина')}</span>
                    <CartIcon />
                </Button>
                <Button type="button" theme={ThemeButton.DEFAULT} onClick={onShowModal}>
                    {t('Войти')}
                </Button>
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            </div>

        </header>
    );
});
