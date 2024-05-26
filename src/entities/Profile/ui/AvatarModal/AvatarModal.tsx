/* eslint-disable i18next/no-literal-string */
import { Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './AvatarModal.module.scss';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Loader, ThemeLoader } from '@/shared/ui/Loader/Loader';
import { AvatarChangeAsync } from '../AvatarChange/AvatarChange.async';

interface AvatarModalProps {
  className?: string;
  isOpen: boolean;

  onCloseSuccess: (text: string, file?: File) => void;
  onCloseCancel: () => void;
}

export const AvatarModal = ({
    className, isOpen, onCloseSuccess, onCloseCancel,
} : AvatarModalProps) => (
    <Modal lazy className={classNames(styles.AvatarModal, {}, [className])} isOpen={isOpen} onClose={onCloseCancel}>
        <Suspense fallback={<Loader theme={ThemeLoader.MAIN_LOADER} />}>
            <AvatarChangeAsync
                onSuccess={onCloseSuccess}
                onCancel={onCloseCancel}
            />
        </Suspense>
    </Modal>
);
