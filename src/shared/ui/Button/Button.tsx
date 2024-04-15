/* eslint-disable no-unused-vars */
import {
    ButtonHTMLAttributes, ReactNode, memo,
} from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import styles from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  DEFAULT = 'default',
  VK = 'vk',
  YANDEX = 'Yandex',
  UP = 'up',
  OUTLINE = 'outline',
  OUTLINE_ACTIVE = 'outline_active',
  CART = 'cart',
  SVG_BG = 'svg_bg',
  SVG_CIRCLE = 'svg_circle',
  SVG_BTN = 'svg_btn',
  SVG_CLEAN = 'svg_clean',
  SELECTOR = 'selector',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = memo((props : ButtonProps) => {
    const {
        className, children, disabled, theme = ThemeButton.CLEAR, ...otherProps
    } = props;

    const mods: Mods = {
        [styles[theme]]: true,
        [styles.disabled]: disabled,
    };
    return (
        <button
            disabled={disabled}
            type="button"
            className={classNames(styles.Button, mods, [className])}
            {...otherProps}
        >
            {children}
        </button>
    );
});
