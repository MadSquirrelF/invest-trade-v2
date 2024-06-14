/* eslint-disable i18next/no-literal-string */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProductComments } from '../../model/slices/ShopDetailsCommentSlice';
import { getProductCommentsIsLoading } from '../../model/selectors/comments';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByProductSlug } from '../../model/services/fetchCommentsByProductSlug/fetchCommentsByProductSlug';
import { addCommentForProduct } from '../../model/services/addCommentForProduct/addCommentForProduct';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextBold, TextSize } from '@/shared/ui/Text/Text';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { addLikeForComment } from '../../model/services/addLikeForComment/addLikeForComment';

interface ShopDetailsCommentsProps {
  className?: string;
  slug: string;
}

export const ShopDetailsComments = memo(({ className, slug }: ShopDetailsCommentsProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const comments = useSelector(getProductComments.selectAll);

    const commentsIsLoading = useSelector(getProductCommentsIsLoading);

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForProduct(text));
        },
        [dispatch],
    );

    const onLikeComment = useCallback(
        (commentId: string) => {
            dispatch(addLikeForComment(commentId));
        },
        [dispatch],
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByProductSlug(slug));
    });

    return (
        <VStack max align="start" gap="32" className={classNames('', {}, [className])}>
            <Text gap="0" text="Комментарии :" bold={TextBold.BOLD} size={TextSize.XL} />

            <CommentList
                isLoading={commentsIsLoading}
                onLikeComment={onLikeComment}
                comments={comments}
            />

            <AddCommentForm onSendComment={onSendComment} />
        </VStack>
    );
});
