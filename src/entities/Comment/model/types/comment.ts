import { User } from '@/entities/User';

type ICommentUser = Pick<User, '_id' | 'avatar' | 'username'>

export interface IComment {
  _id: string;
  user: ICommentUser;
  comment: string;
  reply: IComment[]
  likes: number
  createdAt: string;
}
