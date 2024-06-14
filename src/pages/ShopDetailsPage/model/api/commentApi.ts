import { IComment } from '@/entities/Comment';
import { rtkApi } from '@/shared/api/rtkApi';

interface addCommentArg {
  productId: string;
  comment: string;
}

const commentApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        addCommentForProduct: build.query<IComment, addCommentArg>({
            query: (data) => ({
                url: '/comments/create/comment',
                method: 'POST',
                body: data,
            }),
        }),
        addLikeForComment: build.mutation<void, string>({
            query: (commentId) => ({
                url: `/comments/update-like/${commentId}`,
                method: 'PUT',
            }),
        }),
    }),
});

export const addCommentForProductQuery = commentApi.endpoints.addCommentForProduct.initiate;
export const addLikeForCommentMutation = commentApi.endpoints.addLikeForComment.initiate;
