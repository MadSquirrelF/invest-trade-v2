/* eslint-disable no-unused-vars */
import {
    ButtonHTMLAttributes, ReactNode, memo,
    useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import styles from './Button.module.scss';
import {
    Text, TextAlign, TextBold, TextSize,
} from '../Text/Text';
import { VStack } from '../Stack';

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_COMMENT = 'clear_comment',
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
  TAB = 'tab',
  HELP = 'help',
  SELECTOR_INVERTED = 'selector_inverted'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  disabled?: boolean;
  children?: ReactNode;
  helper?: boolean;
  helperText?: string;
}

export const Button = memo((props : ButtonProps) => {
    const {
        className, children, disabled, helper, helperText, theme = ThemeButton.CLEAR, ...otherProps
    } = props;

    const [isShown, setIsShown] = useState(false);

    const mods: Mods = {
        [styles[theme]]: true,
        [styles.disabled]: disabled,
    };

    const onMouseEnter = () => {
        setIsShown(true);
    };
    const onMouseLeave = () => {
        setIsShown(false);
    };

    if (helper) {
        return (
            <div className={styles.buttonWrapper} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <button
                    disabled={disabled}
                    type="button"
                    className={classNames(styles.Button, mods, [className])}
                    {...otherProps}
                >
                    {children}
                </button>
                {
                    helper && (
                        <CSSTransition
                            in={isShown}
                            timeout={300}
                            unmountOnExit
                            // eslint-disable-next-line i18next/no-literal-string
                            classNames="slide-animation"
                        >
                            <VStack className={styles.helper}>
                                <Text
                                    text={helperText}
                                    size={TextSize.M}
                                    align={TextAlign.CENTER}
                                    bold={TextBold.BOLD}
                                    gap="0"
                                />
                            </VStack>
                        </CSSTransition>
                    )
                }

            </div>
        );
    }

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
