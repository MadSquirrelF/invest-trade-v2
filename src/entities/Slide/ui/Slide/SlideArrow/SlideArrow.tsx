/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import ArrowLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import { Button, ThemeButton } from '../../../../../shared/ui/Button/Button';
import styles from './SlideArrow.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface SlideArrowProps {
  variant: 'left' | 'right';
  clickHandler: () => void;
}

export const SlideArrow = memo(({ variant, clickHandler }: SlideArrowProps) => (
    <Button
        onClick={clickHandler}
        theme={ThemeButton.CLEAR}
        className={classNames(styles.arrow, { [styles.left]: variant === 'left' })}
    >
        {
            variant === 'left'
                ? (<ArrowLeftIcon className={styles.icon} />)
                : (<ArrowRightIcon className={styles.icon} />)
        }
    </Button>
));
