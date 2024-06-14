import { EntityState } from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';

export interface ShopDetailsRecommendationsSchema extends EntityState<Product> {
  isLoading?: boolean;
  error?: string;
}
