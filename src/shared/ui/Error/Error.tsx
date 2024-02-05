import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

import styles from './Error.module.scss';

interface ErrorProps {
  className?: string;
  error: string;
  'data-testid'?: string;
}

export const Error = (props: ErrorProps) => {
    const { t } = useTranslation();
    const {
        className,
        error,
        'data-testid': dataTestId = 'Error',
    } = props;
    return (
        <div className={classNames(styles.error, {}, [className])}>
            <p data-testid={`${dataTestId}.Text`} className={styles.title}>{error}</p>
        </div>
    );
};
