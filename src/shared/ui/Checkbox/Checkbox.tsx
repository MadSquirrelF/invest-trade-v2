import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  className?: string;
  label?: string;
  checked?: boolean;
  onToggle: () => void;
}

export const Checkbox = memo(({
    className, label, checked, onToggle, ...props
}: CheckboxProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.rect}>
            <input
                type="checkbox"
                checked={checked}
                id="check"
                onChange={onToggle}
                {...props}
                className={styles.checkbox}
            />
            <label htmlFor="check" className={styles.label}>{label}</label>
        </div>
    );
});
