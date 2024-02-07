import { ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import UpDownIcon from 'shared/assets/icons/up-down-icon.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import SelectedIcon from 'shared/assets/icons/selected-icon.svg';
import { DropdownDirection } from 'shared/types/ui';
import styles from './ListBox.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  label?: string;
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': styles.optionsBottomLeft,
    'bottom right': styles.optionsBottomRight,
    'top right': styles.optionsTopRight,
    'top left': styles.optionsTopLeft,
};

export function ListBox(props: ListBoxProps) {
    const {
        items, className, direction = 'bottom right', value, label, defaultValue, readonly, onChange,
    } = props;

    const optionsClasses = [
        mapDirectionClass[direction],
    ];

    return (
        <HListBox
            disabled={readonly}
            as="div"
            className={classNames(styles.ListBox, {}, [className])}
            value={value}
            onChange={onChange}
        >
            <label htmlFor={value} className={styles.label}>
                {label}
            </label>
            <HListBox.Button id={value} className={styles.trigger} aria-disabled={readonly}>
                {value ?? defaultValue}
                {' '}
                <UpDownIcon />
            </HListBox.Button>
            <HListBox.Options className={classNames(styles.options, {}, optionsClasses)}>
                {items.map((item) => (
                    <HListBox.Option
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                        className={classNames(
                            styles.item,
                            {
                                [styles.selected]: item.value === value,
                                [styles.disabled]: item.disabled,
                            },
                        )}
                    >
                        <SelectedIcon />
                        {item.content}
                    </HListBox.Option>
                ))}
            </HListBox.Options>
        </HListBox>
    );
}
