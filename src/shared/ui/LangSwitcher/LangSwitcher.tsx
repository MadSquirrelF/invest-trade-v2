import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import Rus from 'shared/assets/icons/rus-icon.svg';
import Brit from 'shared/assets/icons/britain-icon.svg';
import { Button, ThemeButton } from '../Button/Button';
import styles from './LangSwitcher.module.scss';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            className={classNames(styles.switcher, {}, [className])}
            theme={ThemeButton.CLEAR}
            onClick={toggle}
        >
            {
                i18n.language === 'ru' ? (<Rus className={styles.icon} />) : (<Brit className={styles.icon} />)
            }
        </Button>
    );
});
