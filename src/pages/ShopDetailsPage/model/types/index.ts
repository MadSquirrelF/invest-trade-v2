import { ShopDetailsCommentSchema } from './ShopDetailsCommentSchema';
import { ShopDetailsRecommendationsSchema } from './ShopDetailsRecommendationsSchema';

export interface ShopDetailsPageSchema {
  comments: ShopDetailsCommentSchema;
  recommendations: ShopDetailsRecommendationsSchema;
}
