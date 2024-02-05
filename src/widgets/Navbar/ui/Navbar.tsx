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
import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
  onToggle?: () => void;
}

export const Navbar = memo(({ className, onToggle }: NavbarProps) => {
    const { t } = useTranslation();

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

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
