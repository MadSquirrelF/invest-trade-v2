/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-array-index-key */
/* eslint-disable i18next/no-literal-string */
import {
    ChangeEvent, memo, useCallback, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import styles from './DropFileInput.module.scss';

import { HStack, VStack } from '../Stack';
import JpgIcon from '@/shared/assets/icons/jpg-file-icon.svg';
import SvgIcon from '@/shared/assets/icons/svg-file.svg';
import PngIcon from '@/shared/assets/icons/png-file-icon.svg';
import ImageIcon from '@/shared/assets/icons/image-icon.svg';
import {
    Text, TextAlign, TextBold, TextSize,
} from '../Text/Text';
import { Button, ThemeButton } from '../Button/Button';
import { Input } from '../Input/Input';
import { Avatar } from '../Avatar/Avatar';
import { Error } from '../Error/Error';

interface DropFileInputProps {
  className?: string;
  id: string;
  name: string;
  onChangeText: (url: string) => void;
  onChangeFile: (file: File) => void;
}

export const DropFileInput = memo(({
    className, id, name, onChangeText, onChangeFile,
}: DropFileInputProps) => {
    const { t } = useTranslation();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isDropActive, setIsDropActive] = useState(false);

    const [error, setIsError] = useState(false);

    const [avatar, setAvatar] = useState<File>();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [urlImage, setUrlImage] = useState<string>('');

    const [isUrlValid, setIsUrlValid] = useState(false);

    const renderFileIcon = useCallback(
        (type: string) => {
            switch (type) {
            case 'image/png':
                return (
                    <PngIcon className={styles.fileIcon} />
                );
            case 'image/jpeg':
                return (
                    <JpgIcon className={styles.fileIcon} />
                );
            case 'image/svg+xml':
                return (
                    <SvgIcon className={styles.fileIcon} />
                );
            default:
                return <ImageIcon className={styles.fileIcon} />;
            }
        },
        [],
    );

    const onDragEnter = () => {
        setIsDropActive(true);
    };

    const chooseFile = () => {
        fileInputRef.current?.click();
    };

    const onDragLeave = () => {
        setIsDropActive(false);
    };

    const onDrop = () => {
        setIsDropActive(false);
    };

    const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];

        if (newFile && newFile.type.split('/')[0] === 'image') {
            const reader = new FileReader();

            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    setSelectedImage(event.target.result as string);
                }
            };

            reader.readAsDataURL(newFile);
            setAvatar(newFile);
            onChangeFile(newFile);
        }
    };

    const validateImageUrl = (url: string): boolean => {
        // Регулярное выражение для проверки URL картинки
        const imageUrlRegex = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|png|gif|bmp|wepb|svg)$/i;

        return imageUrlRegex.test(url);
    };

    const onSetUrlImage = () => {
        const isValid = validateImageUrl(urlImage);

        if (isValid) {
            setIsUrlValid(isValid);
            onChangeText(urlImage);
            setIsError(false);
        } else {
            setIsError(true);
        }
    };

    const mods: Mods = {
        [styles.active]: isDropActive,
    };

    return (
        <>
            <VStack
                className={classNames(styles.DropFileInput, mods, [className])}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                max
            >
                <VStack gap="16" max align="center" className={styles.label}>
                    <span className={styles.imageAnimation} />
                    <Text
                        title={t('Перетащите изображение сюда')}
                        align={TextAlign.CENTER}
                        gap="16"
                    />
                    <Text
                        text={t('или нажмите на кнопку')}
                        align={TextAlign.CENTER}
                        gap="16"
                    />
                    <HStack justify="center" align="center" max gap="32" className={styles.buttonWrapper}>
                        <Button onClick={chooseFile} theme={ThemeButton.DEFAULT}>
                            {t('Выбрать файл')}
                        </Button>
                        <Button theme={ThemeButton.OUTLINE} helper helperText="Нажмите Ctrl + V">
                            {t('Вставить из буфера')}
                        </Button>
                    </HStack>
                </VStack>
                <input
                    ref={fileInputRef}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                    name={name}
                    id={id}
                    multiple={false}
                    className={styles.input}
                    onChange={onFileDrop}
                />
            </VStack>

            <HStack gap="32" max className={styles.searchBox}>
                <CSSTransition
                    in={isUrlValid}
                    timeout={300}
                    unmountOnExit
                    // eslint-disable-next-line i18next/no-literal-string
                    classNames="slide-animation"
                >
                    <VStack max gap="32" justify="start" align="start" className={styles.imageUrlResult}>
                        <Text
                            title={t('Результат поиска:')}
                            text={t('*Если изображение не отображается, это может значить, что ссылка устарела')}
                            align={TextAlign.LEFT}
                            gap="8"
                        />
                        <Avatar src={urlImage} alt="avatarUrl" />
                    </VStack>

                </CSSTransition>
                <Input
                    autofocus
                    value={urlImage}
                    onChange={setUrlImage}
                    placeholder="Введите адрес изображения"
                />
                <Button onClick={onSetUrlImage} theme={ThemeButton.DEFAULT}>
                    {t('Найти')}
                </Button>
            </HStack>

            <CSSTransition
                in={error}
                timeout={300}
                unmountOnExit
                // eslint-disable-next-line i18next/no-literal-string
                classNames="slide-animation"
            >
                <Error error="Изображение не найдено" />
            </CSSTransition>

            {
                avatar && (
                    <HStack justify="between" max gap="50" className={styles.file}>
                        <HStack gap="16">
                            {renderFileIcon(avatar.type)}
                            <Text
                                text={avatar.name}
                                gap="0"
                                align={TextAlign.LEFT}
                                size={TextSize.L}
                                bold={TextBold.BOLD}
                            />
                        </HStack>

                        {
                            selectedImage && (
                                <Avatar src={selectedImage} alt="selectedImage" />
                            )
                        }
                    </HStack>
                )

            }

        </>

    );
});
