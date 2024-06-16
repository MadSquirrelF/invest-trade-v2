/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable i18next/no-literal-string */
import { ChangeEventHandler, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Toggle.module.scss';

interface ToggleProps {
  className?: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Toggle = memo(({ className, onChange, value }: ToggleProps) => (

    <label className={classNames(styles.ToggleContainer, {}, [className])}>
        <input type="checkbox" value={value} onChange={onChange} className={styles.input} />
        <span className={styles.switcher} />
    </label>

));
