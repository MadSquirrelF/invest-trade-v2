import { EntityState } from '@reduxjs/toolkit';
import { Product } from '@/entities/Product';
import { OrderType, SortType, ViewType } from '@/features/FilterContainer';

export interface ShopPageSchema extends EntityState<Product> {
  isLoading?: boolean;
  error?: string;

  // pagination

  page: number;
  limit: number;
  hasMore: boolean;

  // filters
  order: OrderType;
  view: ViewType;
  sort: SortType;
  search: string;
  category: string;
  brand: string;

  _inited: boolean;
}
