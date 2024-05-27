import { Product } from './productSchema';

export interface ProductDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: Product;
}
