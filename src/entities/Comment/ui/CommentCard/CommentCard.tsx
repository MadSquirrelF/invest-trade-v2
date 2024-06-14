/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { IComment } from '../../../Comment/model/types/comment';
import styles from './CommentCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { covertImageUrl } from '@/shared/lib/covertImageUrl/covertImageUrl';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import LikeIcon from '@/shared/assets/icons/like-save-icon.svg';

import ReplyIcon from '@/shared/assets/icons/reply-icon.svg';
import { convertDate } from '@/shared/lib/convertDate/convertDate';

interface CommentCardProps {
  className?: string;
  comment?: IComment;
  isLoading?: boolean;
  onLikeComment?: (value: string) => void;
  onChangeReply?: () => void;
  onChangeShowReplies?: () => void;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { t } = useTranslation();
    const {
        className,
        isLoading,
        comment,
        onLikeComment,
        onChangeReply,
        onChangeShowReplies,
    } = props;

    const onLikeHandler = useCallback(() => {
        if (comment) {
            onLikeComment?.(comment._id);
        }
    }, [comment, onLikeComment]);

    if (!comment) {
        return null;
    }

    if (isLoading) {
        return (
            <HStack max gap="16" align="start" className={classNames(styles.CommentCard, {}, [className])}>
                <Skeleton height={50} width={50} border="50%" className={styles.avatar} />

                <VStack align="start" max gap="10">

                    <HStack max gap="16">
                        <Skeleton height={20} width={100} border="20px" />
                        <Skeleton height={10} width="100%" border="20px" />
                    </HStack>
                    <HStack max gap="16" justify="start">
                        <HStack gap="4">
                            <Skeleton height={20} width={20} border="20px" />
                            <Skeleton height={10} width={30} border="20px" />
                        </HStack>
                        <HStack gap="4">
                            <Skeleton height={20} width={20} border="20px" />
                            <Skeleton height={10} width={30} border="20px" />
                        </HStack>
                        <HStack gap="4">
                            <Skeleton height={20} width={20} border="20px" />
                            <Skeleton height={10} width={30} border="20px" />
                        </HStack>

                        <HStack gap="4">
                            <Skeleton height={20} width={20} border="20px" />
                            <Skeleton height={10} width={30} border="20px" />
                        </HStack>

                    </HStack>

                    <Skeleton height={20} width={100} border="20px" />

                </VStack>

            </HStack>
        );
    }

    return (
        <HStack max gap="16" align="start" className={classNames(styles.CommentCard, {}, [className])}>
            {
                comment.user.avatar
                    ? (<Avatar size={50} className={styles.avatar} src={covertImageUrl(comment.user.avatar)} />)
                    : (
                        <Avatar size={50} className={styles.avatar} src="" />
                    )
            }

            <VStack align="start" max gap="10">

                <HStack max justify="between">
                    <HStack gap="16">
                        <Text className={styles.username} title={comment.user.username} size={TextSize.S} gap="0" />
                        <Text className={styles.text} text={comment.comment} size={TextSize.M} gap="0" />
                    </HStack>
                    <Text
                        text={convertDate(comment.createdAt)}
                        textPrimary
                        bold={TextBold.BOLD}
                        size={TextSize.S}
                        gap="0"
                    />
                </HStack>
                <HStack max gap="16">
                    <Button onClick={onLikeHandler} theme={ThemeButton.CLEAR_COMMENT}>
                        <LikeIcon />
                        <Text className={styles.text} text="Like" size={TextSize.S} gap="0" />
                    </Button>
                    <Button theme={ThemeButton.CLEAR_COMMENT}>
                        <ReplyIcon />
                        <Text className={styles.text} text="Reply" size={TextSize.S} gap="0" />
                    </Button>
                    <HStack gap="4">
                        <Text className={styles.text} text={String(comment.likes)} size={TextSize.S} gap="0" />
                        <Text className={styles.text} text="Likes" size={TextSize.S} gap="0" />
                    </HStack>

                    <HStack gap="4">
                        <Text className={styles.text} text={String(comment.reply.length)} size={TextSize.S} gap="0" />
                        <Text className={styles.text} text="Replies" size={TextSize.S} gap="0" />
                    </HStack>

                </HStack>

                <Button theme={ThemeButton.CLEAR}>
                    <Text
                        className={styles.text}
                        text="Show replies"
                        textPrimary
                        bold={TextBold.BOLD}
                        size={TextSize.S}
                        gap="0"
                    />
                </Button>

            </VStack>

        </HStack>
    );
});
