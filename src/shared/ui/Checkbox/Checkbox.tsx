import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  className?: string;
  label?: string;
  checked?: boolean;
  onToggle: () => void;
  id: string;
}

export const Checkbox = memo(({
    className, label, checked, id, onToggle, ...props
}: CheckboxProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.rect}>
            <input
                type="checkbox"
                checked={checked}
                id={id}
                onChange={onToggle}
                className={styles.checkbox}
                {...props}
            />
            <label htmlFor={id} className={styles.label}>{label}</label>
        </div>
    );
});
