/* eslint-disable i18next/no-literal-string */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { VStack } from '@/shared/ui/Stack';
import { IComment } from '../../../Comment/model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import styles from './CommentList.module.scss';

interface CommentListProps {
  className?: string;
  comments?: IComment[];
  onLikeComment: (value: string) => void;
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const {
        isLoading,
        comments,
        className,
        onLikeComment,
    } = props;

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <VStack gap="16" max align="start" className={classNames('', {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack max align="start" gap="16" className={classNames(styles.commentList, {}, [className])}>
            {
                comments?.length
                    ? comments.map((comment) => (
                        <CommentCard
                            onLikeComment={onLikeComment}
                            isLoading={isLoading}
                            key={comment._id}
                            comment={comment}
                        />
                    ))
                    : (
                        <Text text={t('Комментарии отсутствуют')} gap="16" />
                    )
            }
        </VStack>
    );
});
