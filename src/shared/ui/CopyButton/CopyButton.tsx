/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styles from './CopyButton.module.scss';
import { Button, ThemeButton } from '../Button/Button';
import CopyIcon from '@/shared/assets/icons/copy-icon.svg';

interface CopyButtonProps {
  text?: string;
}

export const CopyButton = memo(({ text }: CopyButtonProps) => {
    const { t } = useTranslation();

    const [copied, setIsCopied] = useState(false);

    const onCopy = useCallback(
        (value: string | undefined) => {
            if (value) {
                navigator.clipboard.writeText(value);
                setIsCopied(true);

                setTimeout(() => {
                    setIsCopied(false);
                }, 5000);
            }
        },
        [],
    );

    return (
        <div className={styles.copyBtnWrapper}>
            <Button
                onClick={() => onCopy(text)}
                theme={ThemeButton.CLEAR}
                className={styles.copyBtn}
                disabled={copied}
            >
                <CopyIcon className={styles.copy} />
            </Button>

            <CSSTransition
                in={copied}
                timeout={300}
                unmountOnExit
                classNames="slide-animation"
            >
                <div className={styles.popup}>
                    {
                        t('Скопировано!')
                    }
                </div>
            </CSSTransition>

        </div>

    );
});
