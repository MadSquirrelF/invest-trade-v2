import { ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import UpDownIcon from '@/shared/assets/icons/up-down-icon.svg';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import SelectedIcon from '@/shared/assets/icons/selected-icon.svg';
import { DropdownDirection } from '@/shared/types/ui';
import styles from './ListBox.module.scss';

export enum ThemeListBox {
    CLEAR = 'clear',
    DEFAULT = 'default',
  }

export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items: ListBoxItem<T>[];
  className?: string;
  theme?: ThemeListBox;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
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

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const { t } = useTranslation();

    const {
        items,
        className,
        theme = ThemeListBox.DEFAULT,
        direction = 'bottom right',
        value,
        label,
        defaultValue,
        readonly,
        onChange,
    } = props;

    const optionsClasses = [
        mapDirectionClass[direction],
    ];

    const mods: Mods = {
        [styles[theme]]: true,
        [styles.readonly]: readonly,
    };

    return (
        <HListBox
            disabled={readonly}
            as="div"
            className={classNames(styles.ListBox, mods, [className])}
            value={value}
            onChange={onChange}
        >

            {
                label && (
                    <label htmlFor={value} className={styles.label}>
                        {label}
                    </label>
                )
            }

            <HListBox.Button id={value} className={classNames(styles.trigger, mods, [])} aria-disabled={readonly}>
                <span className={styles.title}>{value ? t(value) : defaultValue}</span>

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
