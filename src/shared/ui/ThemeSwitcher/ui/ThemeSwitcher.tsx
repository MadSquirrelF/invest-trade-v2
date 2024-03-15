/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useTheme } from '@/app/providers/ThemeProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import styles from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();

    const { t } = useTranslation();

    return (
        <div className={classNames(styles.ThemeSwitcher, {}, [className])}>
            <input type="checkbox" id="toggle" defaultChecked={false} className={styles.checkbox} />
            <label
                htmlFor="toggle"
                onClick={toggleTheme}
                className={styles.label}
            >
                <span className={styles.background} />
            </label>
        </div>
    );
};
