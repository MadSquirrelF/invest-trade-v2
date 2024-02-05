import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { Loader, ThemeLoader } from 'shared/ui/Loader/Loader';
import styles from './LoginModal.module.scss';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose } : LoginModalProps) => (
    <Modal lazy className={classNames(styles.LoginModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
        <Suspense fallback={<Loader theme={ThemeLoader.MAIN_LOADER} />}>
            <LoginFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
