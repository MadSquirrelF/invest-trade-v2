import { Mods, classNames } from 'shared/lib/classNames/classNames';
import React, {
    ChangeEventHandler,
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import EyeClosed from 'shared/assets/icons/icon-closed-eye.svg';
import EyeOpened from 'shared/assets/icons/icon-opened-eye.svg';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import styles from './Input.module.scss';
import { Button, ThemeButton } from '../Button/Button';
import { AppLink, AppLinkTheme } from '../AppLink/AppLink';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  placeholder: string;
  label: string;
  mask?: string;
  isPassword?: boolean;
  isForgetPassword?: boolean;
  onChangeMasked?: ChangeEventHandler<HTMLInputElement>;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        mask,
        onChange,
        isForgetPassword,
        autofocus,
        readonly,
        placeholder,
        isPassword,
        label,
        onChangeMasked,
        type = 'text',
        ...otherProps
    } = props;

    const { t } = useTranslation();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const ref = useRef<HTMLInputElement | null>(null);

    const [isPasswordShown, setPasswordShown] = useState(false);

    const ChangeInputType = isPasswordShown ? 'text' : 'password';

    const mods: Mods = {
        [styles.password]: isPassword,
        [styles.readonly]: readonly,
    };

    useEffect(() => {
        if (autofocus) {
            ref.current?.focus();
        }
    }, [autofocus]);

    if (mask) {
        return (
            <div className={classNames(styles.FieldBox, {}, [className])}>
                <label htmlFor={label} className={styles.label}>
                    {label}
                </label>
                <div className={classNames(styles.InputWrapper, mods, [])}>
                    <InputMask
                        mask={mask}
                        id={label}
                        placeholder={placeholder}
                        name={label}
                        value={value}
                        onChange={onChangeMasked}
                        className={styles.input}
                        {...otherProps}
                    />
                </div>

            </div>
        );
    }

    return (
        <div className={classNames(styles.FieldBox, {}, [className])}>
            <label htmlFor={label} className={styles.label}>
                {label}
                {
                    isPassword && isForgetPassword && (
                        <AppLink
                            to="/"
                            theme={AppLinkTheme.DEFAULT}
                            className="link"
                        >
                            {t('Забыли пароль?')}
                        </AppLink>
                    )
                }
            </label>
            <div className={classNames(styles.InputWrapper, mods, [])}>
                <input
                    ref={ref}
                    type={isPassword ? ChangeInputType : type}
                    className={styles.input}
                    id={label}
                    placeholder={placeholder}
                    name={label}
                    value={value}
                    autoComplete="new-password"
                    onChange={onChangeHandler}
                    readOnly={readonly}
                    {...otherProps}
                />
                {
                    isPassword && (
                        <Button
                            className={styles.eyeBtn}
                            theme={ThemeButton.SVG_CLEAN}
                            onClick={() => setPasswordShown(!isPasswordShown)}
                        >
                            {isPasswordShown ? <EyeClosed /> : <EyeOpened />}
                        </Button>
                    )
                }
            </div>

        </div>
    );
});
