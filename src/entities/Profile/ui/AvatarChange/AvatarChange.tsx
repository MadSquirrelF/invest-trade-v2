/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable i18next/no-literal-string */
import {
    ChangeEvent, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './AvatarChange.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import MemojiIcon from '@/shared/assets/icons/emodji-icon.svg';
import ImageIcon from '@/shared/assets/icons/image-icon.svg';
import SaveIcon from '@/shared/assets/icons/done.svg';
import CancelIcon from '@/shared/assets/icons/error-icon.svg';
import BatmanAvatar from '@/shared/assets/icons/batman-avatar.svg';
import AvacadoAvatar from '@/shared/assets/icons/avacado-avatar.svg';
import CactusAvatar from '@/shared/assets/icons/cactus-avatar.svg';
import CoffeeAvatar from '@/shared/assets/icons/coffee-avatar.svg';
import BoyKidAvatar from '@/shared/assets/icons/boy-kid-avatar.svg';
import EinsteinAvatar from '@/shared/assets/icons/einstein-avatar.svg';
import HarleyQuenAvatar from '@/shared/assets/icons/harley-quen-avatar.svg';
import BreakingBadAvatar from '@/shared/assets/icons/breaking-bad-avatar.svg';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { DropFileInput } from '@/shared/ui/DropFileInput/DropFileInput';

const AvatarList = [
    {
        id: 'CoffeeAvatar',
        Icon: CoffeeAvatar,
        src: '/uploads/users/coffee-avatar.svg',
    },
    {
        id: 'AvacadoAvatar',
        Icon: AvacadoAvatar,
        src: '/uploads/users/avacado-avatar.svg',
    },
    {
        id: 'CactusAvatar',
        Icon: CactusAvatar,
        src: '/uploads/users/cactus-avatar.svg',
    },
    {
        id: 'HarleyQuenAvatar',
        Icon: HarleyQuenAvatar,
        src: '/uploads/users/harley-quen-avatar.svg',
    },
    {
        id: 'BoyKidAvatar',
        Icon: BoyKidAvatar,
        src: '/uploads/users/boy-kid-avatar.svg',
    },
    {
        id: 'EinsteinAvatar',
        Icon: EinsteinAvatar,
        src: '/uploads/users/einstein-avatar.svg',
    },
    {
        id: 'BreakingBadAvatar',
        Icon: BreakingBadAvatar,
        src: '/uploads/users/breaking-bad-avatar.svg',
    },
    {
        id: 'BatmanAvatar',
        Icon: BatmanAvatar,
        src: '/uploads/users/batman-avatar.svg',
    },
];

const changeTypes = [
    {
        type: 'Мемоджи',
        Icon: MemojiIcon,
    },
    {
        type: 'Картинка',
        Icon: ImageIcon,
    },
];

export interface AvatarChangeProps {
    className?: string;
    onSuccess: (text: string, file?: File) => void;
    onCancel: () => void;
  }

const AvatarChange = memo(({
    className, onSuccess, onCancel,
}: AvatarChangeProps) => {
    const { t } = useTranslation();

    const [type, setType] = useState('Мемоджи');
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [slideIn, setSlideIn] = useState(true);

    const onChangeAvatarUrl = (e: ChangeEvent<HTMLInputElement>) => {
        setAvatarUrl(e.currentTarget.value);
    };

    const onChangeType = useCallback((type: string) => {
        setSlideIn(false);

        setTimeout(() => {
            setType(type);
            setSlideIn(true);
        }, 300);
    }, []);

    const renderBlock = useCallback(
        (type: string) => {
            switch (type) {
            case 'Мемоджи':
                return (
                    <HStack max gap="32" wrap>
                        {
                            AvatarList.map((avatarItem) => (
                                <div key={avatarItem.id} className={styles.selectWrapper}>
                                    <input
                                        id={avatarItem.id}
                                        type="radio"
                                        name="avatar"
                                        onChange={onChangeAvatarUrl}
                                        value={avatarItem.src}
                                        className={styles.selectInput}
                                        disabled={avatarUrl === avatarItem.src}
                                    />
                                    <label htmlFor={avatarItem.id} className={styles.selectLabel}>
                                        <Avatar
                                            size={100}
                                            className={classNames(
                                                styles.avatar,
                                                { [styles.selected]: avatarUrl === avatarItem.src },
                                                [],
                                            )}
                                        >
                                            <avatarItem.Icon />
                                        </Avatar>
                                        <CSSTransition
                                            in={avatarUrl === avatarItem.src}
                                            timeout={300}
                                            unmountOnExit
                                            classNames="slide-animation"
                                        >
                                            <SaveIcon className={styles.selectIcon} />
                                        </CSSTransition>
                                    </label>

                                </div>

                            ))
                        }
                    </HStack>
                );
            case 'Картинка':
                return (
                    <DropFileInput id="avatar" name="avatar" onChangeText={setAvatarUrl} onChangeFile={setFile} />
                );
            default:
                return null;
            }
        },
        [avatarUrl],
    );

    return (
        <VStack gap="32" max className={classNames(styles.AvatarChange, {}, [className])}>
            <HStack gap="32" max justify="start">
                {
                    changeTypes.map((changeType) => (
                        <Button
                            theme={ThemeButton.SELECTOR_INVERTED}
                            key={changeType.type}
                            onClick={() => onChangeType(changeType.type)}
                            disabled={changeType.type === type}
                        >
                            <changeType.Icon />
                            <Text gap="0" bold={TextBold.BOLD} size={TextSize.M} text={changeType.type} />
                        </Button>
                    ))
                }
            </HStack>

            <CSSTransition
                in={slideIn}
                timeout={300}
                unmountOnExit
                classNames="slide-animation"
            >
                {renderBlock(type)}
            </CSSTransition>

            <HStack gap="16" justify="start" max>
                <Button onClick={onCancel} theme={ThemeButton.OUTLINE}>
                    <CancelIcon />
                    <span>{t('Отмена')}</span>
                </Button>
                <Button onClick={() => onSuccess(avatarUrl, file)} theme={ThemeButton.OUTLINE}>
                    <SaveIcon />
                    <span>{t('Сохранить')}</span>
                </Button>
            </HStack>
        </VStack>
    );
});

export default AvatarChange;
