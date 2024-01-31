/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import LightIcon from 'shared/assets/icons/sun-icon.svg';
import DarkIcon from 'shared/assets/icons/moon-icon.svg';
import NightIcon from 'shared/assets/icons/star-icon.svg';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from '../../Button/Button';
import styles from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
  short: boolean;
}

export const ThemeSwitcher = ({ className, short }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    const { t } = useTranslation();

    const mods: Record<string, boolean> = {
        [styles.short]: short,
    };

    interface DynamicStyle {
        [key: string]: string;
      }
    const inlineStyle: DynamicStyle = {};

    if (short) {
        if (theme === Theme.LIGHT) {
            inlineStyle.transform = 'translateY(0)';
        } else if (theme === Theme.DARK) {
            inlineStyle.transform = 'translateY(100%)';
        } else {
            inlineStyle.transform = 'translateY(200%)';
        }
    } else if (theme === Theme.LIGHT) {
        inlineStyle.transform = 'translateX(0)';
    } else if (theme === Theme.DARK) {
        inlineStyle.transform = 'translateX(100%)';
    } else {
        inlineStyle.transform = 'translateX(200%)';
    }

    return (
        <div className={classNames(styles.ThemeSwitcher, mods, [className])}>
            <Button
                theme={ThemeButton.CLEAR}
                className={classNames(styles.item, {}, [className])}
                onClick={() => toggleTheme(Theme.LIGHT)}
            >
                <LightIcon className={styles.icon} />
                <span className={styles.text}>
                    {
                        t('Светлая')
                    }
                </span>
            </Button>
            <Button
                theme={ThemeButton.CLEAR}
                className={classNames(styles.item, {}, [className])}
                onClick={() => toggleTheme(Theme.DARK)}
            >
                <DarkIcon className={styles.icon} />
                <span className={styles.text}>
                    {
                        t('Темная')
                    }
                </span>
            </Button>
            <Button
                theme={ThemeButton.CLEAR}
                className={classNames(styles.item, {}, [className])}
                onClick={() => toggleTheme(Theme.BLACK)}
            >
                <NightIcon className={styles.icon} />
                <span className={styles.text}>
                    {
                        t('Ночная')
                    }
                </span>
            </Button>
            <span
                className={styles.slider}
                style={inlineStyle}
            />
        </div>
    );
};
