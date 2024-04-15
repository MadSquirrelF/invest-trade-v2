import { useTranslation } from 'react-i18next';
import { ChangeEvent, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label: string;
  options?: SelectOption<T>[];
  onChange?: (value: string) => void;
  value?: T;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const { t } = useTranslation();

    const {
        className,
        label,
        readonly,
        options,
        onChange,
        value,
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const optionsList = useMemo(() => options?.map((item) => (
        <option className={styles.option} value={item.value} key={item.value}>{item.content}</option>
    )), [options]);

    return (
        <div className={classNames(styles.Wrapper, {}, [className])}>
            <label htmlFor={label} className={styles.label}>
                {label}
            </label>

            <select disabled={readonly} className={styles.select} value={value} onChange={onChangeHandler}>
                {optionsList}
            </select>
        </div>
    );
};
